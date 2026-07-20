import fs from 'fs/promises';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'db.json');

export const defaultData = {
  hero: {
    title: "Graphic Designer",
    subtitle: "Creative graphic designer blending imagination with strategy. I specialize in branding, digital experiences, and visual storytelling that elevate brands and engage audiences across all platforms."
  },
  experience: [
    {
      id: "exp-1",
      company: "Design Studio X",
      role: "Senior Graphic Designer",
      duration: "2020 - Present",
      description: "Led branding and UI/UX design for premium clients.",
      icon: "graduation-cap"
    },
    {
      id: "exp-2",
      company: "Creative Agency Co.",
      role: "Visual Designer",
      duration: "2018 - 2020",
      description: "Developed marketing campaigns and brand guidelines.",
      icon: "briefcase"
    }
  ],
  skills: [
    { id: "sk-1", icon: "Ps", name: "Ps" },
    { id: "sk-2", icon: "Ai", name: "Ai" },
    { id: "sk-3", icon: "Xd", name: "Xd" },
    { id: "sk-4", icon: "Id", name: "Id" },
    { id: "sk-5", icon: "Figma", name: "Figma" },
    { id: "sk-6", icon: "Scissors", name: "Pr" },
    { id: "sk-7", icon: "Presentation", name: "Ae" }
  ],
  projects: [],
  services: [],
  testimonials: [],
  leads: [],
  blog: [],
  analytics: [],
  resume: {
    experience: [],
    education: [],
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  gallery: [],
  knowledge: [],
  settings: {
    siteName: 'Nilesh Mali',
    email: 'work.nileshmali@gmail.com',
    gaMeasurementId: ''
  },
  contact: {
    email: 'work.nileshmali@gmail.com',
    phone: '+91 9876543210',
    instagram: 'https://instagram.com/nileshmali',
    linkedin: 'https://linkedin.com/in/nileshmali',
    behance: 'https://behance.net/nileshmali25'
  }
};

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
