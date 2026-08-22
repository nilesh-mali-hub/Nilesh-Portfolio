import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { SectionHeading } from './SectionHeading';
import { ServiceCard } from './ServiceCard';
import * as LucideIcons from 'lucide-react';
import { PenTool, Megaphone, Globe, BookOpen, Zap, Video, FileText, Palette, ArrowRight } from 'lucide-react';
import { defaultData } from '../data/defaultData';

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

// Map string names to Lucide components
const IconMap: Record<string, any> = {
  PenTool,
  Megaphone,
  Globe,
  BookOpen,
  Zap,
  Video
};

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

  return (
    <div className="mt-28" id="services">
      <SectionHeading delay={0.1}>Services</SectionHeading>
      
      {loading ? (
        <div className="flex justify-center items-center min-h-[250px]">
          <div className="w-8 h-8 border-4 border-neutral-800 border-t-[#D1FF52] rounded-full animate-spin"></div>
        </div>
      ) : (
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"
        >
          {services.length > 0 ? services.map(service => (
            <ServiceCard 
              key={service.id}
              title={service.title}
              description={service.description}
              icon={renderIcon(service.image)}
              staggered={true}
            />
          )) : (
            <>
              <ServiceCard title="Brand Identity" description="Crafting distinctive and memorable visual identities that capture the essence of your business." icon={<PenTool className="w-6 h-6" />} staggered={true} />
              <ServiceCard title="Social Media Design" description="Engaging social media graphics and templates tailored for your digital presence." icon={<Megaphone className="w-6 h-6" />} staggered={true} />
              <ServiceCard title="Website UI" description="Designing intuitive, user-centric interfaces for web that deliver seamless digital experiences." icon={<Globe className="w-6 h-6" />} staggered={true} />
              <ServiceCard title="Brochure" description="Professional and elegant print and digital brochure designs to showcase your products." icon={<BookOpen className="w-6 h-6" />} staggered={true} />
              <ServiceCard title="Motion Graphics" description="Bringing ideas to life through dynamic and captivating motion graphics." icon={<Zap className="w-6 h-6" />} staggered={true} />
              <ServiceCard title="Video Editing" description="Compelling video edits that tell your story and engage your audience." icon={<Video className="w-6 h-6" />} staggered={true} />
            </>
          )}
        </motion.div>
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
