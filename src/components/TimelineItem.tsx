import { motion } from 'motion/react';

interface TimelineItemProps {
  year: string;
  title: string;
  subtitle: string;
  delay?: number;
}

export function TimelineItem({ year, title, subtitle, delay = 0 }: TimelineItemProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col sm:flex-row gap-2 sm:gap-6 group"
    >
      <div className="sm:w-24 flex-shrink-0 font-display font-bold text-[#D1FF52] pt-1 leading-tight text-lg tracking-tighter uppercase">
        {year.split('-').map((part, i) => (
          <span key={i}>
            {part}
            {i === 0 && <span className="hidden sm:inline">-</span>}
            {i === 0 && <br className="hidden sm:block" />}
          </span>
        ))}
      </div>
      <div>
        <h4 className="font-display font-bold text-xl text-white group-hover:text-[#D1FF52] transition-colors uppercase tracking-tight">{title}</h4>
        <p className="text-[10px] uppercase tracking-widest text-neutral-400 mt-2">{subtitle}</p>
      </div>
    </motion.div>
  );
}
