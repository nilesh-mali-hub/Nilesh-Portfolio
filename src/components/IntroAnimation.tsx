import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export function IntroAnimation() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the intro overlay after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro-overlay"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-neutral-950 flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Logo Reveal */}
          <div className="overflow-hidden mb-6">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="flex items-center gap-3"
            >
              <motion.img 
                src="https://res.cloudinary.com/dfknctbhw/image/upload/v1784198733/nm-logo_achjmg.png"
                alt="Logo"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
              />
              <span className="font-display font-bold text-4xl md:text-5xl tracking-tighter uppercase text-white">Nilesh Mali</span>
            </motion.div>
          </div>
          
          {/* Loading Bar */}
          <div className="w-48 md:w-64 h-[2px] bg-neutral-800 relative overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#D1FF52]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
