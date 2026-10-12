import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { Quote, Star, User, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

interface Testimonial {
  id: string;
  title: string; // Name & Designation
  description: string; // Review feedback text
  image?: string; // Avatar URL
}

// High-fidelity fallback items in case API is empty or offline
const fallbackTestimonials: Testimonial[] = [
  {
    id: "f1",
    title: "Sarah Jenkins – Creative Director, Loom Studio",
    description: "Nilesh transformed our brand identity with absolute precision. His attention to detail, visual storytelling, and strategic thinking exceeded our highest expectations. He didn't just design a logo; he built a complete, highly versatile visual system.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "f2",
    title: "Rohan Mehta – Founder, TechLoom Co.",
    description: "An exceptional developer and visual designer who perfectly bridges aesthetics with performance. The custom website UI Nilesh designed is clean, immersive, and incredibly fast. Our lead generation has increased by 40% since the launch.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "f3",
    title: "Elena Rostova – Marketing Lead, Zenith Digital",
    description: "Nilesh is a creative force. He delivers high-converting social media graphics, branding packages, and marketing assets that make our campaigns stand out. Extremely professional, collaborative, and full of fresh design strategies.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
  }
];

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    scale: 0.98,
  })
};

export function Testimonials() {
  const [list, setList] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setList(data);
        } else {
          setList(fallbackTestimonials);
        }
      })
      .catch(() => {
        setList(fallbackTestimonials);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = list.length - 1;
      if (nextIndex >= list.length) nextIndex = 0;
      return nextIndex;
    });
  }, [list.length]);

  // Optional subtle auto-advance (pauses when hovering)
  useEffect(() => {
    if (loading || list.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 7000);
    return () => clearInterval(timer);
  }, [loading, list.length, isPaused, paginate]);

  // Helper to split "Name – Position, Company" for typographic hierarchy
  const parseClientTitle = (titleStr: string) => {
    const separators = [' – ', ' — ', ' - ', ' | '];
    for (const sep of separators) {
      if (titleStr.includes(sep)) {
        const parts = titleStr.split(sep);
        return {
          name: parts[0].trim(),
          role: parts[1].trim()
        };
      }
    }
    return { name: titleStr, role: '' };
  };

  const activeTestimonial = list[currentIndex] || fallbackTestimonials[0];
  const { name, role } = activeTestimonial ? parseClientTitle(activeTestimonial.title) : { name: '', role: '' };

  return (
    <section className="mt-28 relative scroll-mt-24" id="testimonials">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-[#D1FF52]/[0.025] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-purple-500/[0.02] blur-[140px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-14">
        <SectionHeading delay={0.1}>Client Stories</SectionHeading>
        <p className="text-neutral-400 text-xs sm:text-sm font-sans mt-2 max-w-xl mx-auto px-4">
          Genuine feedback from founders, creative directors, and brands on design craft and digital delivery.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[340px]">
          <div className="w-8 h-8 border-3 border-neutral-800 border-t-[#D1FF52] rounded-full animate-spin" />
        </div>
      ) : (
        <div 
          className="relative max-w-4xl mx-auto px-4 sm:px-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Desktop Floating Navigation Arrows (Side of Card) */}
          {list.length > 1 && (
            <>
              <button 
                onClick={() => paginate(-1)} 
                className="hidden md:flex absolute -left-5 lg:-left-7 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-neutral-900/90 border border-neutral-800 text-neutral-300 hover:text-black hover:bg-[#D1FF52] hover:border-[#D1FF52] transition-all duration-200 items-center justify-center shadow-2xl backdrop-blur-md cursor-pointer group active:scale-95"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              <button 
                onClick={() => paginate(1)} 
                className="hidden md:flex absolute -right-5 lg:-right-7 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-neutral-900/90 border border-neutral-800 text-neutral-300 hover:text-black hover:bg-[#D1FF52] hover:border-[#D1FF52] transition-all duration-200 items-center justify-center shadow-2xl backdrop-blur-md cursor-pointer group active:scale-95"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </>
          )}

          {/* Testimonial Card Slider */}
          <div className="relative min-h-[320px] sm:min-h-[290px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 350, damping: 32 },
                  opacity: { duration: 0.22 },
                  scale: { duration: 0.22 }
                }}
                className="w-full"
              >
                <div className="relative bg-neutral-900/40 border border-neutral-800/90 hover:border-neutral-700/80 transition-colors duration-300 backdrop-blur-xl rounded-[2rem] p-7 sm:p-10 md:p-12 shadow-2xl overflow-hidden group">
                  {/* Subtle Top-Corner Accent Light */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#D1FF52]/[0.04] rounded-full blur-2xl pointer-events-none" />

                  {/* Top Bar inside Card: Stars + Quote Badge (Separated, Zero Overlap) */}
                  <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="w-4 h-4 sm:w-5 sm:h-5 fill-[#D1FF52] text-[#D1FF52] filter drop-shadow-[0_0_6px_rgba(209,255,82,0.4)]" 
                          />
                        ))}
                      </div>
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#D1FF52]/10 text-[#D1FF52] border border-[#D1FF52]/20">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified Client
                      </span>
                    </div>

                    {/* Dedicated Quote Icon Badge */}
                    <div className="w-11 h-11 rounded-2xl bg-neutral-800/70 border border-neutral-700/70 flex items-center justify-center text-[#D1FF52] shadow-sm shrink-0">
                      <Quote className="w-5 h-5 rotate-180" />
                    </div>
                  </div>

                  {/* Testimonial Quote Text - Clean, spacious, high contrast, zero overlap */}
                  <blockquote className="text-neutral-100 text-base sm:text-lg md:text-xl leading-relaxed my-5 sm:my-7 relative z-10 font-sans font-normal italic">
                    "{activeTestimonial.description}"
                  </blockquote>

                  {/* Client Profile Section */}
                  <div className="flex items-center justify-between border-t border-neutral-800/80 pt-6 mt-6 relative z-10">
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Avatar Frame */}
                      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border-2 border-neutral-800 hover:border-[#D1FF52]/50 p-0.5 bg-neutral-900 shrink-0 relative overflow-hidden transition-colors shadow-md">
                        {activeTestimonial.image ? (
                          <img 
                            src={activeTestimonial.image} 
                            alt={name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-300" 
                          />
                        ) : (
                          <div className="w-full h-full bg-neutral-800 rounded-full flex items-center justify-center text-neutral-400">
                            <User className="w-6 h-6" />
                          </div>
                        )}
                      </div>

                      {/* Name & Designation */}
                      <div className="flex flex-col min-w-0">
                        <h4 className="font-display font-bold text-sm sm:text-base text-white tracking-wide uppercase truncate">
                          {name}
                        </h4>
                        {role && (
                          <p className="text-xs text-neutral-400 font-mono tracking-wider uppercase truncate mt-0.5">
                            {role}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Counter Indicator */}
                    <div className="text-right shrink-0 pl-3">
                      <span className="text-xs font-mono font-bold tracking-wider text-neutral-500">
                        <span className="text-[#D1FF52]">{String(currentIndex + 1).padStart(2, '0')}</span>
                        {" / "}
                        {String(list.length).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Pagination Controls (Dots + Mobile Arrows) */}
          {list.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              {/* Mobile Previous Button */}
              <button 
                onClick={() => paginate(-1)} 
                className="md:hidden w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-black hover:bg-[#D1FF52] hover:border-[#D1FF52] transition-colors active:scale-95"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Progress Indicator Pills */}
              <div className="flex items-center gap-2">
                {list.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    aria-label={`Go to testimonial ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex 
                        ? 'bg-[#D1FF52] w-8 shadow-[0_0_8px_rgba(209,255,82,0.5)]' 
                        : 'bg-neutral-800 hover:bg-neutral-600 w-2'
                    }`}
                  />
                ))}
              </div>

              {/* Mobile Next Button */}
              <button 
                onClick={() => paginate(1)} 
                className="md:hidden w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-black hover:bg-[#D1FF52] hover:border-[#D1FF52] transition-colors active:scale-95"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
