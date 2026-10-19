import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export function IntroAnimation() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show intro for 1.5 seconds as requested
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1, y: 0 }}
          exit={{ y: "-100%", opacity: 0.95 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          onClick={() => setIsVisible(false)}
          title="Click to skip"
          className="fixed inset-0 z-[99999] bg-neutral-950 flex flex-col items-center justify-center cursor-pointer select-none"
        >
          {/* Logo Reveal */}
          <div className="overflow-hidden mb-6">
            <motion.div
              initial={{ y: "60%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <motion.img 
                src="https://res.cloudinary.com/dfknctbhw/image/upload/v1784198733/nm-logo_achjmg.png"
                alt="Logo"
                initial={{ scale: 0.6, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.15, type: "spring", stiffness: 220 }}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
              />
              <span className="font-display font-bold text-4xl md:text-5xl tracking-tighter uppercase text-white">Nilesh Mali</span>
            </motion.div>
          </div>
          
          {/* Loading Bar - Synchronized to fill in 1.1s so it finishes right before 1.5s */}
          <div className="w-48 md:w-64 h-[2px] bg-neutral-800 relative overflow-hidden rounded-full">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.1, delay: 0.2, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#D1FF52]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
