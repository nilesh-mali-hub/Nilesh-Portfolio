import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';
import { ExternalLink, ArrowLeft, Phone, Mail, Globe, Linkedin, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ResumePage() {
  const [pdfUrl, setPdfUrl] = useState<string>('https://drive.google.com/file/d/1M-KDhvdXRdCUPmwFN6gi616c6ds8Snp0/view?usp=sharing');

  useEffect(() => {
    fetch('/api/resume')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.pdfUrl) setPdfUrl(data.pdfUrl);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <SEO
        title="Resume | Nilesh Mali — Graphic Designer & Creative Specialist"
        description="Official professional resume of Nilesh Mali. Graphic Designer, Video Editor, Digital Marketing and UI/UX specialist."
      />

      <div className="max-w-5xl mx-auto">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-neutral-900/80 border border-neutral-800 p-4 rounded-2xl backdrop-blur-md">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-[#D1FF52] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to About
          </Link>

          <div className="flex items-center gap-3">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D1FF52] text-black text-xs font-bold hover:bg-[#bbf03e] shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              <ExternalLink className="w-4 h-4" /> View in Google Drive
            </a>
          </div>
        </div>

        {/* Resume Preview Paper Document */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white text-neutral-900 rounded-3xl shadow-2xl overflow-hidden border border-neutral-800 grid grid-cols-1 md:grid-cols-12 min-h-[900px]"
        >
          {/* Left Dark Column */}
          <div className="md:col-span-4 bg-[#0D0E12] text-white p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="mb-8">
                <h1 className="font-display font-black text-3xl tracking-tight text-white leading-none">
                  NILESH
                </h1>
                <h1 className="font-display font-black text-3xl tracking-tight text-[#D1FF52] leading-none mt-1">
                  MALI
                </h1>
                <div className="mt-4 pt-3 border-t border-neutral-800">
                  <p className="font-bold text-sm text-white">Graphic Designer</p>
                  <p className="text-xs text-neutral-400 mt-1">Video Editor • Digital Marketing</p>
                  <p className="text-xs text-neutral-400">UI/UX</p>
                </div>
              </div>

              {/* Contact */}
              <div className="mb-7">
                <p className="font-mono text-xs font-bold tracking-widest text-[#D1FF52] uppercase mb-3">
                  CONTACT
                </p>
                <div className="space-y-2 text-xs text-neutral-300">
                  <p className="flex items-center gap-2">
                    <span className="text-[#D1FF52]">■</span>
                    <a href="tel:+916378954363" className="hover:text-[#D1FF52] transition-colors">+91 6378954363</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[#D1FF52]">■</span>
                    <a href="mailto:nileshmali605@gmail.com" className="hover:text-[#D1FF52] transition-colors">nileshmali605@gmail.com</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[#D1FF52]">■</span>
                    <a href="https://nileshmali2026.netlify.app" target="_blank" rel="noopener noreferrer" className="hover:text-[#D1FF52] underline transition-colors">Portfolio (nileshmali.com)</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[#D1FF52]">■</span>
                    <a href="https://www.linkedin.com/in/nilesh-mali-a5997b28a/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D1FF52] underline transition-colors">LinkedIn (/in/nileshmali)</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[#D1FF52]">■</span>
                    <a href="https://www.instagram.com/_nilesh._.mali_/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D1FF52] underline transition-colors">Instagram (@_nilesh._.mali_)</a>
                  </p>
                </div>
              </div>

              {/* Education */}
              <div className="mb-7">
                <p className="font-mono text-xs font-bold tracking-widest text-[#D1FF52] uppercase mb-3">
                  EDUCATION
                </p>
                <div className="space-y-4 text-xs">
                  <div>
                    <span className="font-mono font-bold text-[#D1FF52]">2025 – 2026</span>
                    <p className="font-bold text-white text-sm mt-0.5">PGDCA</p>
                    <p className="text-neutral-400">Madhav University</p>
                  </div>
                  <div>
                    <span className="font-mono font-bold text-[#D1FF52]">2022 – 2025</span>
                    <p className="font-bold text-white text-sm mt-0.5">B.A.</p>
                    <p className="text-neutral-400 leading-snug">Mohanlal Sukhadia University, Udaipur</p>
                  </div>
                </div>
              </div>

              {/* Tools */}
              <div className="mb-7">
                <p className="font-mono text-xs font-bold tracking-widest text-[#D1FF52] uppercase mb-3">
                  TOOLS
                </p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-neutral-900 border border-neutral-800 p-2 rounded-lg">
                    <span className="font-bold text-sky-400 text-sm">Ps</span>
                    <p className="text-[9px] text-neutral-400 mt-0.5">Photoshop</p>
                  </div>
                  <div className="bg-neutral-900 border border-neutral-800 p-2 rounded-lg">
                    <span className="font-bold text-amber-500 text-sm">Ai</span>
                    <p className="text-[9px] text-neutral-400 mt-0.5">Illustrator</p>
                  </div>
                  <div className="bg-neutral-900 border border-neutral-800 p-2 rounded-lg">
                    <span className="font-bold text-pink-500 text-sm">Id</span>
                    <p className="text-[9px] text-neutral-400 mt-0.5">InDesign</p>
                  </div>
                  <div className="bg-neutral-900 border border-neutral-800 p-2 rounded-lg">
                    <span className="font-bold text-emerald-400 text-sm">CDR</span>
                    <p className="text-[9px] text-neutral-400 mt-0.5">CorelDRAW</p>
                  </div>
                  <div className="bg-neutral-900 border border-neutral-800 p-2 rounded-lg">
                    <span className="font-bold text-purple-400 text-sm">Fig</span>
                    <p className="text-[9px] text-neutral-400 mt-0.5">Figma</p>
                  </div>
                  <div className="bg-neutral-900 border border-neutral-800 p-2 rounded-lg">
                    <span className="font-bold text-cyan-400 text-sm">Can</span>
                    <p className="text-[9px] text-neutral-400 mt-0.5">Canva</p>
                  </div>
                </div>
              </div>

              {/* AI / Productivity */}
              <div className="mb-7">
                <p className="font-mono text-xs font-bold tracking-widest text-[#D1FF52] uppercase mb-2">
                  AI / PRODUCTIVITY
                </p>
                <p className="text-xs text-neutral-300">ChatGPT • Claude</p>
                <p className="text-xs text-neutral-300 mt-0.5">Gemini • Gamma AI</p>
              </div>

              {/* Languages */}
              <div>
                <p className="font-mono text-xs font-bold tracking-widest text-[#D1FF52] uppercase mb-2">
                  LANGUAGES
                </p>
                <p className="text-xs text-neutral-300">
                  <strong className="text-white">Hindi —</strong> Fluent
                </p>
                <p className="text-xs text-neutral-300 mt-1">
                  <strong className="text-white">English —</strong> Working Proficiency
                </p>
              </div>
            </div>
          </div>

          {/* Right Content Column */}
          <div className="md:col-span-8 p-6 sm:p-10 flex flex-col justify-between bg-white text-neutral-900">
            <div>
              {/* Hello Header */}
              <div className="mb-8">
                <div className="inline-block relative">
                  <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-neutral-950">
                    Hello!
                  </h2>
                  <div className="h-2 w-full bg-[#D1FF52] rounded-full mt-1"></div>
                </div>
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mt-4">
                  I&apos;m Nilesh Mali, a graphic designer with 1+ year of hands-on experience in branding, social media design, UI/UX, Meta Ads creatives and video editing. I design posts, carousels, reels, banners, brochures and brand identity material for local businesses, and support the content planning and Meta Ads campaigns behind them.
                </p>
              </div>

              {/* Experience */}
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-[#D1FF52] text-black font-display font-bold text-xs tracking-wider uppercase rounded mb-4">
                  EXPERIENCE
                </span>

                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
                  <div className="sm:w-28 shrink-0">
                    <p className="font-bold text-sm text-neutral-900">Aug 2025</p>
                    <p className="text-xs text-neutral-500 font-semibold">– Present</p>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-display font-bold text-lg text-neutral-950">
                      Graphic Designer
                    </h3>
                    <p className="text-xs font-semibold text-neutral-600">
                      Social Media & Digital Marketing • Redes Creation
                    </p>

                    <ul className="mt-3 space-y-1.5 text-xs text-neutral-700">
                      <li className="flex items-start gap-2">
                        <span className="text-[#84cc16] mt-0.5">•</span>
                        <span>Design Instagram posts, carousels and reels that follow each brand&apos;s visual style.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#84cc16] mt-0.5">•</span>
                        <span>Produce banners, hoardings, brochures and business cards for local business clients.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#84cc16] mt-0.5">•</span>
                        <span>Create logos, brand creatives and visual identity material.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#84cc16] mt-0.5">•</span>
                        <span>Design ad creatives and support Meta Ads campaigns on Facebook and Instagram.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#84cc16] mt-0.5">•</span>
                        <span>Plan content and manage posting for Instagram and Facebook pages.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#84cc16] mt-0.5">•</span>
                        <span>Plan campaigns and content strategy for local businesses; support Google Business Profile (GMB).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#84cc16] mt-0.5">•</span>
                        <span>Edit reels and short promotional videos; assist with video shoots, photography and storyboarding.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-[#D1FF52] text-black font-display font-bold text-xs tracking-wider uppercase rounded mb-4">
                  SKILLS
                </span>

                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                    <span className="sm:col-span-3 font-bold text-neutral-900">Design</span>
                    <span className="sm:col-span-9 text-neutral-700">
                      Graphic Design, Social Media Design, Branding & Visual Identity, Typography, Layout Design, UI/UX Design, Marketing Creatives
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                    <span className="sm:col-span-3 font-bold text-neutral-900">Marketing</span>
                    <span className="sm:col-span-9 text-neutral-700">
                      Social Media Marketing, Meta Ads, Content Strategy, Content Calendar Planning, Campaign Planning, Brand Communication, Social Media Analytics, Google Business Profile
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                    <span className="sm:col-span-3 font-bold text-neutral-900">Video</span>
                    <span className="sm:col-span-9 text-neutral-700">
                      Reels & Short-form Editing, Video Shoot & Photography, Storyboarding
                    </span>
                  </div>
                </div>
              </div>

              {/* Strengths */}
              <div>
                <span className="inline-block px-3 py-1 bg-[#D1FF52] text-black font-display font-bold text-xs tracking-wider uppercase rounded mb-3">
                  STRENGTHS
                </span>
                <p className="text-xs text-neutral-800 leading-relaxed font-medium">
                  Creative and detail-oriented • Quick learner of new tools • Good sense of colour and layout • Team player
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
