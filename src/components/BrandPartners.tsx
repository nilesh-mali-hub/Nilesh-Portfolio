import { useState } from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from './SectionHeading';

interface BrandItem {
  id: string;
  name: string;
  badgeBg: string;
  logoSrc?: string;
  icon?: React.ReactNode;
}

const BRANDS: BrandItem[] = [
  {
    id: 'redes-creation',
    name: 'REDES CREATION',
    badgeBg: 'bg-white border border-neutral-200/60',
    logoSrc: '/assets/aistudio/image_3de4bc1f.png'
  },
  {
    id: 'brahmos-logistics',
    name: 'BRAHMOS LOGISTICS',
    badgeBg: 'bg-white border border-neutral-200/60',
    logoSrc: '/assets/aistudio/image_acce1a2d.png'
  },
  {
    id: 'govt-rajasthan',
    name: 'GOVT. OF RAJASTHAN',
    badgeBg: 'bg-white border border-neutral-200/60',
    logoSrc: '/assets/aistudio/image_64dbfd53.png'
  },
  {
    id: 'st-pauls',
    name: "ST. PAUL'S SCHOOL",
    badgeBg: 'bg-white border border-neutral-200/60',
    logoSrc: '/assets/aistudio/image_9c1adc74.png'
  },
  {
    id: 'soni-somalal',
    name: 'SONI SOMALAL & SONS',
    badgeBg: 'bg-white border border-neutral-200/60',
    logoSrc: '/assets/aistudio/image_4b3662d9.png'
  },
  {
    id: 'paraag-developers',
    name: 'PARAAG DEVELOPERS',
    badgeBg: 'bg-[#0E1015] border border-neutral-700/80',
    logoSrc: '/assets/aistudio/3_-_3_eefa29be.png'
  },
  {
    id: 'just-wings',
    name: 'JUST WINGS',
    badgeBg: 'bg-[#0E1015] border border-neutral-800',
    icon: (
      <div className="flex items-center gap-1.5 select-none px-1">
        <span className="text-white font-black text-sm sm:text-base tracking-tight">JUST</span>
        <span className="text-[#FF5722] font-black text-sm sm:text-base tracking-widest">WINGS</span>
        <span className="text-[#FF5722] text-xs font-bold">=</span>
      </div>
    )
  },
  {
    id: 'sol-resorts',
    name: 'THE SOL RESORTS',
    badgeBg: 'bg-[#183935] border border-teal-800/80',
    icon: (
      <div className="flex items-center gap-2 select-none px-1">
        <svg className="w-5 h-5 fill-current text-[#E3D4B6]" viewBox="0 0 24 24">
          <path d="M12 3L4 9v12h16V9l-8-6zm0 3.25l5 3.75v9H7v-9l5-3.75zM12 11a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"/>
        </svg>
        <span className="text-[#E3D4B6] font-display font-bold text-xs tracking-wider">SOL RESORTS</span>
      </div>
    )
  },
  {
    id: 'supps-spot',
    name: 'SUPPS SPOT',
    badgeBg: 'bg-neutral-900 border border-amber-500/40',
    icon: (
      <div className="flex items-center gap-2 select-none px-1">
        <svg className="w-5 h-5 fill-current text-amber-400" viewBox="0 0 24 24">
          <path d="M12 2l2.5 5.5L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 2zm0 8c-2.21 0-4 1.79-4 4 0 1.5.82 2.8 2.05 3.5.3-.2.62-.35.95-.45v-1.1c-.6-.2-1-.7-1-1.35 0-.75.65-1.4 1.4-1.4s1.4.65 1.4 1.4c0 .65-.4 1.15-1 1.35v1.1c.33.1.65.25.95.45 1.23-.7 2.05-2 2.05-3.5 0-2.21-1.79-4-4-4z"/>
        </svg>
        <span className="text-amber-400 font-display font-bold text-xs tracking-wider">SUPPS SPOT</span>
      </div>
    )
  },
  {
    id: 'shine-homes',
    name: 'SHINE HOMES',
    badgeBg: 'bg-white border border-neutral-200/60',
    icon: (
      <div className="flex items-center gap-1.5 select-none px-1">
        <svg className="w-5 h-5 fill-current text-[#5B2E91]" viewBox="0 0 24 24">
          <path d="M12 2l2.4 6.6L21 11l-5.6 4.4 1.8 7.1L12 18.5 6.8 22.5l1.8-7.1L3 11l6.6-2.4L12 2zm0 4.2l-1.3 3.6-3.7 1.3 3.1 2.4-1 3.9 2.9-2.2 2.9 2.2-1-3.9 3.1-2.4-3.7-1.3L12 6.2z"/>
        </svg>
        <span className="text-[#5B2E91] font-display font-bold text-xs tracking-wider">SHINE HOMES</span>
      </div>
    )
  }
];

export function BrandPartners() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate for seamless 0 to -50% infinite translation
  const fullList = [...BRANDS, ...BRANDS];

  return (
    <section className="mt-28 sm:mt-32 relative overflow-hidden select-none" id="brands">
      {/* Centered Heading with standard SectionHeading matching all sections */}
      <SectionHeading delay={0.1}>
        <span className="flex items-baseline gap-2">
          <span>Brands Partnered</span>
          <span className="italic font-serif font-normal text-[#E8AA38] lowercase tracking-normal text-2xl sm:text-3xl md:text-4xl -translate-y-0.5">
            with
          </span>
        </span>
      </SectionHeading>

      {/* Marquee Container with edge fades */}
      <div 
        className="relative w-full overflow-hidden py-4 mt-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left & Right gradient shadows for smooth edge fading */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-neutral-950 via-neutral-950/80 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Pills Track - Box automatically sizes to fit logo dimensions */}
        <motion.div
          className="flex items-center gap-4 sm:gap-6 w-max"
          animate={{
            x: isPaused ? undefined : ['0%', '-50%']
          }}
          transition={{
            repeat: Infinity,
            duration: 55,
            ease: 'linear'
          }}
        >
          {fullList.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              title={brand.name}
              className={`h-14 sm:h-16 px-5 sm:px-7 rounded-2xl ${brand.badgeBg} flex items-center justify-center shrink-0 shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer`}
            >
              {brand.logoSrc ? (
                <img
                  src={brand.logoSrc}
                  alt={brand.name}
                  className="h-8 sm:h-10 w-auto max-w-none object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  {brand.icon}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
