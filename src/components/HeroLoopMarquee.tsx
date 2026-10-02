import { motion } from 'motion/react';

export const LOOP_ITEMS = [
  'Social Media Design',
  'Thumbnail Design',
  'Poster Design',
  'Video Editing',
  'Creative Experiments',
  'Website Ui',
  'Brochure'
];

interface HeroLoopMarqueeProps {
  years?: string;
  label?: string;
  items?: string[];
  className?: string;
  speedDuration?: number;
}

export function HeroLoopMarquee({
  years = '1.5',
  label = '/YEARS EXP.',
  items = LOOP_ITEMS,
  className = '',
  speedDuration = 40, // Smooth, relaxed continuous speed
}: HeroLoopMarqueeProps) {
  // Repeating list for seamless infinite right-to-left marquee loop
  const loopStream = [...Array(4)].flatMap(() => items);

  return (
    <div className={`w-full my-8 relative overflow-hidden select-none ${className}`}>
      {/* Background glass bar with subtle neon border */}
      <div className="relative rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md p-3 sm:p-4 shadow-xl overflow-hidden flex items-center group">
        
        {/* Left pinned highlight badge: 1.5 /YEARS EXP. */}
        <div className="hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-xl bg-black/80 border border-[#D1FF52]/30 shadow-md shrink-0 mr-3 z-20">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D1FF52] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D1FF52]"></span>
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-display font-black text-base text-white tracking-tight">{years}</span>
            <span className="font-mono text-[10px] font-bold tracking-wider text-[#D1FF52] uppercase">{label}</span>
          </div>
        </div>

        {/* Gradient fade edge masks for smooth appearance */}
        <div className="absolute left-0 sm:left-48 top-0 bottom-0 w-12 bg-gradient-to-r from-neutral-950 via-neutral-950/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-neutral-950 via-neutral-950/60 to-transparent z-10 pointer-events-none" />

        {/* Continuous Right-to-Left Infinite Loop */}
        <div className="flex overflow-hidden whitespace-nowrap w-full">
          <motion.div
            className="flex items-center gap-6 sm:gap-8 min-w-max pr-6 sm:pr-8"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: speedDuration,
            }}
          >
            {loopStream.map((item, idx) => (
              <div key={idx} className="flex items-center gap-6 sm:gap-8">
                {/* Mobile inline badge on every cycle */}
                {idx % items.length === 0 && (
                  <span className="sm:hidden inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black border border-[#D1FF52]/40 text-white font-mono text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D1FF52]" />
                    {years} {label}
                  </span>
                )}
                
                <span className="font-display font-bold text-sm sm:text-base lg:text-lg text-neutral-200 uppercase tracking-wider hover:text-white transition-colors">
                  {item}
                </span>

                <span className="text-[#D1FF52] text-sm sm:text-base font-bold select-none drop-shadow-[0_0_8px_rgba(209,255,82,0.6)]">
                  ✳
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
