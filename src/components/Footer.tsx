import { useState, useEffect } from 'react';
import { Instagram, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function Footer() {
  const [resumeUrl, setResumeUrl] = useState<string>('https://drive.google.com/file/d/1M-KDhvdXRdCUPmwFN6gi616c6ds8Snp0/view?usp=sharing');
  const [secretClicks, setSecretClicks] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/resume')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.pdfUrl) {
          setResumeUrl(data.pdfUrl);
        }
      })
      .catch(() => {});
  }, []);

  const handleSecretTrigger = () => {
    const next = secretClicks + 1;
    setSecretClicks(next);
    if (next >= 3) {
      setSecretClicks(0);
      navigate('/admin');
    }
  };

  const whatsappUrl = "https://api.whatsapp.com/send/?phone=916378954363&text=Hello+Nilesh+Mali%21&type=phone_number&app_absent=0";

  return (
    <footer className="w-full bg-[#080B11] text-white pt-16 md:pt-20 pb-8 px-5 sm:px-8 md:px-12 lg:px-16 border-t border-neutral-800/80 relative overflow-hidden font-sans">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* TOP CALLOUT BANNER (DON'T BE SHY. SAY HOLA. + WHATSAPP) */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-10">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none">
              DON'T BE SHY.
            </h2>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#E8AA38] leading-none mt-2 sm:mt-3">
              SAY HOLA.
            </h2>
          </div>

          {/* Thin horizontal line stretching between text and WhatsApp button */}
          <div className="hidden lg:block flex-1 h-[1px] bg-gradient-to-r from-neutral-700/60 via-neutral-600/40 to-neutral-700/60 mx-10"></div>

          {/* WhatsApp Pill Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-white hover:bg-neutral-100 text-black font-semibold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 shrink-0 cursor-pointer select-none"
          >
            {/* WhatsApp Icon */}
            <svg className="w-5 h-5 fill-current text-[#25D366]" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>

        {/* SECTION DIVIDER */}
        <div className="w-full h-[1px] bg-neutral-800/80 mb-12 sm:mb-16"></div>

        {/* 4 COLUMNS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 pb-14">
          
          {/* COLUMN 1: BRAND BIO & SOCIALS (span 4) */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-6">
            <Link to="/" className="flex items-center gap-3.5 mb-5 group">
              <img
                src="https://res.cloudinary.com/dfknctbhw/image/upload/v1784198733/nm-logo_achjmg.png"
                alt="Nilesh Mali"
                className="w-12 h-12 rounded-full object-cover border border-neutral-700 group-hover:border-amber-400 transition-colors"
              />
              <div className="flex flex-col">
                <span className="font-display font-black text-xl tracking-tight uppercase text-white group-hover:text-amber-400 transition-colors">
                  Nilesh Mali
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                  Graphic Designer & Creative Specialist
                </span>
              </div>
            </Link>

            <p className="text-neutral-400 font-sans text-sm sm:text-base leading-relaxed mb-6">
              Learn graphic design with Nilesh through real projects, custom brand identities, and high-impact visual design.
            </p>

            {/* Circular Social Icons Matching Screenshot */}
            <div className="flex items-center gap-3">
              {/* Behance */}
              <a
                href="https://www.behance.net/nileshmali25"
                target="_blank"
                rel="noopener noreferrer"
                title="Behance Portfolio"
                className="w-10 h-10 rounded-full bg-white hover:bg-[#E8AA38] text-black flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md cursor-pointer"
              >
                <span className="font-bold text-sm tracking-tighter">Bē</span>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/_nilesh._.mali_/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram Profile"
                className="w-10 h-10 rounded-full bg-white hover:bg-[#E8AA38] text-black flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md cursor-pointer"
              >
                <Instagram className="w-5 h-5 text-black stroke-[2.2]" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/nilesh-mali-a5997b28a/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                className="w-10 h-10 rounded-full bg-white hover:bg-[#E8AA38] text-black flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md cursor-pointer"
              >
                <span className="font-bold text-sm tracking-tighter">in</span>
              </a>
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS (span 2.5) */}
          <div className="lg:col-span-2 sm:pl-4">
            <h3 className="text-white font-bold text-lg mb-5 tracking-tight">Quick Links</h3>
            <ul className="flex flex-col gap-3 font-sans text-sm text-neutral-400">
              <li>
                <Link to="/" className="hover:text-white hover:underline transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="/#projects" className="hover:text-white hover:underline transition-colors">
                  Works
                </a>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:underline transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white hover:underline transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white hover:underline transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: IMPORTANT LINKS (span 2.5) */}
          <div className="lg:col-span-3 sm:pl-4">
            <h3 className="text-white font-bold text-lg mb-5 tracking-tight">Important Links</h3>
            <ul className="flex flex-col gap-3 font-sans text-sm text-neutral-400">
              <li>
                <Link to="/services" className="hover:text-white hover:underline transition-colors">
                  Brand Identity
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white hover:underline transition-colors">
                  Social Media Design
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white hover:underline transition-colors">
                  Website UI/UX
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white hover:underline transition-colors">
                  Video Editing
                </Link>
              </li>
              <li>
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-colors">
                  Resume / CV
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: STAY CONNECTED (span 3) */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-lg mb-5 tracking-tight">Stay Connected</h3>
            <div className="flex flex-col gap-3 font-sans text-sm text-neutral-300">
              <p>
                <span className="text-neutral-400">Tel: </span>
                <a href="tel:+916378954363" className="hover:text-[#E8AA38] transition-colors font-medium">
                  +91 63789 54363
                </a>
              </p>
              <p className="break-all">
                <span className="text-neutral-400">Email: </span>
                <a href="mailto:work.nileshmali@gmail.com" className="hover:text-[#E8AA38] transition-colors font-medium">
                  work.nileshmali@gmail.com
                </a>
              </p>
              <p className="text-neutral-400 text-xs mt-1">
                Abu Road, Sirohi, Rajasthan, India
              </p>
            </div>
          </div>

        </div>

        {/* BOTTOM SUB-FOOTER BAR */}
        <div className="w-full border-t border-neutral-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-neutral-500">
          <p className="flex items-center gap-1.5 select-none">
            <span>With <span className="text-red-500">❤️</span> by</span>
            <strong className="text-neutral-300 font-bold uppercase tracking-wider">NILESH MALI</strong>
          </p>

          <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()} All rights Reserved.</p>
            {/* Discrete hidden access point for Admin */}
            <button 
              type="button"
              onClick={handleSecretTrigger}
              className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-800 hover:bg-amber-400 transition-colors cursor-pointer"
              title="System Node"
              aria-label="Admin Node"
            />
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="opacity-0 hover:opacity-40 transition-opacity p-0.5 text-neutral-600 hover:text-neutral-400 cursor-pointer"
              title="Admin Portal"
              aria-label="Admin Portal"
            >
              <Lock className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
