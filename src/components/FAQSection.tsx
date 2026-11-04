import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, MessageCircle, ArrowRight } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { Link } from 'react-router-dom';

interface ShortFAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: ShortFAQItem[] = [
  {
    id: 'faq-1',
    question: 'How long does a typical project take?',
    answer: 'Social & marketing assets take 3–5 days, while full brand identity or UI/UX systems take 7–14 business days. Express delivery is available for urgent deadlines.'
  },
  {
    id: 'faq-2',
    question: 'What is your creative design process?',
    answer: 'A structured 4-step flow: Brief & Discovery → Concept Moodboards → Collaborative Revisions → Production-ready file handoff.'
  },
  {
    id: 'faq-3',
    question: 'What file formats and deliverables do I get?',
    answer: 'Complete commercial ownership with editable vector files (AI, EPS, SVG), print-ready CMYK PDFs, high-res PNG/JPG, and interactive Figma links.'
  },
  {
    id: 'faq-4',
    question: 'How do revisions and payments work?',
    answer: 'Every project includes 2–3 structured revision rounds. Projects start with a 50% deposit, with the remaining 50% due upon final approval before asset release.'
  }
];

export function FAQSection() {
  const [faqs, setFaqs] = useState<ShortFAQItem[]>(FAQS);
  const [openId, setOpenId] = useState<string | null>('faq-1');

  useEffect(() => {
    fetch('/api/faqs')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item: any, idx: number) => ({
            id: item.id || `faq-${idx}`,
            question: item.question || item.title || 'FAQ Question',
            answer: item.answer || item.description || item.content || ''
          }));
          setFaqs(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const toggleFAQ = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const whatsappUrl = "https://api.whatsapp.com/send/?phone=916378954363&text=Hi+Nilesh%2C+I+have+a+quick+question+about+a+design+project%21";

  return (
    <section className="mt-20 sm:mt-24 relative scroll-mt-24 select-none" id="faq">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-[#D1FF52]/[0.02] blur-[140px] rounded-full pointer-events-none" />

      {/* Centered Section Heading */}
      <SectionHeading delay={0.1}>Design FAQ</SectionHeading>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Short Subtitle */}
        <p className="text-neutral-400 text-center font-sans text-xs sm:text-sm max-w-md mx-auto -mt-4 mb-8 leading-relaxed">
          Quick answers on turnaround times, workflow, and deliverables.
        </p>

        {/* Short FAQ Accordion List */}
        <div className="flex flex-col gap-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-neutral-900/80 border-[#D1FF52]/40 shadow-lg shadow-[#D1FF52]/5'
                    : 'bg-neutral-900/40 hover:bg-neutral-900/70 border-neutral-800/80 hover:border-neutral-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full px-4 sm:px-5 py-3.5 sm:py-4 text-left flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <span className={`font-display font-bold text-xs sm:text-sm tracking-tight leading-snug transition-colors ${
                    isOpen ? 'text-white' : 'text-neutral-300 group-hover:text-[#D1FF52]'
                  }`}>
                    {faq.question}
                  </span>

                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 ${
                    isOpen
                      ? 'border-[#D1FF52] bg-[#D1FF52]/10 text-[#D1FF52]'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-400 group-hover:text-white'
                  }`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-4 pt-0 text-neutral-300 font-sans text-xs sm:text-[13px] leading-relaxed border-t border-neutral-800/50 mt-1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Short Bottom WhatsApp/Contact Callout */}
        <div className="mt-8 p-4 sm:p-5 rounded-xl bg-neutral-900/40 border border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-neutral-400 font-sans text-xs">
            Have a custom timeline or requirement?
          </p>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#D1FF52] hover:bg-[#bceb42] text-black font-bold text-xs px-3.5 py-1.5 rounded-full transition-transform hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1 text-neutral-400 hover:text-white font-medium text-xs px-2.5 py-1.5 transition-colors"
            >
              <span>Contact</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
