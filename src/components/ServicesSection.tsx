import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from './SectionHeading';
import GlassIcons, { GlassIconItem } from './GlassIcons';
import * as LucideIcons from 'lucide-react';
import { PenTool, Megaphone, Globe, BookOpen, Zap, Video, FileText, ArrowRight } from 'lucide-react';
import { defaultData } from '../data/defaultData';

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

// Map string names to Lucide components
const IconMap: Record<string, any> = {
  PenTool,
  Megaphone,
  Globe,
  BookOpen,
  Zap,
  Video
};

const serviceColors = ['lime', 'cyan', 'indigo', 'orange', 'yellow', 'purple', 'green', 'rose'];

export function ServicesSection() {
  const [services, setServices] = useState<Service[]>(defaultData.services);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const renderIcon = (iconName: string) => {
    const IconComponent = IconMap[iconName] || (LucideIcons as any)[iconName] || FileText;
    return <IconComponent className="w-6 h-6" />;
  };

  const glassItems: GlassIconItem[] = services.length > 0 ? services.map((service, index) => ({
    icon: renderIcon(service.image),
    color: serviceColors[index % serviceColors.length],
    title: service.title,
    description: service.description,
  })) : [
    { icon: <PenTool className="w-6 h-6" />, color: 'lime', title: "Brand Identity", description: "Crafting distinctive and memorable visual identities that capture the essence of your business." },
    { icon: <Megaphone className="w-6 h-6" />, color: 'cyan', title: "Social Media Design", description: "Engaging social media graphics and templates tailored for your digital presence." },
    { icon: <Globe className="w-6 h-6" />, color: 'indigo', title: "Website UI", description: "Designing intuitive, user-centric interfaces for web that deliver seamless digital experiences." },
    { icon: <BookOpen className="w-6 h-6" />, color: 'orange', title: "Brochure", description: "Professional and elegant print and digital brochure designs to showcase your products." },
    { icon: <Zap className="w-6 h-6" />, color: 'yellow', title: "Motion Graphics", description: "Bringing ideas to life through dynamic and captivating motion graphics." },
    { icon: <Video className="w-6 h-6" />, color: 'rose', title: "Video Editing", description: "Compelling video edits that tell your story and engage your audience." }
  ];

  return (
    <div className="mt-28" id="services">
      <SectionHeading delay={0.1}>Services</SectionHeading>
      
      {loading ? (
        <div className="flex justify-center items-center min-h-[250px]">
          <div className="w-8 h-8 border-4 border-neutral-800 border-t-[#D1FF52] rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="mt-8 relative">
          <GlassIcons 
            items={glassItems} 
            colorful={true}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          />
        </div>
      )}

      {/* Link to dedicated Services Page */}
      <div className="mt-8 flex justify-center">
        <Link 
          to="/services" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-black hover:bg-[#D1FF52] hover:border-transparent transition-all text-xs font-display font-bold uppercase tracking-wider group"
        >
          <span>Explore All Services & Deliverables</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

