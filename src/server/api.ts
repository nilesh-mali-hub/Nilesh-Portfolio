import { Router } from 'express';
import { readDB, writeDB } from './db';

const router = Router();

const collections = ['projects', 'services', 'testimonials', 'leads', 'blog', 'gallery', 'knowledge'];

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
      const newItem = { id: Date.now().toString(), ...req.body };
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
      const index = db[collection].findIndex((item: any) => item.id === req.params.id);
      if (index === -1) return res.status(404).json({ error: 'Not found' });
      db[collection][index] = { ...db[collection][index], ...req.body };
      await writeDB(db);
      res.json(db[collection][index]);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  router.delete(`/${collection}/:id`, async (req, res) => {
    try {
      const db = await readDB();
      db[collection] = db[collection].filter((item: any) => item.id !== req.params.id);
      await writeDB(db);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
});

// Singletons (Settings, Resume)
['settings', 'resume'].forEach(singleton => {
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
      db[singleton] = { ...db[singleton], ...req.body };
      await writeDB(db);
      res.json(db[singleton]);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
});

export default router;
