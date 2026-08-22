import fs from 'fs/promises';
import path from 'path';
import { defaultData } from '../data/defaultData';

const DB_FILE = path.join(process.cwd(), 'db.json');

export async function readDB() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    const parsed = JSON.parse(data);

    // Deep-merge with defaultData to guarantee all collections and singletons exist
    const merged: any = { ...defaultData, ...parsed };

    const arrayKeys = ['projects', 'services', 'testimonials', 'leads', 'blog', 'analytics', 'gallery', 'knowledge', 'experience', 'skills'];
    for (const key of arrayKeys) {
      if (!Array.isArray(merged[key])) {
        merged[key] = Array.isArray((defaultData as any)[key]) ? (defaultData as any)[key] : [];
      }
    }

    const objectKeys = ['hero', 'resume', 'theme', 'auth', 'settings', 'contact', 'seo'];
    for (const key of objectKeys) {
      merged[key] = { ...((defaultData as any)[key] || {}), ...(parsed[key] || {}) };
    }

    return merged;
  } catch (error: any) {
    if (error.code === 'ENOENT' || error instanceof SyntaxError) {
      try {
        await writeDB(defaultData);
      } catch (writeErr) {
        console.error('Failed to write initial default DB:', writeErr);
      }
      return defaultData;
    }
    console.error('Error reading DB, falling back to default data:', error);
    return defaultData;
  }
}

export async function writeDB(data: any) {
  try {
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to write database file:', error);
    throw error;
  }
}
