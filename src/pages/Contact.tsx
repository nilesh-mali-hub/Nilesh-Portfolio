import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Instagram } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { NoiseOverlay } from '../components/NoiseOverlay';

export default function Contact() {
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    message: ''
  });
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [emailAutoSent, setEmailAutoSent] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get('service');
    if (serviceParam) {
      setFormData(prev => ({
        ...prev,
        message: prev.message || `Hi Nilesh, I am interested in inquiring about your "${serviceParam}" service.`
      }));
    }
  }, [location.search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (formData.name.trim() && formData.email.trim() && formData.email.includes('@')) {
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    setError(null);

    // Support configurable backend URL or relative /api/contact
    const apiBase = ((import.meta as any).env?.VITE_API_URL || '').replace(/\/$/, '');
    const apiUrl = `${apiBase}/api/contact`;

    try {
      let isSuccess = false;
      let emailDispatched = false;

      // 1. Attempt primary backend API
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
        });
        
        let data: any = {};
        try {
          const text = await response.text();
          if (text) data = JSON.parse(text);
        } catch {}

        if (response.ok || data.success) {
          isSuccess = true;
          emailDispatched = Boolean(data.emailSent);
        } else if (response.status === 404) {
          // Expected on static hosting like Netlify when backend is separated
          console.info('Backend /api/contact returned 404. Attempting Netlify Forms fallback...');
        } else {
          console.warn('API submission response not ok:', response.status, data);
        }
      } catch (networkErr) {
        console.warn('Primary API fetch failed, trying Netlify Forms fallback:', networkErr);
      }

      // 2. Fallback to Netlify Forms submission
      if (!isSuccess) {
        try {
          const netlifyParams = new URLSearchParams({
            'form-name': 'contact',
            name: formData.name,
            email: formData.email,
            whatsapp: formData.whatsapp || '',
            message: formData.message
          });

          const netlifyRes = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: netlifyParams.toString(),
          });

          if (netlifyRes.ok) {
            isSuccess = true;
          }
        } catch (netlifyErr) {
          console.warn('Netlify form submission fallback failed:', netlifyErr);
        }
      }

      if (isSuccess) {
        setSubmittedEmail(formData.email);
        setEmailAutoSent(emailDispatched);
        setSuccess(true);
        setFormData({ name: '', email: '', whatsapp: '', message: '' });
      } else {
        setError('Could not reach the server right now. You can send your message directly to Nilesh in 1-click via WhatsApp or Email below.');
      }
    } catch (err: any) {
      setError('An unexpected error occurred. Please use the WhatsApp or Email button below.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans relative flex flex-col items-center justify-center p-6 pt-24">
      <SEO 
        title="Contact Nilesh Mali | Get in Touch"
        description="Have a dynamic brand design project or want a premium creative website? Contact Nilesh Mali today via WhatsApp or the web contact form."
      />
      <NoiseOverlay />
      
      <div className="w-full max-w-md relative z-10 flex flex-col items-center">
        <h1 className="font-display font-bold text-5xl md:text-6xl text-white uppercase tracking-tighter mb-12 text-center">
          Get in Touch!
        </h1>

        {/* Stepper */}
        <div className="flex items-center justify-between w-full mb-8 relative">
          <div className="absolute left-0 right-0 h-[1px] bg-neutral-800 top-1/2 -translate-y-1/2 z-0"></div>
          
          <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors duration-300 ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-neutral-900 border border-neutral-700 text-neutral-500'}`}>
            1
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors duration-300 ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-neutral-900 border border-neutral-700 text-neutral-500'}`}>
            2
          </div>
        </div>

        {/* Form Container */}
        <div className="w-full relative min-h-[260px] bg-neutral-900/20 border border-neutral-900 rounded-2xl p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-col items-center justify-center py-6 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#D1FF52]/10 border border-[#D1FF52]/30 flex items-center justify-center text-[#D1FF52] mb-4">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-2">Message Sent! ✨</h3>
                <p className="text-neutral-300 text-sm max-w-sm mb-2">
                  Thank you! {submittedEmail ? (
                    <>A confirmation email has been dispatched to <strong className="text-white underline decoration-[#D1FF52]">{submittedEmail}</strong>.</>
                  ) : (
                    <>Nilesh has received your inquiry and will review it shortly.</>
                  )}
                </p>
                <p className="text-xs text-neutral-500 mb-6">
                  Check your inbox for project summary and direct WhatsApp access.
                </p>
                <div className="flex gap-3 w-full">
                  <button
                    type="button"
                    onClick={() => {
                      setSuccess(false);
                      setStep(1);
                      setFormData({ name: '', email: '', whatsapp: '', message: '' });
                    }}
                    className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3.5 rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Send Another
                  </button>
                  <a
                    href="https://api.whatsapp.com/send/?phone=916378954363&text=Hello+Nilesh+Mali%21&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#D1FF52] hover:bg-[#b8e83b] text-black font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Open WhatsApp
                  </a>
                </div>
              </motion.div>
            ) : step === 1 ? (
              <motion.form 
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full flex flex-col gap-3.5"
              >
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Your Name <span className="text-[#D1FF52]">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-neutral-900/60 border border-neutral-750 rounded-xl px-4 py-3.5 text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#D1FF52] transition-colors text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Email Address <span className="text-[#D1FF52]">*</span>
                    <span className="text-neutral-500 font-sans text-[10px] ml-1.5 lowercase">(for auto confirmation)</span>
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-neutral-900/60 border border-neutral-750 rounded-xl px-4 py-3.5 text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#D1FF52] transition-colors text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    WhatsApp / Phone <span className="text-neutral-500 font-sans text-[10px] lowercase">(optional)</span>
                  </label>
                  <input 
                    type="tel" 
                    name="whatsapp"
                    placeholder="+91 98765 43210"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full bg-neutral-900/60 border border-neutral-750 rounded-xl px-4 py-3.5 text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#D1FF52] transition-colors text-sm"
                  />
                </div>

                <button 
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.name.trim() || !formData.email.trim() || !formData.email.includes('@')}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-bold py-3.5 rounded-xl transition-colors mt-2 cursor-pointer select-none text-sm"
                >
                  Next: Project Details &rarr;
                </button>
              </motion.form>
            ) : (
              <motion.form 
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-3.5"
              >
                <div className="flex items-center justify-between text-xs text-neutral-400 bg-neutral-900/60 border border-neutral-800 rounded-lg px-3 py-2">
                  <span className="truncate">
                    From: <strong className="text-white">{formData.name}</strong> &bull; <span className="text-neutral-300">{formData.email}</span>
                  </span>
                  <button 
                    type="button" 
                    onClick={prevStep}
                    className="text-[#D1FF52] hover:underline shrink-0 ml-2 font-mono text-[11px] cursor-pointer"
                  >
                    Edit
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Project Message / Requirements <span className="text-[#D1FF52]">*</span>
                  </label>
                  <textarea 
                    name="message"
                    placeholder="Tell Nilesh about your brand, website, or creative goals..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-neutral-900/60 border border-neutral-750 rounded-xl px-4 py-3.5 text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#D1FF52] transition-colors resize-none text-sm"
                    required
                  />
                </div>

                <div className="flex gap-2 mt-1">
                  <button 
                    type="button"
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="w-1/3 bg-neutral-850 hover:bg-neutral-800 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-colors cursor-pointer select-none text-sm"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    disabled={!formData.message.trim() || isSubmitting}
                    className="w-2/3 bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer select-none text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
                {error && (
                  <div className="mt-2 text-center bg-red-500/10 border border-red-500/20 py-3 px-3.5 rounded-xl flex flex-col gap-2.5">
                    <p className="text-red-400 text-xs font-medium leading-relaxed">{error}</p>
                    <div className="flex flex-col sm:flex-row gap-2 mt-0.5">
                      <a
                        href={`https://api.whatsapp.com/send/?phone=916378954363&text=${encodeURIComponent(
                          `Hi Nilesh! I am contacting you regarding a project:\n\n• Name: ${formData.name || 'Website Visitor'}\n• Email: ${formData.email || 'N/A'}\n• Phone: ${formData.whatsapp || 'N/A'}\n\n• Message:\n${formData.message}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#D1FF52] hover:bg-[#b8e83b] text-black font-bold py-2.5 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> Send via WhatsApp (Instant)
                      </a>
                      <a
                        href={`mailto:work.nileshmali@gmail.com?subject=${encodeURIComponent(
                          `New Project Inquiry from ${formData.name || 'Website Visitor'}`
                        )}&body=${encodeURIComponent(
                          `Hi Nilesh,\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.whatsapp}\n\nProject Requirements:\n${formData.message}`
                        )}`}
                        className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-2.5 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors border border-neutral-700 cursor-pointer"
                      >
                        Send via Email
                      </a>
                    </div>
                  </div>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* WhatsApp & Instagram Direct Channels */}
        <div className="mt-16 pt-8 border-t border-neutral-800 w-full text-center">
          <p className="text-neutral-400 text-base sm:text-lg flex flex-wrap items-center justify-center gap-2">
            <span>or connect directly via</span>
            <a 
              href="https://api.whatsapp.com/send/?phone=916378954363&text=Hello+Nilesh+Mali%21&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white border-b-2 border-[#D1FF52] hover:text-[#D1FF52] transition-colors inline-flex items-center gap-1 font-medium"
            >
              <MessageCircle className="w-4 h-4 text-[#D1FF52]" /> WhatsApp
            </a>
            <span className="text-neutral-600">•</span>
            <a 
              href="https://www.instagram.com/_nilesh._.mali_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white border-b-2 border-[#D1FF52] hover:text-[#D1FF52] transition-colors inline-flex items-center gap-1 font-medium"
            >
              <Instagram className="w-4 h-4 text-[#E1306C]" /> Instagram (@_nilesh._.mali_)
            </a>
          </p>

          {/* Local Studio Location & Geo Presence */}
          <div className="mt-8 pt-6 border-t border-neutral-900 flex flex-col items-center gap-1.5 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-[#D1FF52] animate-pulse"></span>
              <span>Based in <strong className="text-white">Abu Road, Sirohi, Rajasthan (307026)</strong></span>
            </div>
            <p className="text-[11px] text-neutral-500 mt-1 max-w-sm">
              Providing freelance graphic design, branding, UI/UX & video editing services for businesses in Abu Road, Mount Abu, Palanpur, and clients worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
