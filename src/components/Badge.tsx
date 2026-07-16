import { ReactNode } from 'react';
import { motion, Variants } from 'motion/react';

interface BadgeProps {
  children: ReactNode;
  icon?: ReactNode;
  colorClass: string;
  delay?: number;
  staggered?: boolean;
}

export function Badge({ children, icon, colorClass, delay = 0, staggered = false }: BadgeProps) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, filter: "blur(5px)" },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { 
        duration: 0.7, 
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
      viewport={{ once: true, margin: "-50px" }}
      className={`flex flex-col items-center justify-center p-3 rounded-[1.5rem] w-[90px] h-[90px] text-center gap-2 bg-neutral-900 border border-neutral-800 text-white hover:border-[#D1FF52] transition-colors`}
    >
      {icon && <div className="text-[#D1FF52]">{icon}</div>}
      <span className="text-[10px] font-bold leading-tight uppercase tracking-widest">{children}</span>
    </motion.div>
  );
}
