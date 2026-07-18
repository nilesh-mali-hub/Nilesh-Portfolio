import { Instagram, Linkedin, Twitter, Youtube, ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="mt-20 w-full flex flex-col items-center">
      
      {/* Previous Footer Section (CTA and Pills) */}
      <div className="mb-20 max-w-7xl mx-auto px-4 md:px-8 w-full flex flex-col gap-4">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row gap-4">
          <a 
            href="#" 
            className="md:w-1/3 border border-neutral-800 rounded-full h-20 flex items-center justify-center hover:border-white transition-colors group"
          >
            <span className="font-display font-bold text-3xl tracking-tighter uppercase group-hover:scale-105 transition-transform text-white">CV</span>
          </a>
          <Link 
            to="/contact"
            className="md:w-2/3 bg-[#D1FF52] rounded-full h-20 flex items-center justify-center hover:bg-[#c5f542] transition-colors group"
          >
            <span className="font-bold text-lg flex items-center gap-2 group-hover:scale-105 transition-transform text-black">
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
            <span className="font-bold text-lg flex items-center gap-2 group-hover:scale-105 transition-transform text-white">
              Say hello <ArrowRight className="w-5 h-5" />
            </span>
          </a>
          <div className="md:w-1/3 border border-neutral-800 rounded-full h-20 flex items-center justify-center gap-6 text-white">
            <a href="https://www.instagram.com/_nilesh._.mali_?" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[#D1FF52] transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-neutral-400 hover:text-[#D1FF52] transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/nilesh-mali-a5997b28a/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[#D1FF52] transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-neutral-400 hover:text-[#D1FF52] transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* New Footer Section */}
      <div className="border-t border-neutral-900 bg-[#0a0a0a] pt-16 pb-8 px-4 md:px-8 w-full relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-8">
          
          {/* Brand & Vision */}
          <div className="flex flex-col items-start gap-6 max-w-sm">
            <div className="flex flex-col items-start justify-center font-display font-black text-2xl uppercase text-white tracking-tight m-0 p-0">
              <span>Nilesh Mali</span>
            </div>
            <p className="text-neutral-400 font-sans text-sm md:text-base leading-relaxed">
              Creative Developer & Graphic Designer crafting modern brands and high-converting digital experiences.
            </p>
            <Link 
              to="/contact"
              className="flex items-center gap-2 text-[#D1FF52] font-display font-bold uppercase tracking-wider text-sm group hover:opacity-80 transition-opacity"
            >
              Let's Make Magic <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-white mb-2">Quick Links</h3>
            <Link to="/" className="text-neutral-400 hover:text-[#D1FF52] font-sans text-sm transition-colors">Home</Link>
            <Link to="/about" className="text-neutral-400 hover:text-[#D1FF52] font-sans text-sm transition-colors">About</Link>
            <a href="/#projects" className="text-neutral-400 hover:text-[#D1FF52] font-sans text-sm transition-colors">Works</a>
            <a href="/#services" className="text-neutral-400 hover:text-[#D1FF52] font-sans text-sm transition-colors">Services</a>
            <Link to="/contact" className="text-neutral-400 hover:text-[#D1FF52] font-sans text-sm transition-colors">Contact</Link>
          </div>

          {/* Contact & Socials */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-white mb-2">Connect</h3>
            <a href="mailto:work.nileshmali@gmail.com" className="flex items-center gap-3 text-neutral-400 hover:text-[#D1FF52] font-sans text-sm transition-colors group">
              <div className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center group-hover:border-[#D1FF52] transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              work.nileshmali@gmail.com
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-neutral-400 hover:text-[#D1FF52] font-sans text-sm transition-colors group">
              <div className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center group-hover:border-[#D1FF52] transition-colors">
                <Youtube className="w-4 h-4" />
              </div>
              YouTube
            </a>
            <a href="https://www.instagram.com/_nilesh._.mali_?" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-neutral-400 hover:text-[#D1FF52] font-sans text-sm transition-colors group">
              <div className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center group-hover:border-[#D1FF52] transition-colors">
                <Instagram className="w-4 h-4" />
              </div>
              Instagram
            </a>
            <a href="https://www.linkedin.com/in/nilesh-mali-a5997b28a/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-neutral-400 hover:text-[#D1FF52] font-sans text-sm transition-colors group">
              <div className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center group-hover:border-[#D1FF52] transition-colors">
                <Linkedin className="w-4 h-4" />
              </div>
              LinkedIn
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Nilesh Mali. All rights reserved.</p>
          <p className="tracking-widest uppercase">Built with Passion</p>
        </div>
      </div>
    </footer>
  );
}
