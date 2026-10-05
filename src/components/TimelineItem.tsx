import { motion } from 'motion/react';

export interface TimelineItemProps {
  year: string;
  title: string;
  description?: string;
  subtitle?: string;
  highlight?: boolean;
  highlightColor?: 'lime' | 'cyan' | string;
  delay?: number;
}

export function TimelineItem({
  year,
  title,
  description,
  subtitle,
  highlight = false,
  highlightColor = 'lime',
  delay = 0,
}: TimelineItemProps) {
  const desc = description || subtitle;
  const isCyan = highlightColor === 'cyan';

  // Left vertical accent indicator line
  const accentBorderClass = highlight
    ? (isCyan ? 'border-l-2 border-[#38bdf8]' : 'border-l-2 border-[#D1FF52]')
    : 'border-l-2 border-neutral-800/90';

  // Year text styling
  const yearColorClass = highlight
    ? (isCyan ? 'text-[#38bdf8]' : 'text-[#D1FF52]')
    : 'text-neutral-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`pl-4 sm:pl-5 ${accentBorderClass} transition-colors duration-200 group`}
    >
      {/* Year */}
      <p className={`font-mono text-xs font-bold tracking-wider uppercase ${yearColorClass}`}>
        {year}
      </p>

      {/* Role / Degree Title */}
      <h4 className="font-display font-bold text-xl sm:text-[22px] text-white tracking-tight mt-1 leading-snug">
        {title}
      </h4>

      {/* Company / Institution & Description */}
      {desc && (
        <p className="text-neutral-400 font-sans text-xs sm:text-sm mt-1.5 leading-relaxed font-normal">
          {desc}
        </p>
      )}
    </motion.div>
  );
}
