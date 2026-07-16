import { ReactNode } from 'react';
import { motion, Variants } from 'motion/react';

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggered?: boolean;
}

export function BentoCard({ children, className = '', delay = 0, staggered = false }: BentoCardProps) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        duration: 0.8, 
        delay: staggered ? undefined : delay, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      initial={staggered ? undefined : "hidden"}
      whileInView={staggered ? undefined : "visible"}
      viewport={{ once: true, margin: "-100px" }}
      className={`bg-neutral-900 border border-neutral-800 rounded-[2rem] overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}
