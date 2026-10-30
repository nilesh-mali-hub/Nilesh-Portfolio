import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle, MessageCircle, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { Link } from 'react-router-dom';

interface FAQItem {
  id: string;
  category: 'process' | 'timelines' | 'deliverables' | 'pricing';
  question: string;
  answer: string;
  highlights?: string[];
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'process',
    question: 'What is your creative design process from start to finish?',
    answer: 'Every project follows a structured 4-step creative methodology to guarantee exceptional results with zero guesswork:',
    highlights: [
      '1. Discovery & Strategy: We discuss your brand vision, target audience, aesthetic preferences, and competitive landscape.',
      '2. Concept Development: I create 2–3 distinct visual directions and interactive moodboards for your review.',
      '3. Iterative Refinement: Based on your selected direction, we fine-tune typography, color palettes, and layouts through structured revision rounds.',
      '4. Delivery & Handoff: Production-ready vector source files, style guides, and digital assets are packaged and delivered.'
    ]
  },
  {
    id: 'faq-2',
    category: 'timelines',
    question: 'How long does a typical design project take to complete?',
    answer: 'Turnaround time depends on the complexity and scope of the deliverables. Below are typical turnaround benchmarks:',
    highlights: [
      '• Brand Identity Systems & Logo Packages: 7 to 14 business days',
      '• Social Media Creative Packs (10–20 posts): 3 to 5 business days',
      '• Website UI/UX Design & Landing Pages: 10 to 18 business days',
      '• Video Editing & Reels / Shorts: 24 to 48 hours per video',
      '• Print Collateral (Brochures, Packaging, Menus): 4 to 7 business days',
      '⚡ Express priority turnaround is also available for urgent project deadlines upon request.'
    ]
  },
  {
    id: 'faq-3',
    category: 'deliverables',
    question: 'What file formats and assets will I receive when the project is done?',
    answer: 'You will receive full commercial ownership and a comprehensive, cleanly structured digital folder with industry-standard file types:',
    highlights: [
      '• Vector Source Files: Adobe Illustrator (.AI), Editable Vector (.EPS), Scalable Vector (.SVG)',
      '• Print-Ready Assets: High-resolution CMYK PDFs with bleed and crop marks for professional offset/digital printing',
      '• Digital & Web Assets: Transparent PNGs, lightweight WebP, and ultra-crisp JPGs optimized for retina screens',
      '• UI/UX Projects: Organized Figma files with design tokens, component variants, and interactive prototypes',
      '• Brand Guide Sheet: Color hex codes, CMYK/RGB values, and typography usage guidelines'
    ]
  },
  {
    id: 'faq-4',
    category: 'process',
    question: 'How do revisions and feedback work during a project?',
    answer: 'Clear, collaborative communication is central to how I work. Each project package includes 2 to 3 comprehensive revision rounds during the concept and refinement stages. You can share feedback seamlessly via WhatsApp voice notes, email bullets, or by clicking directly on designs inside Figma. Revisions are typically turned around within 24 to 48 hours.',
  },
  {
    id: 'faq-5',
    category: 'pricing',
    question: 'How do payments, milestones, and project onboarding work?',
    answer: 'To ensure a smooth workflow and secure commitment from both sides, projects are booked with a 50% advance deposit to schedule your design sprint and initiate research. The remaining 50% is settled upon final design approval before the release of editable source files. Payments are accepted via UPI (Google Pay, PhonePe, Paytm), Bank Transfer (NEFT/IMPS), or International wire transfer.',
  },
  {
    id: 'faq-6',
    category: 'timelines',
    question: 'Do you offer ongoing monthly retainer support for brands and creators?',
    answer: 'Yes! For growing businesses, agencies, and content creators needing steady, recurring design deliverables, I offer dedicated monthly retainers. This includes priority queue scheduling, consistent brand guardianship, and fast 24–48 hour turnarounds for daily social creatives, YouTube thumbnails, ad graphics, and marketing assets.',
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'process', label: 'Design Process' },
  { id: 'timelines', label: 'Project Timelines' },
  { id: 'deliverables', label: 'Files & Assets' },
  { id: 'pricing', label: 'Payments & Retainers' },
];

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const filteredFaqs = activeCategory === 'all'
    ? FAQ_DATA
    : FAQ_DATA.filter(item => item.category === activeCategory);

  const toggleFAQ = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const whatsappUrl = "https://api.whatsapp.com/send/?phone=916378954363&text=Hi+Nilesh%2C+I+have+a+question+about+a+design+project%21";

  return (
    <section className="mt-28 sm:mt-32 relative scroll-mt-24 select-none" id="faq">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#D1FF52]/[0.025] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 translate-y-1/2 w-96 h-96 bg-cyan-500/[0.02] blur-[150px] rounded-full pointer-events-none" />

      {/* Centered Section Heading */}
      <SectionHeading delay={0.1}>Design FAQ</SectionHeading>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Subtitle */}
        <p className="text-neutral-400 text-center font-sans text-xs sm:text-sm max-w-xl mx-auto -mt-4 mb-8 sm:mb-10 leading-relaxed">
          Everything you need to know about starting a project, collaborating with Nilesh, turnaround times, and file deliverables.
        </p>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-sans font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#D1FF52] text-black font-semibold shadow-[0_0_15px_rgba(209,255,82,0.3)] scale-105'
                    : 'bg-neutral-900/60 hover:bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-neutral-900/80 border-[#D1FF52]/40 shadow-xl shadow-[#D1FF52]/5'
                    : 'bg-neutral-900/30 hover:bg-neutral-900/60 border-neutral-800/80 hover:border-neutral-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-[#D1FF52] text-black font-bold' : 'bg-neutral-800/80 text-neutral-400 group-hover:text-white'
                    }`}>
                      {faq.category === 'timelines' ? (
                        <Clock className="w-4 h-4" />
                      ) : faq.category === 'process' ? (
                        <Sparkles className="w-4 h-4" />
                      ) : (
                        <HelpCircle className="w-4 h-4" />
                      )}
                    </span>
                    <span className={`font-display font-bold text-sm sm:text-base leading-snug transition-colors ${
                      isOpen ? 'text-white' : 'text-neutral-200 group-hover:text-[#D1FF52]'
                    }`}>
                      {faq.question}
                    </span>
                  </div>

                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen
                      ? 'border-[#D1FF52] bg-[#D1FF52]/10 text-[#D1FF52] rotate-180'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-400 group-hover:text-white group-hover:border-neutral-700'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-neutral-300 font-sans text-xs sm:text-sm leading-relaxed border-t border-neutral-800/50 mt-1">
                        <p className="text-neutral-300 mb-3">{faq.answer}</p>
                        {faq.highlights && faq.highlights.length > 0 && (
                          <ul className="space-y-2 mt-3 bg-black/40 rounded-xl p-4 border border-neutral-800/60 font-sans text-xs sm:text-[13px] text-neutral-300">
                            {faq.highlights.map((point, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2 text-neutral-300">
                                <span className="text-[#D1FF52] mt-0.5 shrink-0">✔</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Direct Inquiry Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-neutral-900/80 via-neutral-900/50 to-neutral-900/80 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="text-white font-display font-bold text-base sm:text-lg mb-1">
              Have a custom project requirement?
            </h4>
            <p className="text-neutral-400 font-sans text-xs sm:text-sm">
              Reach out directly on WhatsApp or submit a fast inquiry to discuss scope, timeline, and custom quotation.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#D1FF52] hover:bg-[#bceb42] text-black font-bold text-xs sm:text-sm px-5 py-3 rounded-full transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs sm:text-sm px-4 py-3 rounded-full border border-neutral-700 transition-colors"
            >
              <span>Contact Form</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
