import fs from 'fs/promises';
import path from 'path';
import { defaultData } from '../data/defaultData';

const DB_FILE = path.join(process.cwd(), 'db.json');

export async function readDB() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      await writeDB(defaultData);
      return defaultData;
    }
    throw error;
  }
}

export async function writeDB(data: any) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}
