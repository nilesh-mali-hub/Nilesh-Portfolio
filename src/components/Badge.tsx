import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface BadgeProps {
  children: ReactNode;
  icon?: ReactNode;
  colorClass: string;
  delay?: number;
}

export function Badge({ children, icon, colorClass, delay = 0 }: BadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className={`flex flex-col items-center justify-center p-3 rounded-[1.5rem] w-[90px] h-[90px] text-center gap-2 bg-neutral-900 border border-neutral-800 text-white hover:border-[#D1FF52] transition-colors`}
    >
      {icon && <div className="text-[#D1FF52]">{icon}</div>}
      <span className="text-[10px] font-bold leading-tight uppercase tracking-widest">{children}</span>
    </motion.div>
  );
}
