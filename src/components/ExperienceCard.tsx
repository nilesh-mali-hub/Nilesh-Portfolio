import { ReactNode } from 'react';
import { BentoCard } from './BentoCard';
import { Briefcase } from 'lucide-react';
import { TimelineItem, TimelineItemProps } from './TimelineItem';

export interface ExperienceItemData {
  year: string;
  title: string;
  description?: string;
  subtitle?: string;
  highlight?: boolean;
  highlightColor?: 'lime' | 'cyan' | string;
}

interface ExperienceCardProps {
  className?: string;
  title?: string;
  items: ExperienceItemData[];
  icon?: ReactNode;
  iconBgClass?: string;
  iconColorClass?: string;
  highlightTheme?: 'lime' | 'cyan';
  borderHighlight?: boolean;
}

export function ExperienceCard({
  className = '',
  title = 'EXPERIENCE',
  items = [],
  icon,
  iconBgClass,
  iconColorClass,
  highlightTheme = 'lime',
  borderHighlight = false,
}: ExperienceCardProps) {
  const isCyan = highlightTheme === 'cyan';

  return (
    <BentoCard
      className={`p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
        borderHighlight
          ? 'border border-[#D1FF52]/50 shadow-[0_0_30px_rgba(209,255,82,0.06)]'
          : 'border border-neutral-800/80 hover:border-neutral-700/80'
      } ${className}`}
      staggered={true}
    >
      <div className="relative z-10 flex flex-col h-full">
        {/* Header with circular icon badge and uppercase title */}
        <div className="flex items-center gap-3.5 mb-8 sm:mb-9">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-md ${
              iconBgClass || (isCyan ? 'bg-cyan-950/40 border border-cyan-800/40' : 'bg-neutral-800/80 border border-neutral-700/50')
            } ${iconColorClass || (isCyan ? 'text-cyan-400' : 'text-neutral-300')}`}
          >
            {icon || <Briefcase className="w-4 h-4 text-amber-200/90" />}
          </div>
          <h3 className="font-display font-black text-2xl sm:text-[26px] text-white uppercase tracking-tight">
            {title}
          </h3>
        </div>

        {/* Vertical Timeline items list */}
        <div className="flex flex-col gap-6 sm:gap-7 flex-1">
          {items.map((item, index) => (
            <TimelineItem
              key={index}
              delay={0.08 * (index + 1)}
              year={item.year}
              title={item.title}
              description={item.description || item.subtitle}
              highlight={item.highlight !== undefined ? item.highlight : index === 0}
              highlightColor={item.highlightColor || (index === 0 ? highlightTheme : undefined)}
            />
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
