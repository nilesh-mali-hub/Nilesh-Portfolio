import { ReactNode } from 'react';
import { motion } from 'motion/react';

export function SectionHeading({ children, delay = 0 }: { children: ReactNode, delay?: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex justify-center my-8 md:my-12"
    >
      <div className="font-display text-2xl md:text-3xl font-black tracking-tighter uppercase italic text-white flex items-center gap-4">
        <div className="w-4 h-4 bg-[#D1FF52] rounded-full"></div>
        {children}
      </div>
    </motion.div>
  );
}
