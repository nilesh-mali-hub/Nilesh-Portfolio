import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BentoCard } from './BentoCard';
import { motion, AnimatePresence } from 'motion/react';

export interface NileshIntroCardProps {
  name?: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  className?: string;
  staggered?: boolean;
}

export function NileshIntroCard({
  name = 'Nilesh Mali',
  avatarUrl = 'https://res.cloudinary.com/dfknctbhw/image/upload/v1784198733/nm-logo_achjmg.png',
  bio = 'Creative designer & developer crafting digital experiences that blend aesthetics with functionality.',
  location = 'AVAILABLE GLOBALLY',
  className = '',
  staggered = true,
}: NileshIntroCardProps) {
  const [firstName, ...rest] = name.split(' ');
  const lastName = rest.join(' ') || 'MALI';

  return (
    <BentoCard className={`p-7 sm:p-8 flex flex-col justify-between ${className}`} staggered={staggered}>
      <div>
        {/* Top Avatar Logo Badge */}
        <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-800 bg-black shadow-md flex items-center justify-center shrink-0">
          <img
            src={avatarUrl}
            alt="Nilesh Mali brand identity monogram and creative designer logo"
            title="Nilesh Mali — Graphic Designer & Creative Developer"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Graceful fallback to styled monogram badge
              const target = e.target as HTMLElement;
              target.style.display = 'none';
            }}
          />
        </div>

        {/* Big Bold Two-Line Display Typography */}
        <h2 className="font-display font-black text-3xl sm:text-[34px] md:text-4xl text-white uppercase tracking-tight leading-[0.95] mt-5 sm:mt-6">
          {firstName}
          <br />
          {lastName}
        </h2>

        {/* Bio Description */}
        <p className="text-neutral-400 font-sans text-[13px] sm:text-sm leading-relaxed mt-4">
          {bio}
        </p>
      </div>

      {/* Meta Footer */}
      <div className="flex items-center justify-between mt-6 sm:mt-8 pt-4 border-t border-neutral-800/60">
        <p className="text-[10px] font-mono font-bold tracking-[0.22em] text-neutral-500 uppercase">
          {location}
        </p>
        <Link
          to="/resume"
          className="inline-flex items-center gap-1 text-[10px] font-mono font-bold tracking-wider text-[#D1FF52] hover:text-white uppercase transition-colors"
        >
          <span>Resume</span>
          <span>↗</span>
        </Link>
      </div>
    </BentoCard>
  );
}

export const GAUGE_LOOP_ITEMS = [
  'Social Media Design',
  'Thumbnail Design',
  'Poster Design',
  'Video Editing',
  'Creative Experiments',
  'Website Ui',
  'Brochure'
];

export interface ExperienceGaugeCardProps {
  years?: string;
  label?: string;
  className?: string;
  staggered?: boolean;
  loopItems?: string[];
}

export function ExperienceGaugeCard({
  years = '1.5',
  label = '/YEARS EXP.',
  className = '',
  staggered = true,
  loopItems = GAUGE_LOOP_ITEMS,
}: ExperienceGaugeCardProps) {
  // 3.5-second cycle right-to-left rotating item
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  useEffect(() => {
    if (!loopItems || loopItems.length === 0) return;
    const interval = setInterval(() => {
      setActiveItemIndex((prev) => (prev + 1) % loopItems.length);
    }, 3000); // Exactly 3-second loop cycle
    return () => clearInterval(interval);
  }, [loopItems]);

  const currentItem = loopItems[activeItemIndex] || loopItems[0];
  const tickerItems = [...loopItems, ...loopItems];

  return (
    <BentoCard className={`p-6 sm:p-7 flex flex-col justify-between flex-1 relative overflow-hidden ${className}`} staggered={staggered}>
      {/* Top Header & 3-sec Right-to-Left Dynamic Loop Badge */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D1FF52] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D1FF52]"></span>
          </span>
          <p className="text-[10px] font-mono font-bold text-neutral-400 tracking-[0.2em] uppercase">
            {label}
          </p>
        </div>

        {/* 3-sec right-to-left smooth sliding pill */}
        <div className="relative overflow-hidden h-6 max-w-[150px] sm:max-w-[170px] flex items-center justify-end">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeItemIndex}
              initial={{ x: 28, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -28, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-800/80 border border-neutral-700/60 text-[10px] font-mono text-[#D1FF52] font-semibold truncate whitespace-nowrap"
            >
              <span className="text-[9px]">✳</span>
              <span className="truncate">{currentItem}</span>
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Center Gauge Graphic */}
      <div className="relative w-32 h-32 sm:w-36 sm:h-36 mx-auto flex items-center justify-center my-3 sm:my-4">
        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          {/* Background track circle */}
          <circle
            cx="60"
            cy="60"
            r="48"
            stroke="#1a1a1a"
            strokeWidth="15"
            fill="none"
          />
          {/* Vibrant Dynamic Accent Active Arc calibrated for 1.5 years */}
          <motion.circle
            cx="60"
            cy="60"
            r="48"
            stroke="var(--accent-color)"
            strokeWidth="15"
            fill="none"
            strokeDasharray="301.6"
            initial={{ strokeDashoffset: 301.6 }}
            whileInView={{ strokeDashoffset: 185 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            strokeLinecap="round"
          />
        </svg>

        {/* 1.5 Big Display Number */}
        <div className="flex flex-col items-center justify-center relative z-10 select-none">
          <span className="font-display font-black text-4xl sm:text-5xl text-white tracking-tighter">
            {years}
          </span>
          <span className="text-[9px] font-mono font-bold tracking-widest text-neutral-400 uppercase -mt-1">
            YEARS
          </span>
        </div>
      </div>

      {/* Continuous Right-to-Left Ticker Strip inside the Card */}
      <div className="w-full relative mt-2 pt-2.5 border-t border-neutral-800/60 overflow-hidden">
        {/* Soft edge blur masks */}
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-neutral-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-neutral-900 to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden whitespace-nowrap">
          <motion.div
            className="flex items-center gap-3 min-w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 35,
            }}
          >
            {tickerItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-neutral-300 uppercase tracking-tight">
                  {item}
                </span>
                <span className="text-[#D1FF52] text-[10px] font-bold">
                  ✳
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </BentoCard>
  );
}

