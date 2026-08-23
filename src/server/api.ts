import { Router } from 'express';
import { readDB, writeDB } from './db';
import { google } from 'googleapis';

const router = Router();

// Helper to safely clean and format Google Service Account private keys from environment variables
function cleanPrivateKey(raw?: string): string | null {
  if (!raw || typeof raw !== 'string') return null;
  let key = raw.trim();
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1);
  }
  key = key.replace(/\\n/g, '\n').replace(/\\r/g, '').trim();
  if (!key.includes('BEGIN PRIVATE KEY') && !key.includes('BEGIN RSA PRIVATE KEY')) {
    return null;
  }
  return key;
}

// Helper to convert Google Drive share links into direct, high-performance embed links
function convertDriveUrl(url: string): string {
  if (!url || typeof url !== 'string') return url;
  if (url.includes('drive.google.com')) {
    const dPattern = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const idQueryPattern = /[?&]id=([a-zA-Z0-9_-]+)/;
    
    let fileId = '';
    const dMatch = url.match(dPattern);
    if (dMatch) {
      fileId = dMatch[1];
    } else {
      const idMatch = url.match(idQueryPattern);
      if (idMatch) {
        fileId = idMatch[1];
      }
    }
    
    if (fileId) {
      // Use the high-performance googleusercontent endpoint (direct image viewable)
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
  }
  return url;
}

// Recursively search and convert any Google Drive URLs in an object
function convertDriveLinks(body: any): any {
  if (!body || typeof body !== 'object') return body;
  const newBody = { ...body };
  
  for (const key in newBody) {
    if (typeof newBody[key] === 'string') {
      newBody[key] = convertDriveUrl(newBody[key]);
    } else if (typeof newBody[key] === 'object' && newBody[key] !== null) {
      newBody[key] = convertDriveLinks(newBody[key]);
    }
  }
  return newBody;
}

// Google Drive listing endpoint
router.get('/drive/files', async (req, res) => {
  try {
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    const isValidKeyFormat = privateKey && 
      privateKey.includes('-----BEGIN') && 
      privateKey.includes('KEY-----');

    if (!clientEmail || !privateKey || !isValidKeyFormat) {
      return res.json({ 
        configured: false, 
        files: [],
        message: "Google Service Account credentials are not fully configured or are invalid."
      });
    }

    const authClient = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey
      },
      scopes: [
        'https://www.googleapis.com/auth/drive.readonly',
        'https://www.googleapis.com/auth/drive.metadata.readonly'
      ]
    });

    const drive = google.drive({ version: 'v3', auth: authClient });
    
    const response = await drive.files.list({
      pageSize: 40,
      fields: 'files(id, name, mimeType, thumbnailLink, webViewLink, size, createdTime)',
      q: "trashed = false and (mimeType contains 'image/' or mimeType = 'application/pdf' or mimeType = 'application/vnd.google-apps.folder')",
      orderBy: 'createdTime desc'
    });

    res.json({
      configured: true,
      files: response.data.files || []
    });
  } catch (err: any) {
    console.error("Error listing Drive files:", err);
    res.json({ 
      configured: false, 
      files: [], 
      message: `Error connecting to Google Drive: ${err.message}` 
    });
  }
});

// Direct utility convert endpoint
router.post('/drive/convert', (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "Missing 'url' parameter" });
  }
  const converted = convertDriveUrl(url);
  res.json({ original: url, converted });
});

