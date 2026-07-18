import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export function FloatingResumeButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-[5.5rem] md:bottom-10 md:right-[7.5rem] z-50"
        >
          <a
            href="https://api.whatsapp.com/send/?phone=916378954363&text=Hello+Nilesh+Mali%21&type=phone_number&app_absent=0"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 bg-neutral-900/70 backdrop-blur-xl border border-neutral-800/80 hover:border-[#D1FF52]/50 text-white px-6 py-3.5 rounded-full shadow-2xl transition-all group"
          >
            <span className="font-display font-bold uppercase tracking-widest text-[10px] group-hover:text-[#D1FF52] transition-colors mt-0.5">
              Hire Me
            </span>
            <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-[#D1FF52] transition-colors">
              <MessageCircle className="w-3 h-3 text-neutral-400 group-hover:text-black transition-colors" />
            </div>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
