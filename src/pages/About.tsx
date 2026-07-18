import { motion } from 'motion/react';
import { NoiseOverlay } from '../components/NoiseOverlay';
import { Youtube, Instagram } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-24 pb-20 overflow-x-hidden font-sans relative">
      <NoiseOverlay />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full relative z-10 mt-8">
        <div className="flex flex-col md:flex-row w-full rounded-[2rem] overflow-hidden bg-[#D1FF52] text-black">
          
          {/* Left Content */}
          <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-bold tracking-[0.2em] mb-4 uppercase text-black/60"
            >
              About Me
            </motion.p>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display font-bold text-5xl md:text-7xl leading-none tracking-tighter mb-6"
            >
              Nilesh Mali
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-sans font-bold text-lg md:text-xl mb-8 flex flex-wrap items-center gap-2 md:gap-3"
            >
              <span>Graphic Designer</span>
              <span className="opacity-50 text-sm">/</span>
              <span>Creative Developer</span>
              <span className="opacity-50 text-sm">/</span>
              <span>AI Creative Specialist</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-medium text-black/80 max-w-xl mb-12 space-y-6 leading-relaxed"
            >
              <p>
                I create modern brands, high-converting social media creatives, premium websites, and AI-powered visual experiences that help businesses grow.
              </p>
              <p>
                I combine creativity, technology, and strategy to deliver impactful design solutions for startups, local businesses, hotels, healthcare, education, and corporate brands.
              </p>
            </motion.div>


          </div>

          {/* Right Image */}
          <div className="flex-1 min-h-[400px] md:min-h-[600px] relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src="https://images.unsplash.com/photo-1600861194942-f883de0dfe96?q=80&w=1200&auto=format&fit=crop" 
                alt="Nilesh Mali" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

        </div>
      </main>
    </div>
  );
}
