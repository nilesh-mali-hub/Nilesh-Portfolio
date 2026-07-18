import { BentoCard } from './BentoCard';
import { TimelineItem } from './TimelineItem';
import { Briefcase } from 'lucide-react';
import { ReactNode } from 'react';

interface ExperienceItem {
  year: string;
  title: string;
  subtitle: string;
}

interface ExperienceCardProps {
  className?: string;
  title?: string;
  items: ExperienceItem[];
  icon?: ReactNode;
}

export function ExperienceCard({ className = "", title = "Experience", items, icon }: ExperienceCardProps) {
  return (
    <BentoCard className={`p-8 flex flex-col relative group overflow-hidden ${className}`} staggered={true}>
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/20 to-neutral-900/50 backdrop-blur-md z-0 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-[#D1FF52]">
            {icon || <Briefcase className="w-5 h-5" />}
          </div>
          <h3 className="font-display font-bold text-2xl text-white uppercase tracking-tighter">{title}</h3>
        </div>
        
        <div className="flex flex-col gap-6 relative flex-1 pl-4">
          <div className="absolute left-[3px] top-3 bottom-3 w-[1px] bg-neutral-800/50 hidden sm:block"></div>
          {items.map((item, index) => (
            <div key={index} className="relative z-10">
              {/* Timeline dot */}
              <div className="absolute left-[-16px] top-[10px] w-2 h-2 rounded-full bg-[#D1FF52] hidden sm:block shadow-[0_0_10px_rgba(209,255,82,0.5)]"></div>
              <TimelineItem delay={0.1 * (index + 1)} year={item.year} title={item.title} subtitle={item.subtitle} />
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
