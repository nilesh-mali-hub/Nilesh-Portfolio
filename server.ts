import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { google } from "googleapis";
import { auth, OAuth2Client } from "google-auth-library";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/contact", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        res.status(401).json({ error: "Unauthorized: Missing Authorization header" });
        return;
      }
      
      const accessToken = authHeader.replace("Bearer ", "");
      const { name, whatsapp, message } = req.body;
      
      if (!name || !whatsapp || !message) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      const authClient = new google.auth.OAuth2();
      authClient.setCredentials({ access_token: accessToken });
      
      const sheets = google.sheets({ version: 'v4', auth: authClient });
      
      // We need a spreadsheet to write to. For simplicity, we'll search for it or create it.
      // But creating it is complex without Drive API. Let's create a new one every time if we can't find it? No.
      // Let's create a spreadsheet on the user's account and return the URL.
      // Since it's a demo, we'll create a new spreadsheet if not specified.
      // Actually, let's just create a new one and append to it. 
      // To avoid creating a new one every time, we need a place to store the spreadsheetId.
      // We can use a property in the user's Google Drive, but we only have Sheets scope.
      // Let's just create a new spreadsheet for this form submission as this is the only way with just sheets scope.
      
      const response = await sheets.spreadsheets.create({
        requestBody: {
          properties: {
            title: `Contact from ${name}`
          },
          sheets: [
            {
              properties: {
                title: 'Submissions'
              }
            }
          ]
        }
      });
      
      const spreadsheetId = response.data.spreadsheetId!;
      
      // Create headers and append data
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Submissions!A1:D1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [['Timestamp', 'Name', 'WhatsApp Number', 'Message']]
        }
      });
      
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Submissions!A2:D2',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[new Date().toISOString(), name, whatsapp, message]]
        }
      });

      res.json({ success: true, spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}` });
    } catch (error: any) {
      console.error("Error saving contact:", error);
      res.status(500).json({ error: error.message || "Failed to save contact" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
