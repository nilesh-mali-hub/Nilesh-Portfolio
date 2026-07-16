import { ReactNode } from 'react';
import { BentoCard } from './BentoCard';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
  staggered?: boolean;
}

export function ServiceCard({ title, description, icon, delay = 0, staggered = false }: ServiceCardProps) {
  return (
    <BentoCard className="p-8 group hover:border-[#D1FF52] transition-colors" delay={delay} staggered={staggered}>
      <div className="w-14 h-14 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center mb-6 text-white group-hover:bg-[#D1FF52] group-hover:text-black group-hover:border-transparent transition-all">
        {icon}
      </div>
      <h3 className="font-display font-black text-2xl leading-none mb-4 text-white uppercase tracking-tighter">{title}</h3>
      <p className="text-xs text-neutral-400 leading-relaxed">{description}</p>
    </BentoCard>
  );
}
