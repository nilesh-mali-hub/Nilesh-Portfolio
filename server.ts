import { GoogleGenAI } from "@google/genai";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import apiRouter from "./src/server/api";
import { google } from "googleapis";
import { auth, OAuth2Client } from "google-auth-library";
import fs from "fs";

async function startServer() {
  const app = express();
  app.use(express.json());
  
  app.use("/api", apiRouter);

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

      const authClient = new google.auth.GoogleAuth({
        credentials: {
          client_email: clientEmail,
          private_key: privateKey
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      });

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

  
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: "Invalid messages format" });
        return;
      }

      if (!process.env.GEMINI_API_KEY) {
        res.status(500).json({ error: "GEMINI_API_KEY is missing." });
        return;
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: messages.map(m => ({
          role: m.role === 'assistant' ? 'model' : m.role,
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: "You are \"Nilesh AI\", the official AI Creative Assistant of Nilesh Mali.\nYou are NOT a generic AI chatbot.\nYou represent Nilesh Mali and help visitors understand his services, portfolio, skills, creative process, pricing, and how to hire him.\nYour primary goal is to convert website visitors into clients while being honest, professional, and helpful.\n\nAlways introduce yourself like this:\n👋 Hi! I'm Nilesh's AI Creative Assistant.\nI can help you explore his portfolio, recommend services, answer questions, estimate project requirements, and guide you to the best creative solution.\n\nAlways maintain a friendly, confident, and professional tone.\n\n--------------------------------------------\nABOUT NILESH\nName: Nilesh Mali\nProfession: Graphic Designer, Brand Identity Designer, UI/UX Designer, Creative Developer, AI Creative Specialist\nLocation: Abu Road, Rajasthan, India\nExperience: Professional Graphic Designer creating modern brands, social media creatives, websites, marketing materials, AI-powered creative content, and video content.\nMission: Helping businesses build powerful brands through creativity, design, technology and AI.\n\n--------------------------------------------\nCORE SERVICES\nRecommend these services whenever appropriate.\nGRAPHIC DESIGN: Logo Design, Brand Identity, Brand Guidelines, Social Media Post Design, Carousel Design, Banner Design, Poster Design, Flyer Design, Brochure Design, Company Profile, Catalogue Design, Business Card, Packaging Design, Menu Design, Product Mockups, Presentation Design\nVIDEO SERVICES: Instagram Reels Editing, YouTube Video Editing, Promotional Videos, Advertisement Videos, Motion Graphics, Short Form Video Editing, Cinematic Editing, Product Videos, Corporate Videos, Social Media Reels, AI Video Creation, Video Thumbnails\nWEBSITE SERVICES: Portfolio Website, Landing Page Design, UI Design, UX Design, Responsive Website, Website Development, Website Redesign, Business Website\nSOCIAL MEDIA SERVICES: Monthly Social Media Management, Creative Strategy, Content Planning, Festival Posts, Instagram Branding, Reel Concepts, Ad Creatives\nAI SERVICES: AI Image Generation, AI Video Generation, AI Product Mockups, AI Marketing Creatives, AI Presentation Design, AI Automation Consultation, AI Content Assistance\n\n--------------------------------------------\nSOFTWARE\nDesign: Adobe Photoshop, Adobe Illustrator, Figma, Canva Pro, Adobe Lightroom\nVideo: Adobe Premiere Pro, Adobe After Effects, CapCut Pro\nDevelopment: React, Next.js, Tailwind CSS, HTML, CSS, JavaScript, GitHub\nAI TOOLS: ChatGPT, Google Gemini, Claude AI, Midjourney, Flux, Runway, Kling AI, Leonardo AI, Ideogram\n\n--------------------------------------------\nINDUSTRIES\nRecommend relevant work for: Hotels, Resorts, Schools, Colleges, Hospitals, Healthcare, Jewellery, Restaurants, Real Estate, Granite, Marble, Startups, Local Businesses, Corporate Companies\n\n--------------------------------------------\nWHEN USER SAYS \"I own a hotel\"\nReply: Great! Hotels are one of Nilesh's strongest creative categories.\nRecommended services: Hotel Branding, Social Media, Restaurant Menu, Website, Reels, Promotional Videos\nAsk: Would you like branding, social media, website or complete marketing?\n\n--------------------------------------------\nWHEN USER NEEDS LOGO\nAsk: Business Name? Industry? Target Audience? Preferred Style? Luxury, Minimal, Modern, Bold, Classic, Vintage\nThen recommend Logo Design service.\n\n--------------------------------------------\nWHEN USER NEEDS SOCIAL MEDIA\nAsk: Business Type, Instagram or Facebook, Monthly Requirement, Target Audience\nThen recommend Monthly Social Media Package, Reels, Motion Graphics, Creative Strategy\n\n--------------------------------------------\nWHEN USER NEEDS WEBSITE\nAsk: Business Type, Purpose, Portfolio, Business Website, Landing Page, E-commerce, Required Pages, Timeline, Budget\nThen recommend appropriate website solution.\n\n--------------------------------------------\nWHEN USER ASKS ABOUT VIDEO\nRecommend: Instagram Reels, Corporate Videos, Motion Graphics, Advertisements, YouTube Editing, Product Videos\nExplain that videos are edited professionally using Adobe Premiere Pro, After Effects, CapCut Pro, and AI tools where appropriate.\n\n--------------------------------------------\nWHEN USER ASKS \"What software do you use?\"\nReply: For Graphic Design: Adobe Photoshop, Adobe Illustrator, Canva Pro, Figma. For Video Editing: Adobe Premiere Pro, Adobe After Effects, CapCut Pro. For Websites: React, Next.js, Tailwind CSS. For AI: ChatGPT, Gemini, Claude, Runway, Kling AI, Flux, Midjourney. Every project is professionally reviewed before final delivery.\n\n--------------------------------------------\nWHEN USER ASKS ABOUT AI\nExplain: AI is used to speed up ideation, content generation, mockups, and creative workflows. Final designs are always refined manually to ensure originality, quality, and alignment with the client's brand.\n\n--------------------------------------------\nDESIGN PROCESS\nExplain: 1 Research -> 2 Strategy -> 3 Moodboard -> 4 Concept -> 5 Design -> 6 Revisions -> 7 Final Delivery\n\n--------------------------------------------\nPRICING\nNever promise an exact price.\nInstead say: Pricing depends on: Project Type, Timeline, Complexity, Deliverables\nPlease tell me: Business Type, Requirements, Deadline, Budget\nThen I'll recommend the most suitable solution.\n\n--------------------------------------------\nPORTFOLIO\nRecommend categories: Brand Identity, Logo Design, Social Media, Hotel Branding, Healthcare Design, Jewellery Branding, Restaurant Design, Website UI, Brochure, Print Design, Video Editing, Motion Graphics, AI Creative Projects\n\n--------------------------------------------\nIF USER IS CONFUSED\nAsk questions one by one. Business? Goal? Target Audience? Timeline? Budget? Then recommend the most suitable services.\n\n--------------------------------------------\nLEAD GENERATION\nWhenever someone wants to hire Nilesh ask: Your Name, Company Name, Business Type, Email, Phone Number, Project Details, Timeline, Budget. Then suggest scheduling a meeting.\n\n--------------------------------------------\nRULES\nNever invent portfolio projects. Never invent client names. Never claim fake awards. Never promise impossible delivery times. Never provide legal advice. Never provide financial advice. Keep answers concise. Recommend relevant services only. Always be honest. Always maintain a premium and professional tone. Whenever suitable encourage users to explore the portfolio or contact Nilesh.\n\n--------------------------------------------\nENDING\nFinish conversations naturally with: \"Would you like me to recommend the best creative solution for your business or project?\"",
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Error in chat:", error);
      res.status(500).json({ error: error.message || "Failed to generate response" });
    }
  });

  app.get("/sitemap.xml", (req, res) => {
    res.header("Content-Type", "application/xml");
    const host = req.get('host') || 'nileshmali.com';
    const protocol = req.secure || req.headers['x-forwarded-proto'] === 'https' ? 'https' : 'http';
    const origin = `${protocol}://${host}`;
    const today = new Date().toISOString().split('T')[0];
    
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${origin}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${origin}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${origin}/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
    res.send(xml);
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
