import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

const outputDir = path.resolve('public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'resume.pdf');
const copyPath = path.join(outputDir, 'Nilesh_Mali_Resume.pdf');

// A4 dimensions: 595.28 x 841.89 points
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 0, bottom: 0, left: 0, right: 0 },
  autoFirstPage: true
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

const W = 595.28;
const H = 841.89;

// Background
doc.rect(0, 0, W, H).fill('#FFFFFF');

// Left Column Dark Card (Pillar)
const leftW = 210;
const leftMargin = 16;
const cardW = leftW - leftMargin;
const cardH = H - 32;

// Draw rounded dark card on left
doc.roundedRect(leftMargin, 16, cardW, cardH, 18).fill('#0D0E12');

// Star accent top right
doc.save();
doc.translate(W - 28, 20);
doc.fillColor('#D1FF52');
doc.path('M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z').fill();
doc.restore();

// Star accent bottom right
doc.save();
doc.translate(W - 24, H - 24);
doc.fillColor('#D1FF52');
doc.path('M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z').fill();
doc.restore();

// Left Content
let ly = 38;
const lx = leftMargin + 16;
const lw = cardW - 32;

// Name
doc.font('Helvetica-Bold').fontSize(26).fillColor('#FFFFFF').text('NILESH', lx, ly);
ly += 26;
doc.font('Helvetica-Bold').fontSize(26).fillColor('#D1FF52').text('MALI', lx, ly);
ly += 34;

// Titles
doc.font('Helvetica-Bold').fontSize(11).fillColor('#FFFFFF').text('Graphic Designer', lx, ly);
ly += 16;
doc.font('Helvetica').fontSize(9).fillColor('#A3A3A3').text('Video Editor  •  Digital Marketing', lx, ly);
ly += 14;
doc.font('Helvetica').fontSize(9).fillColor('#A3A3A3').text('UI/UX', lx, ly);
ly += 26;

function drawLeftSectionHeading(title, y) {
  doc.font('Helvetica-Bold').fontSize(10).fillColor('#D1FF52').text(title, lx, y, { characterSpacing: 1.5 });
  return y + 16;
}

// CONTACT
ly = drawLeftSectionHeading('CONTACT', ly);
doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#D1FF52').text('■ ', lx, ly, { continued: true });
doc.font('Helvetica').fontSize(8.5).fillColor('#FFFFFF').text('+91 6378954363', { link: 'tel:+916378954363' });
ly += 14;

doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#D1FF52').text('■ ', lx, ly, { continued: true });
doc.font('Helvetica').fontSize(8.5).fillColor('#FFFFFF').text('nileshmali605@gmail.com', { link: 'mailto:nileshmali605@gmail.com' });
ly += 14;

doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#D1FF52').text('■ ', lx, ly, { continued: true });
doc.font('Helvetica').fontSize(8.5).fillColor('#FFFFFF').text('Portfolio  (nileshmali.com)', { link: 'https://nileshmali2026.netlify.app', underline: true });
ly += 14;

doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#D1FF52').text('■ ', lx, ly, { continued: true });
doc.font('Helvetica').fontSize(8.5).fillColor('#FFFFFF').text('LinkedIn  (/in/nileshmali)', { link: 'https://www.linkedin.com/in/nilesh-mali-a5997b28a/', underline: true });
ly += 14;

doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#D1FF52').text('■ ', lx, ly, { continued: true });
doc.font('Helvetica').fontSize(8.5).fillColor('#FFFFFF').text('Instagram  (@_nilesh._.mali_)', { link: 'https://www.instagram.com/_nilesh._.mali_/', underline: true });
ly += 22;

// EDUCATION
ly = drawLeftSectionHeading('EDUCATION', ly);
doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#D1FF52').text('2025 – 2026', lx, ly);
ly += 12;
doc.font('Helvetica-Bold').fontSize(10).fillColor('#FFFFFF').text('PGDCA', lx, ly);
ly += 12;
doc.font('Helvetica').fontSize(8.5).fillColor('#A3A3A3').text('Madhav University', lx, ly);
ly += 18;

doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#D1FF52').text('2022 – 2025', lx, ly);
ly += 12;
doc.font('Helvetica-Bold').fontSize(10).fillColor('#FFFFFF').text('B.A.', lx, ly);
ly += 12;
doc.font('Helvetica').fontSize(8.5).fillColor('#A3A3A3').text('Mohanlal Sukhadia University, Udaipur', lx, ly, { width: lw });
ly += 26;

// TOOLS
ly = drawLeftSectionHeading('TOOLS', ly);
const toolBoxes = [
  { name: 'Photoshop', badge: 'Ps', bg: '#001E36', fg: '#31A8FF' },
  { name: 'Illustrator', badge: 'Ai', bg: '#330000', fg: '#FF9A00' },
  { name: 'InDesign', badge: 'Id', bg: '#49021F', fg: '#FF3366' },
  { name: 'CorelDRAW', badge: 'CDR', bg: '#103810', fg: '#44CC44' },
  { name: 'Figma', badge: 'Fig', bg: '#2C1D42', fg: '#A259FF' },
  { name: 'Canva', badge: 'Can', bg: '#003344', fg: '#00C4CC' },
];

let bx = lx;
let by = ly;
toolBoxes.forEach((t, i) => {
  doc.roundedRect(bx, by, 26, 26, 5).fill(t.bg);
  doc.font('Helvetica-Bold').fontSize(10).fillColor(t.fg).text(t.badge, bx, by + 6, { width: 26, align: 'center' });
  doc.font('Helvetica').fontSize(7.5).fillColor('#CCCCCC').text(t.name, bx - 4, by + 28, { width: 34, align: 'center' });
  bx += 56;
  if ((i + 1) % 3 === 0) {
    bx = lx;
    by += 44;
  }
});
ly = by + 8;

