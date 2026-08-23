import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  PenTool, 
  Megaphone, 
  Globe, 
  BookOpen, 
  Zap, 
  Video, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Clock, 
  ShieldCheck, 
  Briefcase, 
  MessageSquare,
  FileCheck2,
  Workflow,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { NoiseOverlay } from '../components/NoiseOverlay';
import { SectionHeading } from '../components/SectionHeading';
import { BentoCard } from '../components/BentoCard';
import { defaultData } from '../data/defaultData';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  tagline?: string;
  deliverables?: string[];
  timeline?: string;
  tools?: string[];
}

const EXTENDED_SERVICES: ServiceItem[] = [
  {
    id: "brand-identity",
    title: "Brand Identity & Strategy",
    description: "Crafting distinctive, enduring brand identities that define your visual presence, set you apart from competitors, and resonate deeply with your target demographic.",
    tagline: "Logos, Design Systems, Typography & Guidelines",
    deliverables: [
      "Primary & secondary logo marks",
      "Comprehensive brand guidelines book",
      "Typography pairing & custom color palettes",
      "Brand collateral (business cards, letterheads, email signatures)",
      "Vector asset pack (SVG, PNG, EPS, AI)"
    ],
    timeline: "1 - 2 Weeks",
    tools: ["Illustrator", "Photoshop", "Figma"],
    image: "PenTool"
  },
  {
    id: "social-media",
    title: "Social Media & Visual Marketing",
    description: "High-converting social graphics, promotional carousels, and reusable design templates engineered for maximum digital engagement across Instagram, LinkedIn, and X.",
    tagline: "Post Systems, Story Sets & Ad Creatives",
    deliverables: [
      "Custom post and carousel templates",
      "Story and highlight cover designs",
      "High-CTR ad banners & promotional kits",
      "Platform-optimized export presets",
      "Editable design source files"
    ],
    timeline: "3 - 5 Days",
    tools: ["Photoshop", "Illustrator", "Canva / Figma"],
    image: "Megaphone"
  },
  {
    id: "website-ui",
    title: "Website UI/UX Design",
    description: "Modern, intuitive, and conversion-focused web interfaces engineered with mathematical spacing, responsive layouts, and modern aesthetic design standards.",
    tagline: "Wireframes, High-Fidelity Prototypes & Design Systems",
    deliverables: [
      "Interactive high-fidelity prototypes",
      "Desktop, tablet & mobile responsive screens",
      "Organized auto-layout Figma component libraries",
      "Micro-interaction & transition notes",
      "Developer-ready handoff documentation"
    ],
    timeline: "2 - 3 Weeks",
    tools: ["Figma", "XD", "Photoshop"],
    image: "Globe"
  },
  {
    id: "brochure-print",
    title: "Brochures, Catalogues & Editorial",
    description: "Pre-press ready print collateral, corporate profiles, product brochures, and interactive digital PDFs formatted with meticulous editorial precision.",
    tagline: "Corporate Profiles, Lookbooks & Annual Reports",
    deliverables: [
      "Multi-page brochure & catalog layouts",
      "Print-ready CMYK PDFs with bleed marks",
      "Interactive digital PDFs with clickable navigation",
      "Packaging & merchandise mockup renders",
      "InDesign package files with linked assets"
    ],
    timeline: "5 - 10 Days",
    tools: ["InDesign", "Illustrator", "Photoshop"],
    image: "BookOpen"
  },
  {
    id: "motion-graphics",
    title: "Motion Graphics & Animation",
    description: "Dynamic logo stings, UI interaction animations, and kinetic typography loops that bring brand assets to life and capture viewer attention instantly.",
    tagline: "Logo Reveals, Micro-Animations & Social Loops",
    deliverables: [
      "Animated logo reveals & intros/outros",
      "Micro-interaction Lottie/JSON animation files",
      "Kinetic typography promo clips (15s/30s)",
      "High-res MP4/MOV exports with alpha transparency",
      "Source project files"
    ],
    timeline: "1 - 2 Weeks",
    tools: ["After Effects", "Premiere Pro", "Lottie"],
    image: "Zap"
  },
  {
    id: "video-editing",
    title: "Video Editing & Post-Production",
    description: "Polished, cinematic video editing, Reels/Shorts formatting, audio sweetening, and color grading tailored for creators, startups, and marketing campaigns.",
    tagline: "Short-Form Reels, Commercials & Corporate Videos",
    deliverables: [
      "Paced video montage with sound design",
      "Dynamic captions, callouts & graphics",
      "Color grading & audio normalization",
      "Vertical (9:16) and widescreen (16:9) formats",
      "Final 4K/1080p high-bitrate masters"
    ],
    timeline: "3 - 7 Days",
    tools: ["Premiere Pro", "After Effects", "Photoshop"],
    image: "Video"
  }
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Discovery & Briefing",
    desc: "We analyze your project goals, target audience, brand aesthetic, and technical constraints to establish a clear project blueprint."
  },
  {
    step: "02",
    title: "Concept & Prototyping",
    desc: "Iterative exploration through wireframes, moodboards, and rough design drafts to lock down the optimal creative direction."
  },
  {
    step: "03",
    title: "Refinement & Crafting",
    desc: "Detailed polishing, typographic refinement, color harmonizing, and asset creation backed by continuous client feedback loops."
  },
  {
    step: "04",
    title: "Final Handoff & Support",
    desc: "Delivery of organized production-ready master assets in all required formats along with developer guidelines and usage notes."
  }
];

