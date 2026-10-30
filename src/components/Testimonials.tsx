import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  image?: string;
  isLogoAvatar?: boolean;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'just-wings',
    name: 'JUST WINGS',
    role: 'Australia',
    isLogoAvatar: true,
    quote: "Nilesh crafted a stunning brand design for Just Wings, perfectly capturing our brand's essence, enhancing user experience, and significantly boosting our online orders and visibility."
  },
  {
    id: 'bhavya-taneja',
    name: 'BHAVYA TANEJA',
    role: 'Grafix Mistri Studio',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    quote: "I wanted a vibrant, functional brand design for Grafix Mistri Studio, and Nilesh nailed it! The visual assets are sleek, creative, reflects our design ethos, and showcases our creative expertise. I couldn't be happier with the results!"
  },
  {
    id: 'rajeev-mehta',
    name: 'RAJEEV MEHTA',
    role: 'YouTuber',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    quote: "Nilesh created fantastic creative thumbnails and brand assets for my YouTube channel & courses, making it easier for my audience to engage. It's fast, responsive, and perfectly aligned with my personal brand!"
  }
];

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const parsed = data.map((item: any, idx: number) => {
            const titleStr = item.title || item.name || '';
            const separators = [' – ', ' — ', ' - ', ' | '];
            let name = titleStr;
            let role = '';
            for (const sep of separators) {
              if (titleStr.includes(sep)) {
                const parts = titleStr.split(sep);
                name = parts[0].trim();
                role = parts[1].trim();
                break;
              }
            }
            return {
              id: item.id || `t-${idx}`,
              name: name || DEFAULT_TESTIMONIALS[idx % DEFAULT_TESTIMONIALS.length].name,
              role: role || item.role || DEFAULT_TESTIMONIALS[idx % DEFAULT_TESTIMONIALS.length].role,
              quote: item.description || item.quote || DEFAULT_TESTIMONIALS[idx % DEFAULT_TESTIMONIALS.length].quote,
              image: item.image || DEFAULT_TESTIMONIALS[idx % DEFAULT_TESTIMONIALS.length].image,
              isLogoAvatar: Boolean(item.isLogoAvatar || (idx === 0 && !item.image))
            };
          });
          setTestimonials(parsed);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="mt-28 sm:mt-32 relative scroll-mt-24 select-none" id="testimonials">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/[0.02] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#D1FF52]/[0.02] blur-[150px] rounded-full pointer-events-none" />

      {/* Centered Heading Matching Screenshot: ● CLIENT STORIES */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16"
      >
        <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#D1FF52] inline-block shrink-0 shadow-[0_0_14px_#D1FF52]" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white">
          CLIENT STORIES
        </h2>
      </motion.div>

      {/* 3-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
        {testimonials.slice(0, 3).map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.12, ease: 'easeOut' }}
            className="rounded-[2.2rem] bg-[#12141a]/95 hover:bg-[#161922] border border-neutral-800/80 hover:border-neutral-700 p-8 sm:p-10 flex flex-col items-center text-center shadow-2xl transition-all duration-300 hover:-translate-y-1.5 group relative overflow-hidden"
          >
            {/* Top Avatar Circle */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-neutral-900 border-2 border-neutral-800/90 group-hover:border-neutral-700 flex items-center justify-center mb-6 shrink-0 shadow-xl group-hover:scale-105 transition-transform duration-300">
              {item.isLogoAvatar ? (
                <div className="w-full h-full bg-[#0E1015] flex flex-col items-center justify-center p-3 select-none">
                  <span className="text-white font-black text-xl sm:text-2xl tracking-tight leading-none">
                    JUST
                  </span>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-[#FF5722] font-black text-lg sm:text-xl tracking-widest leading-none">
                      WINGS
                    </span>
                    <span className="text-[#FF5722] font-black text-lg sm:text-xl tracking-tighter leading-none">
                      =
                    </span>
                  </div>
                </div>
              ) : item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-amber-500/20 to-neutral-800 flex items-center justify-center text-white font-bold text-2xl uppercase">
                  {item.name.substring(0, 2)}
                </div>
              )}
            </div>

            {/* Client Name with font-display (Unbounded) in Warm Golden */}
            <h3 className="text-[#E8AA38] font-display font-bold text-lg sm:text-xl uppercase tracking-wider mb-1.5">
              {item.name}
            </h3>

            {/* Role / Subtitle with font-sans (Poppins) */}
            <p className="text-neutral-300 font-sans font-medium text-sm sm:text-base mb-6">
              {item.role}
            </p>

            {/* Feedback Quote with font-sans (Poppins) */}
            <p className="text-neutral-400 group-hover:text-neutral-300 font-sans text-xs sm:text-sm leading-relaxed transition-colors">
              {item.quote}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
