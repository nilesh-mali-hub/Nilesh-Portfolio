import React from 'react';
import { BentoCard } from './BentoCard';
import { motion } from 'motion/react';

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
            alt={name}
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
      <p className="text-[10px] font-mono font-bold tracking-[0.22em] text-neutral-500 uppercase mt-6 sm:mt-8">
        {location}
      </p>
    </BentoCard>
  );
}

export interface ExperienceGaugeCardProps {
  years?: string;
  label?: string;
  className?: string;
  staggered?: boolean;
}

export function ExperienceGaugeCard({
  years = '4+',
  label = '/YEARS EXP.',
  className = '',
  staggered = true,
}: ExperienceGaugeCardProps) {
  return (
    <BentoCard className={`p-7 sm:p-8 flex flex-col justify-between flex-1 ${className}`} staggered={staggered}>
      {/* Top Label */}
      <p className="text-[10px] font-mono font-bold text-neutral-500 tracking-[0.22em] uppercase">
        {label}
      </p>

      {/* Center Gauge Graphic */}
      <div className="relative w-36 h-36 mx-auto flex items-center justify-center my-4 sm:my-6">
        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          {/* Background track circle */}
          <circle
            cx="60"
            cy="60"
            r="48"
            stroke="#1a1a1a"
            strokeWidth="16"
            fill="none"
          />
          {/* Vibrant Neon Green Active Arc */}
          <motion.circle
            cx="60"
            cy="60"
            r="48"
            stroke="#D1FF52"
            strokeWidth="16"
            fill="none"
            strokeDasharray="301.6"
            initial={{ strokeDashoffset: 301.6 }}
            whileInView={{ strokeDashoffset: 135 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            strokeLinecap="round"
          />
        </svg>

        {/* 4+ Big Display Number */}
        <span className="font-display font-black text-5xl sm:text-6xl text-white relative z-10 tracking-tighter ml-2 select-none">
          {years}
        </span>
      </div>

      {/* Invisible bottom spacer to balance padding */}
      <div className="h-2" />
    </BentoCard>
  );
}
