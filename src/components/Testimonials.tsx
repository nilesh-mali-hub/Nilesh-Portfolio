import { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { Quote, Star, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

interface Testimonial {
  id: string;
  title: string; // Name & Designation
  description: string; // Review feedback text
  image?: string; // Avatar URL
}

// Fallback items in case API is empty or offline
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
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.9,
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function Testimonials() {
  const [list, setList] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

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

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = list.length - 1;
      if (nextIndex >= list.length) nextIndex = 0;
      return nextIndex;
    });
  };

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

  const activeTestimonial = list[currentIndex];
  const { name, role } = activeTestimonial ? parseClientTitle(activeTestimonial.title) : { name: '', role: '' };

  return (
    <div className="mt-28 relative" id="testimonials">
      {/* Background Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-[#D1FF52] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-purple-500 opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <SectionHeading delay={0.1}>Client Stories</SectionHeading>
          <p className="text-neutral-400 text-xs sm:text-sm font-sans mt-3 max-w-xl text-left md:text-left">
            Hear from partners and clients who have collaborated on brand identities, creative graphics, and digital products.
          </p>
        </div>
        
        {/* Navigation Controls (Desktop) */}
        {!loading && list.length > 1 && (
          <div className="hidden md:flex gap-3">
            <button 
              onClick={() => paginate(-1)} 
              className="w-10 h-10 rounded-full bg-neutral-900/50 border border-white/10 flex items-center justify-center hover:bg-[#D1FF52] hover:text-black hover:border-[#D1FF52] transition-colors backdrop-blur-md"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => paginate(1)} 
              className="w-10 h-10 rounded-full bg-neutral-900/50 border border-white/10 flex items-center justify-center hover:bg-[#D1FF52] hover:text-black hover:border-[#D1FF52] transition-colors backdrop-blur-md"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="w-8 h-8 border-4 border-neutral-800 border-t-[#D1FF52] rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="relative w-full max-w-4xl mx-auto h-[350px] sm:h-[300px] flex items-center justify-center overflow-x-hidden md:overflow-visible">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full px-2 sm:px-0 cursor-grab active:cursor-grabbing"
            >
              <div className="relative bg-neutral-900/30 border border-white/10 backdrop-blur-xl rounded-[2.2rem] p-8 sm:p-12 flex flex-col justify-between overflow-hidden shadow-2xl group w-full h-full max-w-3xl mx-auto">
                {/* Visual Glassmorphic Shine Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-white/[0.03] pointer-events-none"></div>
                
                {/* Decorative Quote Icon */}
                <div className="absolute top-8 right-10 text-white/[0.04] group-hover:text-[#D1FF52]/[0.06] transition-colors duration-500 pointer-events-none">
                  <Quote className="w-24 h-24 rotate-180 transform" />
                </div>

                <div className="relative z-10">
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#D1FF52] text-[#D1FF52] filter drop-shadow-[0_0_4px_rgba(209,255,82,0.4)]" />
                    ))}
                  </div>

                  {/* Feedback Quote text */}
                  <p className="text-neutral-200 text-sm sm:text-base leading-relaxed mb-8 italic relative z-10 font-sans">
                    "{activeTestimonial.description}"
                  </p>
                </div>

                {/* Client Profile Section */}
                <div className="flex items-center gap-4 border-t border-white/5 pt-6 mt-auto relative z-10">
                  {/* Glassmorphic Avatar Frame */}
                  <div className="w-14 h-14 rounded-full border border-white/20 p-[2px] bg-white/5 flex-shrink-0 relative overflow-hidden group-hover:border-[#D1FF52]/40 transition-colors">
                    {activeTestimonial.image ? (
                      <img 
                        src={activeTestimonial.image} 
                        alt={name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-full filter grayscale hover:grayscale-0 transition-all duration-500" 
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-800 rounded-full flex items-center justify-center text-neutral-400">
                        <User className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  {/* Client Typography Pair */}
                  <div className="flex flex-col min-w-0">
                    <span className="font-display font-bold text-base text-white tracking-tight truncate uppercase">
                      {name}
                    </span>
                    {role && (
                      <span className="text-xs text-neutral-400 font-mono tracking-wider truncate uppercase mt-0.5">
                        {role}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Pagination Dots (Mobile / General) */}
      {!loading && list.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {list.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'bg-[#D1FF52] w-8' : 'bg-white/20 w-2 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
