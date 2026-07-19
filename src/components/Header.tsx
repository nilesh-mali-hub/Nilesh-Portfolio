import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Github, Linkedin, MessageCircle } from 'lucide-react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100] bg-[#111111] border-b border-neutral-900 transition-all duration-300 shadow-sm">
        <div className="flex justify-between items-center py-5 px-6 md:px-12 w-full max-w-[1400px] mx-auto">
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity" onClick={closeMenu}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center gap-2">
              <img src="https://res.cloudinary.com/dfknctbhw/image/upload/v1784198733/nm-logo_achjmg.png" alt="Logo" className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover" />
              <div className="flex items-center font-display font-black text-[18px] md:text-[22px] uppercase text-white tracking-tight">
                <span>Nilesh Mali</span>
              </div>
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.1em] text-white">
            <Link to="/about" className="hover:text-[#D1FF52] transition-colors">About</Link>
            <a href="/#projects" className="text-[#D1FF52] hover:text-white transition-colors">Works</a>
            <a href="/#services" className="hover:text-[#D1FF52] transition-colors">Services</a>
            <Link to="/contact" className="px-6 py-3 bg-[#D1FF52] text-black rounded-[0.25rem] hover:bg-[#c5f542] transition-all font-display font-bold text-xs uppercase tracking-wider ml-4">Contact</Link>
          </motion.nav>

          {/* Mobile Nav toggle button */}
          <motion.button 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.3 }}
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="md:hidden flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white focus:outline-none select-none cursor-pointer"
          >
            <span className="mr-1">{isOpen ? 'Close' : 'Menu'}</span>
            <div className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-850 flex items-center justify-center transition-colors hover:bg-neutral-850">
              {isOpen ? (
                <X className="w-4 h-4 text-white" />
              ) : (
                <div className="flex flex-col items-center justify-center gap-[4px] w-4">
                  <div className="w-full h-[1.5px] bg-white rounded-full"></div>
                  <div className="w-4/5 h-[1.5px] bg-white rounded-full self-start"></div>
                </div>
              )}
            </div>
          </motion.button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 top-[77px] z-[90] md:hidden bg-neutral-950 flex flex-col justify-between p-8 border-t border-neutral-900 overflow-y-auto"
          >
            <div className="flex flex-col gap-8 pt-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold font-sans">Navigation</p>
              
              <nav className="flex flex-col gap-6 text-4xl font-display font-black tracking-tighter uppercase">
                <Link 
                  to="/about" 
                  onClick={closeMenu} 
                  className="text-white hover:text-[#D1FF52] transition-colors flex items-center justify-between"
                >
                  <span>About</span>
                  <ArrowUpRight className="w-6 h-6 text-neutral-600" />
                </Link>
                
                <a 
                  href="/#projects" 
                  onClick={closeMenu} 
                  className="text-white hover:text-[#D1FF52] transition-colors flex items-center justify-between"
                >
                  <span>Works</span>
                  <ArrowUpRight className="w-6 h-6 text-neutral-600" />
                </a>
                
                <a 
                  href="/#services" 
                  onClick={closeMenu} 
                  className="text-white hover:text-[#D1FF52] transition-colors flex items-center justify-between"
                >
                  <span>Services</span>
                  <ArrowUpRight className="w-6 h-6 text-neutral-600" />
                </a>

                <Link 
                  to="/contact" 
                  onClick={closeMenu} 
                  className="text-[#D1FF52] hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>Contact</span>
                  <ArrowUpRight className="w-6 h-6 text-[#D1FF52]" />
                </Link>
              </nav>
            </div>

            <div className="flex flex-col gap-6 pt-12 border-t border-neutral-900 mt-auto">
              <div className="flex flex-col gap-2">
                <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-bold">Get In Touch</span>
                <a href="mailto:work.nileshmali@gmail.com" className="text-white text-base hover:text-[#D1FF52] transition-colors font-mono">
                  work.nileshmali@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-4">
                <a 
                  href="https://www.linkedin.com/in/nilesh-mali-a5997b28a/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="https://api.whatsapp.com/send/?phone=916378954363&text=Hello+Nilesh+Mali%21&type=phone_number&app_absent=0" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.behance.net/nileshmali25" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors font-bold text-xs"
                >
                  Be
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
