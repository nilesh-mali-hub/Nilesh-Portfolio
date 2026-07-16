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
      const { name, whatsapp, message } = req.body;
      
      if (!name || !whatsapp || !message) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
      const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

      if (!clientEmail || !privateKey) {
        console.error("Missing Google Service Account credentials.");
        res.status(500).json({ error: "Server configuration error. Contact administrator." });
        return;
      }

      const authClient = new google.auth.JWT(
        clientEmail,
        undefined,
        privateKey,
        ['https://www.googleapis.com/auth/spreadsheets']
      );

      const sheets = google.sheets({ version: 'v4', auth: authClient });
      
      // Use the spreadsheet ID provided by the user
      const spreadsheetId = '1TrM1rht74OkhXzJPyjME1_bB4cPJiaiFdwPZwt030NE';
      
      // Append data to the first sheet
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'A:D', // Appends to the next available row in columns A through D
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }), name, whatsapp, message]]
        }
      });

      res.json({ success: true, message: "Entry added successfully" });
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
