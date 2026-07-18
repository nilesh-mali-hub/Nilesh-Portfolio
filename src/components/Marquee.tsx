import { motion } from 'motion/react';

export function Marquee() {
  return (
    <div className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] bg-[#D1FF52] py-6 sm:py-8 overflow-hidden flex whitespace-nowrap mt-28">
      <motion.div
        className="flex gap-4 sm:gap-8 min-w-max pr-4 sm:pr-8"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30,
        }}
      >
        {[...Array(20)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 sm:gap-8 font-sans font-medium text-5xl sm:text-7xl lg:text-8xl text-black tracking-tight">
            <span>Let's connect</span>
            <span>✦</span>
            <span>Don't be a stranger</span>
            <span>✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
