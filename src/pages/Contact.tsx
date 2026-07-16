import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { initAuth, googleSignIn, getAccessToken } from '../lib/firebase';
import type { User } from 'firebase/auth';

export default function Contact() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    message: ''
  });

  const [needsAuth, setNeedsAuth] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setNeedsAuth(false);
        setUser(user);
        setToken(token);
      },
      () => {
        setNeedsAuth(true);
        setUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

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
    setIsSubmitting(true);
    setError(null);
    try {
      let currentToken = await getAccessToken();
      
      if (!currentToken) {
        // Authenticate the user if they don't have a token
        setIsLoggingIn(true);
        try {
          const result = await googleSignIn();
          if (result) {
            currentToken = result.accessToken;
            setToken(result.accessToken);
            setUser(result.user);
            setNeedsAuth(false);
          } else {
            throw new Error("Authentication failed.");
          }
        } finally {
          setIsLoggingIn(false);
        }
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentToken}`
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.error || 'Failed to submit the form');
      }
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in popup was closed. Please sign in to send your message.');
      } else {
        setError(err.message || 'An error occurred. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans relative flex flex-col items-center justify-center p-6">
      <div className="noise-overlay"></div>
      
      {/* Back button */}
      <Link to="/" className="absolute top-8 left-8 text-neutral-500 hover:text-white transition-colors z-20 text-sm font-bold uppercase tracking-widest">
        &larr; Back to Home
      </Link>

      <div className="w-full max-w-md relative z-10 flex flex-col items-center">
        <h1 className="font-display font-black text-5xl md:text-6xl text-white uppercase tracking-tighter mb-12 text-center">
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
        <div className="w-full relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col gap-4 absolute inset-0"
              >
                <input 
                  type="text" 
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-neutral-900/50 border border-neutral-700 rounded-xl px-4 py-4 text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#D1FF52] transition-colors"
                  required
                />
                <input 
                  type="tel" 
                  name="whatsapp"
                  placeholder="WhatsApp Number"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full bg-neutral-900/50 border border-neutral-700 rounded-xl px-4 py-4 text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#D1FF52] transition-colors"
                  required
                />
                <button 
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.name || !formData.whatsapp}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-bold py-4 rounded-xl transition-colors mt-2"
                >
                  Next
                </button>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form 
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-4 absolute inset-0"
              >
                <textarea 
                  name="message"
                  placeholder="Your Message..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-neutral-900/50 border border-neutral-700 rounded-xl px-4 py-4 text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#D1FF52] transition-colors resize-none"
                  required
                />
                <div className="flex gap-2 mt-2">
                  <button 
                    type="button"
                    onClick={prevStep}
                    disabled={isSubmitting || success}
                    className="w-1/3 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    disabled={!formData.message || isSubmitting || success || isLoggingIn}
                    className="w-2/3 bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {isLoggingIn ? 'Signing in...' : isSubmitting ? 'Sending...' : success ? 'Sent!' : needsAuth ? 'Sign in & Send' : 'Send'}
                  </button>
                </div>
                {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                {success && <p className="text-[#D1FF52] text-sm mt-2 text-center">Your message has been saved successfully!</p>}
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
