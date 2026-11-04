import { motion, useScroll, useSpring } from 'motion/react';

/**
 * Subtle horizontal scroll progress bar pinned to the top of the viewport.
 * Uses accent color #D1FF52 with a soft neon glow for modern feedback.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  
  // Smooth spring physics for fluid movement across mousewheel, touch and page jump
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[120] pointer-events-none overflow-hidden bg-transparent"
      aria-hidden="true"
    >
      <motion.div
        className="h-full w-full bg-[#D1FF52] origin-left shadow-[0_0_10px_#D1FF52,0_0_3px_#D1FF52]"
        style={{
          scaleX,
          backgroundColor: 'var(--accent-color, #D1FF52)'
        }}
      />
    </div>
  );
}
