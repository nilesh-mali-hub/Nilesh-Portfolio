import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';
import { NoiseOverlay } from '../components/NoiseOverlay';
import { Download } from 'lucide-react';

export default function About() {
  const [resumeUrl, setResumeUrl] = useState<string>('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');

  useEffect(() => {
    fetch('/api/resume')
      .then(res => res.json())
      .then(data => {
        if (data && data.pdfUrl) {
          setResumeUrl(data.pdfUrl);
        }
      })
      .catch(err => console.error('Error fetching resume:', err));
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-24 pb-20 overflow-x-hidden font-sans relative">
      <SEO 
        title="About Nilesh Mali | Graphic Designer & AI Creative"
        description="Learn more about Nilesh Mali, a passionate Graphic Designer, Creative Developer, and AI Creative Specialist delivering impactful design solutions."
      />
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
              className="font-medium text-black/80 max-w-xl mb-8 space-y-6 leading-relaxed"
            >
              <p>
                I create modern brands, high-converting social media creatives, premium websites, and AI-powered visual experiences that help businesses grow.
              </p>
              <p>
                I combine creativity, technology, and strategy to deliver impactful design solutions for startups, local businesses, hotels, healthcare, education, and corporate brands.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a 
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-black text-[#D1FF52] hover:bg-neutral-900 px-6 py-4 rounded-xl font-bold transition-all duration-200 shadow-xl hover:scale-105 active:scale-95 group w-full sm:w-auto"
              >
                <Download className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
                Download Resume
              </a>
              <a 
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-transparent text-white hover:text-[#D1FF52] border border-neutral-850 hover:border-[#D1FF52]/50 hover:bg-black/30 px-6 py-4 rounded-xl font-bold transition-all duration-200 shadow-xl hover:scale-105 active:scale-95 group w-full sm:w-auto"
              >
                <Download className="w-5 h-5 text-[#D1FF52] transition-transform group-hover:translate-y-0.5" />
                Download CV
              </a>
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
