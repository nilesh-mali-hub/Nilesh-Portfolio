import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-[#111111] border-b border-neutral-900 transition-all duration-300 shadow-sm">
      <div className="flex justify-between items-center py-5 px-6 md:px-12 w-full max-w-[1400px] mx-auto">
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center gap-2">
            <img src="https://res.cloudinary.com/dfknctbhw/image/upload/v1784198733/nm-logo_achjmg.png" alt="Logo" className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover" />
            <div className="flex items-center font-display font-black text-[18px] md:text-[22px] uppercase text-white tracking-tight">
              <span>Nilesh Mali</span>
            </div>
          </motion.div>
        </Link>
        
        <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.1em] text-white">
          <a href="/#about" className="hover:text-[#D1FF52] transition-colors">About</a>
          <a href="/#projects" className="text-[#D1FF52] hover:text-white transition-colors">Works</a>
          <a href="/#services" className="hover:text-[#D1FF52] transition-colors">Services</a>
          <Link to="/contact" className="px-6 py-3 bg-[#D1FF52] text-black rounded-[0.25rem] hover:bg-[#c5f542] transition-all font-display font-bold text-xs uppercase tracking-wider ml-4">Contact</Link>
        </motion.nav>

        {/* Mobile Nav toggle */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="md:hidden flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
          <span className="mr-1">Menu</span>
          <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center gap-[3px]">
            <div className="w-3 h-[1.5px] bg-white"></div>
            <div className="w-3 h-[1.5px] bg-white"></div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
