import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { NoiseOverlay } from '../components/NoiseOverlay';

export default function Contact() {
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    message: ''
  });

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
    if (formData.name && formData.whatsapp) {
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
    if (!formData.name || !formData.whatsapp || !formData.message) return;
    
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      
      let data: any = {};
      try {
        const text = await response.text();
        if (text) {
          data = JSON.parse(text);
        }
      } catch (parseErr) {
        console.warn('Response was not json, treating based on status code:', parseErr);
      }
      
      if (response.ok || data.success) {
        setSuccess(true);
        setFormData({ name: '', whatsapp: '', message: '' });
      } else {
        setError(data.error || 'Failed to submit the message. Please try again or reach out on WhatsApp.');
      }
    } catch (err: any) {
      setError('An error occurred. You can also message Nilesh directly via WhatsApp below.');
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
                <h3 className="font-display font-bold text-2xl text-white mb-2">Message Sent!</h3>
                <p className="text-neutral-400 text-sm max-w-xs mb-6">
                  Thank you! Nilesh will review your message and get back to you shortly.
                </p>
                <div className="flex gap-3 w-full">
                  <button
                    type="button"
                    onClick={() => {
                      setSuccess(false);
                      setStep(1);
                      setFormData({ name: '', whatsapp: '', message: '' });
                    }}
                    className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3.5 rounded-xl text-xs transition-colors"
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
                className="w-full flex flex-col gap-4"
              >
                <input 
                  type="text" 
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-neutral-900/50 border border-neutral-750 rounded-xl px-4 py-4 text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#D1FF52] transition-colors"
                  required
                />
                <input 
                  type="tel" 
                  name="whatsapp"
                  placeholder="WhatsApp Number"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full bg-neutral-900/50 border border-neutral-750 rounded-xl px-4 py-4 text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#D1FF52] transition-colors"
                  required
                />
                <button 
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.name || !formData.whatsapp}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-bold py-4 rounded-xl transition-colors mt-2 cursor-pointer select-none"
                >
                  Next
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
                className="w-full flex flex-col gap-4"
              >
                <textarea 
                  name="message"
                  placeholder="Your Message..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-neutral-900/50 border border-neutral-750 rounded-xl px-4 py-4 text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#D1FF52] transition-colors resize-none"
                  required
                />
                <div className="flex gap-2 mt-2">
                  <button 
                    type="button"
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="w-1/3 bg-neutral-850 hover:bg-neutral-800 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-colors cursor-pointer select-none"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    disabled={!formData.message || isSubmitting}
                    className="w-2/3 bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer select-none"
                  >
                    {isSubmitting ? 'Sending...' : 'Send'}
                  </button>
                </div>
                {error && <p className="text-red-500 text-xs mt-2 text-center bg-red-500/10 border border-red-500/20 py-2 px-3 rounded-lg">{error}</p>}
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* WhatsApp Link */}
        <div className="mt-16 pt-8 border-t border-neutral-800 w-full text-center">
          <p className="text-neutral-400 text-lg flex items-center justify-center gap-2">
            or send me hello on WhatsApp 
            <a 
              href="https://api.whatsapp.com/send/?phone=916378954363&text=Hello+Nilesh+Mali%21&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white border-b-2 border-[#D1FF52] hover:text-[#D1FF52] transition-colors inline-flex items-center gap-1 font-medium"
            >
              <MessageCircle className="w-5 h-5" /> Say hello!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
