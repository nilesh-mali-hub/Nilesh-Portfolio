import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { BentoCard } from './BentoCard';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  category: string;
  imageUrl: string;
  link?: string;
  delay?: number;
  featured?: boolean;
  className?: string;
}

export function ProjectCard({ title, category, imageUrl, link = "#", delay = 0, featured = false, className = "" }: ProjectCardProps) {
  return (
    <BentoCard className={`relative group cursor-pointer ${className || (featured ? 'col-span-1 md:col-span-2 row-span-2 min-h-[400px]' : 'col-span-1 row-span-1 min-h-[300px] md:min-h-[400px]')}`} delay={delay}>
      <a href={link} className="absolute inset-0 z-20">
        <span className="sr-only">View {title}</span>
      </a>
      
      <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent opacity-90"></div>
      </div>
      
      <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
        <div className="flex justify-between items-start">
          <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/20 text-white">
            {category}
          </span>
          <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 group-hover:bg-[#D1FF52] group-hover:text-black group-hover:border-transparent">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
        
        <div>
          <h3 className="font-display font-black text-3xl leading-none text-white tracking-tighter uppercase group-hover:text-[#D1FF52] transition-colors">{title}</h3>
        </div>
      </div>
    </BentoCard>
  );
}
