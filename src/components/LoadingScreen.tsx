import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-neutral-950 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative">
          <div className="w-16 h-16 border-2 border-neutral-800 rounded-full"></div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-[#D1FF52] border-t-transparent rounded-full"
          />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
          Loading Portfolio
        </span>
      </motion.div>
    </div>
  );
}