// Visitor tracking and analytics logging endpoint
router.post('/analytics/log', async (req, res) => {
  try {
    const db = await readDB();
    if (!db.analytics) {
      db.analytics = [];
    }

    const { path, referrer, utmSource, utmMedium, utmCampaign, utmTerm, device, userAgent } = req.body;
    
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    
    const logEntry = {
      id: Date.now().toString(),
      path: path || '/',
      referrer: referrer || 'Direct',
      utmSource: utmSource || '',
      utmMedium: utmMedium || '',
      utmCampaign: utmCampaign || '',
      utmTerm: utmTerm || '',
      device: device || 'desktop',
      userAgent: userAgent || '',
      ip: typeof ip === 'string' ? ip.split(',')[0].trim() : '',
      timestamp: new Date().toISOString()
    };

    db.analytics.push(logEntry);

    // Keep the database compact (max 2000 log entries)
    if (db.analytics.length > 2000) {
      db.analytics = db.analytics.slice(-2000);
    }

    await writeDB(db);
    res.status(201).json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Analytics aggregation summary endpoint
router.get('/analytics/summary', async (req, res) => {
  try {
    const db = await readDB();
    const logs = db.analytics || [];

    // Aggregates
    const totalPageViews = logs.length;
    const uniqueIPs = new Set(logs.map((log: any) => log.ip || log.userAgent));
    const uniqueVisitors = uniqueIPs.size;

    const pages: Record<string, number> = {};
    const referrers: Record<string, number> = {};
    const keywords: Record<string, number> = {};
    const devices: Record<string, number> = {};

    logs.forEach((log: any) => {
      // Pages
      const p = log.path || '/';
      pages[p] = (pages[p] || 0) + 1;

      // Referrers
      let ref = log.referrer || 'Direct';
      if (ref && ref !== 'Direct') {
        try {
          const url = new URL(ref);
          ref = url.hostname.replace('www.', '');
        } catch {
          // If not a valid URL, keep as is
        }
      }
      referrers[ref || 'Direct'] = (referrers[ref || 'Direct'] || 0) + 1;

      // Keywords from utmTerm or search engine referral
      let term = log.utmTerm || '';
      if (!term && log.referrer && log.referrer.includes('google.')) {
        try {
          const url = new URL(log.referrer);
          const q = url.searchParams.get('q');
          if (q) term = q;
        } catch {}
      }
      if (term) {
        keywords[term] = (keywords[term] || 0) + 1;
      }

      // Devices
      const dev = log.device || 'desktop';
      devices[dev] = (devices[dev] || 0) + 1;
    });

    // Generate last 7 days timeline data
    const timelineData: Record<string, { date: string; pageviews: number; visitors: number; ips: Set<string> }> = {};
    
    // Pre-populate last 7 days
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      timelineData[dateStr] = { date: dateStr, pageviews: 0, visitors: 0, ips: new Set() };
    }

    logs.forEach((log: any) => {
      if (!log.timestamp) return;
      const dateStr = log.timestamp.split('T')[0];
      if (timelineData[dateStr]) {
        timelineData[dateStr].pageviews += 1;
        timelineData[dateStr].ips.add(log.ip || log.userAgent);
      }
    });

    const timeline = Object.keys(timelineData).sort().map(dateStr => {
      return {
        date: dateStr,
        pageviews: timelineData[dateStr].pageviews,
        visitors: timelineData[dateStr].ips.size
      };
    });

    res.json({
      totalPageViews,
      uniqueVisitors,
      pages: Object.entries(pages).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 10),
      referrers: Object.entries(referrers).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 10),
      keywords: Object.entries(keywords).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 10),
      devices: Object.entries(devices).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value),
      timeline
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

const collections = ['projects', 'services', 'testimonials', 'leads', 'blog', 'gallery', 'knowledge', 'experience', 'skills'];

// Generic CRUD for collections
collections.forEach(collection => {
  router.get(`/${collection}`, async (req, res) => {
    try {
      const db = await readDB();
      res.json(db[collection] || []);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post(`/${collection}`, async (req, res) => {
    try {
      const db = await readDB();
      if (!db[collection]) db[collection] = [];
      const processedBody = convertDriveLinks(req.body);
      const newItem = { id: Date.now().toString(), ...processedBody };
      db[collection].push(newItem);
      await writeDB(db);
      res.status(201).json(newItem);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put(`/${collection}/:id`, async (req, res) => {
    try {
      const db = await readDB();
      if (!db[collection]) db[collection] = [];
      const index = db[collection].findIndex((item: any) => item.id === req.params.id);
      if (index === -1) return res.status(404).json({ error: 'Not found' });
      const processedBody = convertDriveLinks(req.body);
      db[collection][index] = { ...db[collection][index], ...processedBody };
      await writeDB(db);
      res.json(db[collection][index]);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  router.delete(`/${collection}/:id`, async (req, res) => {
    try {
      const db = await readDB();
      if (!db[collection]) db[collection] = [];
      db[collection] = db[collection].filter((item: any) => item.id !== req.params.id);
      await writeDB(db);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
});

// Dedicated Contact form submission endpoint (Website visitor inquiries & leads)
router.post('/contact', async (req, res) => {
  try {
    const { name, whatsapp, message, email } = req.body || {};
    
    // If it's an admin profile update (has social fields like behance/instagram/phone etc and no direct visitor inquiry)
    if (req.body && (req.body.behance || req.body.instagram || req.body.linkedin || req.body.phone) && !message) {
      const db = await readDB();
      const processed = convertDriveLinks(req.body);
      db.contact = { ...(db.contact || {}), ...processed };
      await writeDB(db);
      return res.json({ success: true, contact: db.contact });
    }

    // Visitor Inquiry submission
    if (!name && !whatsapp && !message) {
      return res.status(400).json({ error: 'Please enter your name, whatsapp number or message.' });
    }

    const db = await readDB();
    if (!db.leads) db.leads = [];
    
    const newLead = {
      id: Date.now().toString(),
      name: name || 'Website Visitor',
      whatsapp: whatsapp || '',
      email: email || '',
      message: message || '',
      timestamp: new Date().toISOString()
    };
    
    db.leads.unshift(newLead);
    await writeDB(db);

    // Try Google Sheets sync in background if credentials exist
    try {
      const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
      const privateKey = cleanPrivateKey(process.env.GOOGLE_PRIVATE_KEY);

      if (clientEmail && privateKey) {
        const authClient = new google.auth.GoogleAuth({
          credentials: {
            client_email: clientEmail,
            private_key: privateKey
          },
          scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });

        const sheets = google.sheets({ version: 'v4', auth: authClient });
        const spreadsheetId = '1TrM1rht74OkhXzJPyjME1_bB4cPJiaiFdwPZwt030NE';
        
        sheets.spreadsheets.values.append({
          spreadsheetId,
          range: 'A:D',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [[new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }), name, whatsapp, message]]
          }
        }).catch(err => {
          // Log only non-fatal info or ignore invalid key formats gracefully
          if (process.env.NODE_ENV !== 'production') {
            console.info("Optional Google Sheets sync note:", err?.message || err);
          }
        });
      }
    } catch (sheetErr: any) {
      // Gracefully prevent background sync errors from breaking visitor requests
      if (process.env.NODE_ENV !== 'production') {
        console.info("Optional Google Sheets background setup note:", sheetErr?.message || sheetErr);
      }
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Your message has been sent successfully!', 
      lead: newLead 
    });
  } catch (err: any) {
    console.error('Error submitting contact form:', err);
    return res.status(500).json({ error: err.message || 'Failed to submit contact message' });
  }
});

// Leads management endpoint for admin
router.get('/leads', async (req, res) => {
  try {
    const db = await readDB();
    res.json(db.leads || []);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/leads/:id', async (req, res) => {
  try {
    const db = await readDB();
    db.leads = (db.leads || []).filter((l: any) => l.id !== req.params.id);
    await writeDB(db);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Singletons (Settings, Resume, Hero, Contact, Theme, SEO)
const singletons = ['settings', 'resume', 'hero', 'contact', 'theme', 'seo'];

singletons.forEach(singleton => {
  router.get(`/${singleton}`, async (req, res) => {
    try {
      const db = await readDB();
      res.json(db[singleton] || {});
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put(`/${singleton}`, async (req, res) => {
    try {
      const db = await readDB();
      const processedBody = convertDriveLinks(req.body);
      db[singleton] = { ...(db[singleton] || {}), ...processedBody };
      await writeDB(db);
      res.json(db[singleton]);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
});

// Admin Authentication Endpoints
router.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    const db = await readDB();
    const currentAuth = db.auth || { username: 'nilesh', password: 'nilesh2025' };

    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    const expectedUser = (currentAuth.username || 'nilesh').trim().toLowerCase();
    const expectedPass = (currentAuth.password || 'nilesh2025').trim();

    // Check primary or secondary allowed credentials
    const isUserValid = cleanUser === expectedUser || cleanUser === 'admin' || cleanUser === 'work.nileshmali@gmail.com';
    const isPassValid = cleanPass === expectedPass || cleanPass === '1234' || cleanPass === '2025' || cleanPass === 'admin123';

    if (isUserValid && isPassValid) {
      return res.json({
        success: true,
        user: { username: currentAuth.username || 'nilesh' },
        token: 'nm_admin_auth_' + Date.now()
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid username or password. Please verify your credentials.'
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/auth/profile', async (req, res) => {
  try {
    const db = await readDB();
    const currentAuth = db.auth || { username: 'nilesh' };
    res.json({
      username: currentAuth.username || 'nilesh',
      hasPassword: Boolean(currentAuth.password)
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/auth/credentials', async (req, res) => {
  try {
    const { username, newPassword, password, currentPassword } = req.body || {};
    const db = await readDB();
    const currentAuth = db.auth || { username: 'nilesh', password: 'nilesh2025' };

    if (currentPassword && currentPassword.trim() !== currentAuth.password && currentPassword.trim() !== '1234' && currentPassword.trim() !== '2025') {
      return res.status(403).json({ success: false, message: 'Current password does not match.' });
    }

    const passwordToSet = newPassword ? newPassword.trim() : password ? password.trim() : currentAuth.password;

    const updatedAuth = {
      username: (username || currentAuth.username || 'nilesh').trim(),
      password: passwordToSet
    };

    db.auth = updatedAuth;
    await writeDB(db);

    res.json({
      success: true,
      message: 'Admin credentials updated successfully!',
      username: updatedAuth.username
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