const FAQS = [
  {
    q: "How does the project onboarding and collaboration process work?",
    a: "After an initial inquiry via the contact form or WhatsApp, we'll schedule a brief discovery discussion to define goals, timelines, and deliverables. Once approved, progress updates and design milestones are shared regularly via Figma or cloud links."
  },
  {
    q: "Can you provide custom bundles or ongoing retainer services?",
    a: "Yes. In addition to standalone per-project pricing, I offer monthly design retainer packages for growing teams and startups needing continuous creative support across UI, branding, and marketing collateral."
  },
  {
    q: "What file formats and source assets are provided upon completion?",
    a: "You will receive full ownership of all final source assets, including editable Figma files, Adobe InDesign/Illustrator/Photoshop packages, vector exports (SVG, EPS, PDF), and optimized web graphics."
  },
  {
    q: "What are your standard turnaround times for design deliverables?",
    a: "Timelines depend on project scope. Social media kits and quick assets take 3–5 days, while complete Brand Identities or full Web UI design systems typically take 1–3 weeks."
  }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceItem>(EXTENDED_SERVICES[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [servicesData, setServicesData] = useState<ServiceItem[]>(EXTENDED_SERVICES);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Map all backend services and merge with extended defaults if available
          const dynamicServices = data.map((remote: any) => {
            const matchedLocal = EXTENDED_SERVICES.find(localSvc => 
              localSvc.id === remote.id || localSvc.title.toLowerCase() === (remote.title || '').toLowerCase()
            );
            return {
              id: remote.id,
              title: remote.title || 'Untitled Service',
              description: remote.description || 'Professional design solution tailored to your brand.',
              image: remote.image || matchedLocal?.image || 'PenTool',
              tagline: remote.tagline || matchedLocal?.tagline || 'Custom Design & Production',
              deliverables: remote.deliverables || matchedLocal?.deliverables || [
                'Discovery & aesthetic conceptualization',
                'High-resolution vector master exports',
                'Source files (Figma / Adobe / Assets)'
              ],
              timeline: remote.timeline || matchedLocal?.timeline || '3 - 7 Days',
              tools: remote.tools || matchedLocal?.tools || ['Photoshop', 'Illustrator', 'Figma']
            };
          });
          setServicesData(dynamicServices);
          if (dynamicServices.length > 0) {
            setSelectedService(dynamicServices[0]);
          }
        }
      })
      .catch(err => console.error('Error fetching services:', err));
  }, []);

  const getServiceIcon = (name?: string) => {
    switch (name) {
      case 'PenTool': return <PenTool className="w-6 h-6" />;
      case 'Megaphone': return <Megaphone className="w-6 h-6" />;
      case 'Globe': return <Globe className="w-6 h-6" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'Video': return <Video className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-24 pb-20 overflow-x-hidden font-sans relative">
      <SEO 
        title="Services & Capabilities | Nilesh Mali - Graphic Designer & UI/UX"
        description="Explore design services by Nilesh Mali: Brand Identity, Website UI/UX, Social Media Graphics, Motion Design, Print Collateral, and Video Post-Production."
      />
      <NoiseOverlay />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full relative z-10 mt-6">
        
        {/* Header Hero Banner */}
        <div className="relative rounded-[2rem] overflow-hidden bg-neutral-900 border border-neutral-800 p-8 sm:p-12 md:p-16 mb-16">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D1FF52] opacity-10 blur-[130px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-neutral-800 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D1FF52] mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Design Capabilities & Solutions</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-black text-4xl sm:text-5xl md:text-7xl uppercase tracking-tighter leading-tight text-white mb-6"
            >
              Crafting <span className="text-[#D1FF52]">Visual Excellence</span> For Modern Brands.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl"
            >
              From full brand identities and design systems to high-conversion UI/UX interfaces and engaging motion graphics, I provide end-to-end creative solutions tailored for impact.
            </motion.p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-neutral-800/80">
            <div>
              <p className="font-display font-black text-2xl sm:text-3xl text-[#D1FF52]">50+</p>
              <p className="text-xs uppercase tracking-wider text-neutral-400 mt-1">Completed Projects</p>
            </div>
            <div>
              <p className="font-display font-black text-2xl sm:text-3xl text-white">100%</p>
              <p className="text-xs uppercase tracking-wider text-neutral-400 mt-1">Client Satisfaction</p>
            </div>
            <div>
              <p className="font-display font-black text-2xl sm:text-3xl text-[#D1FF52]">5+ Yrs</p>
              <p className="text-xs uppercase tracking-wider text-neutral-400 mt-1">Design Craftsmanship</p>
            </div>
            <div>
              <p className="font-display font-black text-2xl sm:text-3xl text-white">Fast</p>
              <p className="text-xs uppercase tracking-wider text-neutral-400 mt-1">Turnaround Times</p>
            </div>
          </div>
        </div>

        {/* Primary Services Interactive Grid */}
        <div className="mb-24">
          <SectionHeading delay={0.1}>All Services</SectionHeading>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {servicesData.map((svc, idx) => {
              const isSelected = selectedService.id === svc.id;
              return (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedService(svc)}
                  className={`cursor-pointer rounded-[1.75rem] border p-8 flex flex-col justify-between transition-colors duration-300 relative group overflow-hidden ${
                    isSelected 
                      ? 'bg-neutral-900 border-[#D1FF52] shadow-[0_0_30px_rgba(209,255,82,0.12)]' 
                      : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
                  }`}
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'bg-[#D1FF52] text-black' 
                          : 'bg-neutral-800 text-white group-hover:bg-[#D1FF52] group-hover:text-black'
                      }`}>
                        {getServiceIcon(svc.image)}
                      </div>
                      <span className="text-[11px] font-mono text-neutral-500 font-bold uppercase tracking-widest">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-2xl uppercase tracking-tight text-white mb-2 group-hover:text-[#D1FF52] transition-colors">
                      {svc.title}
                    </h3>
                    
                    {svc.tagline && (
                      <p className="text-xs font-semibold text-[#D1FF52]/80 uppercase tracking-wider mb-4">
                        {svc.tagline}
                      </p>
                    )}

                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                      {svc.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-neutral-800/80 flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <Clock className="w-3.5 h-3.5 text-[#D1FF52]" />
                      <span>{svc.timeline || '1-2 Weeks'}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#D1FF52] group-hover:translate-x-1 transition-transform">
                      Details <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Deep Dive Service Inspector Card */}
        <div className="mb-24">
          <SectionHeading delay={0.1}>Deliverables & Scope</SectionHeading>
          
          <div className="mt-8 rounded-[2rem] bg-neutral-900 border border-neutral-800 p-8 sm:p-12 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-10 justify-between items-start">
              
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 text-[10px] font-bold uppercase tracking-widest text-[#D1FF52] mb-4">
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>Selected Service Breakdown</span>
                </div>
                
                <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-white tracking-tight mb-4">
                  {selectedService.title}
                </h2>
                
                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
                  {selectedService.description}
                </p>

                {/* Deliverables List */}
                <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D1FF52]" /> Key Deliverables Included:
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {(selectedService.deliverables || [
                    "Full vector source files (AI, SVG, PDF)",
                    "Complete commercial usage rights",
                    "Dedicated revision cycles",
                    "Asset optimization for web and print"
                  ]).map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D1FF52] mt-1.5 shrink-0" />
                      <span className="text-xs text-neutral-300 font-medium leading-normal">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Software Stack Pills */}
                {selectedService.tools && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] uppercase font-mono text-neutral-500 mr-2">Tools:</span>
                    {selectedService.tools.map((t, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-md bg-neutral-800 border border-neutral-700 text-xs font-semibold text-white">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Box */}
              <div className="w-full lg:w-80 rounded-2xl bg-neutral-950 border border-neutral-800 p-6 flex flex-col justify-between shrink-0">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">Estimated Timeline</p>
                  <p className="text-xl font-display font-bold text-[#D1FF52] mb-6">{selectedService.timeline || '1 - 2 Weeks'}</p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-2 text-xs text-neutral-300">
                      <ShieldCheck className="w-4 h-4 text-[#D1FF52]" />
                      <span>100% Original Custom Work</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-300">
                      <MessageSquare className="w-4 h-4 text-[#D1FF52]" />
                      <span>Direct 1-on-1 Communication</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-300">
                      <Layers className="w-4 h-4 text-[#D1FF52]" />
                      <span>Full Source Files & Handoff</span>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/contact?service=${encodeURIComponent(selectedService.title)}`}
                  className="w-full py-3.5 bg-[#D1FF52] text-black font-display font-bold text-xs uppercase tracking-wider rounded-xl text-center hover:bg-[#c5f542] transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
                >
                  <span>Request This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* 4-Step Process Section */}
        <div className="mb-24">
          <SectionHeading delay={0.1}>Design Process</SectionHeading>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {WORKFLOW_STEPS.map((step, idx) => (
              <div 
                key={idx} 
                className="p-6 sm:p-8 rounded-[1.75rem] bg-neutral-900/80 border border-neutral-800 flex flex-col justify-between relative group hover:border-[#D1FF52] transition-colors"
              >
                <div>
                  <span className="font-display font-black text-3xl sm:text-4xl text-[#D1FF52] mb-4 block">
                    {step.step}
                  </span>
                  <h3 className="font-display font-bold text-lg uppercase tracking-tight text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="w-8 h-1 bg-neutral-800 rounded-full mt-6 group-hover:bg-[#D1FF52] transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="mb-24">
          <SectionHeading delay={0.1}>Frequently Asked Questions</SectionHeading>
          
          <div className="max-w-4xl mx-auto mt-8 space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-neutral-800 bg-neutral-900/60 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
                  >
                    <span className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-tight">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-[#D1FF52] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-neutral-800/60 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="rounded-[2.5rem] bg-[#D1FF52] text-black p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/60 mb-2 font-mono">Ready to get started?</p>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter leading-none mb-4">
              Let's Bring Your Vision To Life.
            </h2>
            <p className="text-black/80 text-sm font-medium leading-relaxed">
              Have a project in mind or need a customized design package? Get in touch and let's craft something exceptional together.
            </p>
          </div>

          <Link
            to="/contact"
            className="px-8 py-4 bg-black text-[#D1FF52] font-display font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-neutral-900 transition-all shrink-0 flex items-center gap-3 shadow-xl active:scale-95"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>
    </div>
  );
}
