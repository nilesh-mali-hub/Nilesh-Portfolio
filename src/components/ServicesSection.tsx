import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from './SectionHeading';
import { ServiceCard } from './ServiceCard';
import * as LucideIcons from 'lucide-react';
import { PenTool, Megaphone, Globe, BookOpen, Zap, Video, FileText } from 'lucide-react';

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
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
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
          {services.map(service => (
            <ServiceCard 
              key={service.id}
              title={service.title}
              description={service.description}
              icon={renderIcon(service.image)}
              staggered={true}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
