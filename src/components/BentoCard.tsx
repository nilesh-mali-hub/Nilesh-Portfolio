import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function BentoCard({ children, className = '', delay = 0 }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`bg-neutral-900 border border-neutral-800 rounded-[2rem] overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}
