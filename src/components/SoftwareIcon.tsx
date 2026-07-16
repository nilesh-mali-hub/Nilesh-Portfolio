import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface SoftwareIconProps {
  name?: string;
  icon?: ReactNode;
  delay?: number;
}

export function SoftwareIcon({ name, icon, delay = 0 }: SoftwareIconProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="w-14 h-14 sm:w-16 sm:h-16 bg-neutral-900 rounded-[1.5rem] border border-neutral-800 flex items-center justify-center text-white hover:border-[#D1FF52] hover:text-[#D1FF52] transition-colors cursor-pointer"
    >
      {icon ? (
        <div className="text-current transition-colors">{icon}</div>
      ) : (
        <span className="font-display font-bold text-xl sm:text-2xl transition-colors">{name}</span>
      )}
    </motion.div>
  );
}
