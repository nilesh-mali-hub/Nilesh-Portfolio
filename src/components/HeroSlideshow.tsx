import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

const images = [
  "https://res.cloudinary.com/dfknctbhw/image/upload/v1784199299/nilesh_nvzcmq.jpg",
  "https://res.cloudinary.com/dfknctbhw/image/upload/v1782624949/Screenshot_2026-06-28_110531_va0txn.png",
  "https://res.cloudinary.com/dfknctbhw/image/upload/v1784204841/nilesh_rdo57m.webp"
];

export function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // 4 seconds per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Profile"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
        />
      </AnimatePresence>
    </div>
  );
}
