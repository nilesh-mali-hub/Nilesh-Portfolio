import { ReactNode } from 'react';
import { motion } from 'motion/react';

export function SectionHeading({ children, delay = 0 }: { children: ReactNode, delay?: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex justify-center my-8 md:my-12"
    >
      <div className="font-display text-2xl md:text-3xl font-black tracking-tighter uppercase text-white flex items-center gap-4">
        <div className="w-4 h-4 bg-[#D1FF52] rounded-full"></div>
        {children}
      </div>
    </motion.div>
  );
}
