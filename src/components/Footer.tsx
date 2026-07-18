import { motion } from 'motion/react';
import { Instagram, Linkedin, Twitter, Youtube, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="mt-20 mb-8 max-w-7xl mx-auto px-4 md:px-8 w-full flex flex-col gap-4">
      {/* Top Row */}
      <div className="flex flex-col md:flex-row gap-4">
        <a 
          href="#" 
          className="md:w-1/3 border border-neutral-800 rounded-full h-20 flex items-center justify-center hover:border-white transition-colors group"
        >
          <span className="font-display font-bold text-3xl tracking-tighter uppercase group-hover:scale-105 transition-transform">CV</span>
        </a>
        <Link 
          to="/contact"
          className="md:w-2/3 bg-blue-600 rounded-full h-20 flex items-center justify-center hover:bg-blue-500 transition-colors group"
        >
          <span className="font-bold text-lg flex items-center gap-2 group-hover:scale-105 transition-transform">
            Let's Make Magic – Your vision, my expertise <ArrowRight className="w-5 h-5" />
          </span>
        </Link>
      </div>

      {/* Middle Row */}
      <div className="flex flex-col md:flex-row gap-4">
        <a 
          href="https://api.whatsapp.com/send/?phone=916378954363&text=Hello+Nilesh+Mali%21&type=phone_number&app_absent=0" 
          target="_blank"
          rel="noopener noreferrer"
          className="md:w-2/3 border border-neutral-800 rounded-full h-20 flex items-center justify-center hover:border-white transition-colors group"
        >
          <span className="font-bold text-lg flex items-center gap-2 group-hover:scale-105 transition-transform">
            Say hello <ArrowRight className="w-5 h-5" />
          </span>
        </a>
        <div className="md:w-1/3 border border-neutral-800 rounded-full h-20 flex items-center justify-center gap-6">
          <a href="https://www.instagram.com/_nilesh._.mali_?" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="text-neutral-400 hover:text-white transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/nilesh-mali-a5997b28a/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="text-neutral-400 hover:text-white transition-colors">
            <Youtube className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="border border-neutral-800 rounded-full h-20 flex flex-wrap items-center justify-center gap-8 md:gap-24">
        <a href="#home" className="font-bold hover:text-[#D1FF52] transition-colors">Home</a>
        <a href="#projects" className="font-bold hover:text-[#D1FF52] transition-colors">Projects</a>
        <a href="#services" className="font-bold hover:text-[#D1FF52] transition-colors">Services</a>
        <a href="#about" className="font-bold hover:text-[#D1FF52] transition-colors">About</a>
      </div>
    </footer>
  );
}