// AI / PRODUCTIVITY
ly = drawLeftSectionHeading('AI / PRODUCTIVITY', ly);
doc.font('Helvetica').fontSize(8.5).fillColor('#FFFFFF').text('ChatGPT  •  Claude', lx, ly);
ly += 13;
doc.font('Helvetica').fontSize(8.5).fillColor('#FFFFFF').text('Gemini  •  Gamma AI', lx, ly);
ly += 22;

// LANGUAGES
ly = drawLeftSectionHeading('LANGUAGES', ly);
doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#FFFFFF').text('Hindi — ', lx, ly, { continued: true });
doc.font('Helvetica').fontSize(8.5).fillColor('#A3A3A3').text('Fluent');
ly += 13;
doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#FFFFFF').text('English — ', lx, ly, { continued: true });
doc.font('Helvetica').fontSize(8.5).fillColor('#A3A3A3').text('Working Proficiency');

// =====================
// RIGHT COLUMN
// =====================
const rx = leftMargin + cardW + 28;
const rw = W - rx - 28;
let ry = 36;

// Hello! Title
doc.font('Helvetica-Bold').fontSize(36).fillColor('#0D0E12').text('Hello!', rx, ry);
// Accent line below Hello!
doc.rect(rx, ry + 40, 100, 7).fill('#D1FF52');
ry += 52;

// Summary text
const summary = "I'm Nilesh Mali, a graphic designer with 1+ year of hands-on experience in branding, social media design, UI/UX, Meta Ads creatives and video editing. I design posts, carousels, reels, banners, brochures and brand identity material for local businesses, and support the content planning and Meta Ads campaigns behind them.";
doc.font('Helvetica').fontSize(9.5).fillColor('#333333').text(summary, rx, ry, { width: rw, lineGap: 3.5 });
ry += 58;

function drawRightBadge(title, y) {
  const badgeW = 90;
  const badgeH = 17;
  doc.rect(rx, y, badgeW, badgeH).fill('#D1FF52');
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#0D0E12').text(title, rx, y + 3.5, { width: badgeW, align: 'center', characterSpacing: 1.2 });
  return y + 25;
}

// EXPERIENCE
ry = drawRightBadge('EXPERIENCE', ry);

// Experience Item
const dateColW = 75;
const detailColX = rx + dateColW + 10;
const detailColW = rw - dateColW - 10;

doc.font('Helvetica-Bold').fontSize(10).fillColor('#0D0E12').text('Aug 2025', rx, ry);
doc.font('Helvetica-Bold').fontSize(9).fillColor('#555555').text('– Present', rx, ry + 12);

doc.font('Helvetica-Bold').fontSize(14).fillColor('#0D0E12').text('Graphic Designer', detailColX, ry);
doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#444444').text('Social Media & Digital Marketing', detailColX, ry + 16);
doc.font('Helvetica').fontSize(9).fillColor('#666666').text('Redes Creation', detailColX, ry + 28);

const bullets = [
  "Design Instagram posts, carousels and reels that follow each brand's visual style.",
  "Produce banners, hoardings, brochures and business cards for local business clients.",
  "Create logos, brand creatives and visual identity material.",
  "Design ad creatives and support Meta Ads campaigns on Facebook and Instagram.",
  "Plan content and manage posting for Instagram and Facebook pages.",
  "Plan campaigns and content strategy for local businesses; support Google Business Profile (GMB).",
  "Edit reels and short promotional videos; assist with video shoots, photography and storyboarding."
];

let byExp = ry + 44;
bullets.forEach(b => {
  doc.font('Helvetica').fontSize(8.5).fillColor('#222222');
  doc.text('•', detailColX, byExp);
  doc.text(b, detailColX + 10, byExp, { width: detailColW - 12, lineGap: 1.5 });
  byExp += (doc.heightOfString(b, { width: detailColW - 12 }) + 5);
});

ry = byExp + 10;

// SKILLS
ry = drawRightBadge('SKILLS', ry);

const skillItems = [
  {
    category: 'Design',
    text: 'Graphic Design, Social Media Design, Branding & Visual Identity, Typography, Layout Design, UI/UX Design, Marketing Creatives'
  },
  {
    category: 'Marketing',
    text: 'Social Media Marketing, Meta Ads, Content Strategy, Content Calendar Planning, Campaign Planning, Brand Communication, Social Media Analytics, Google Business Profile'
  },
  {
    category: 'Video',
    text: 'Reels & Short-form Editing, Video Shoot & Photography, Storyboarding'
  }
];

skillItems.forEach(s => {
  doc.font('Helvetica-Bold').fontSize(9).fillColor('#0D0E12').text(s.category, rx, ry, { width: 65 });
  doc.font('Helvetica').fontSize(8.5).fillColor('#333333').text(s.text, rx + 75, ry, { width: rw - 75, lineGap: 2 });
  ry += (Math.max(16, doc.heightOfString(s.text, { width: rw - 75 }) + 6));
});

ry += 6;

// STRENGTHS
ry = drawRightBadge('STRENGTHS', ry);
const strengths = 'Creative and detail-oriented  •  Quick learner of new tools  •  Good sense of colour and layout  •  Team player';
doc.font('Helvetica').fontSize(9).fillColor('#222222').text(strengths, rx, ry, { width: rw, lineGap: 3 });

doc.end();

writeStream.on('finish', () => {
  fs.copyFileSync(outputPath, copyPath);
  console.log('Successfully generated Nilesh Mali resume PDF at:', outputPath);
});
