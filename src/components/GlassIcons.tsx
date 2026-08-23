import React, { ReactNode } from 'react';
import { motion } from 'motion/react';
import './GlassIcons.css';

export interface GlassIconItem {
  icon: ReactNode;
  color?: string;
  label?: string;
  title?: string;
  description?: string;
  customClass?: string;
  onClick?: () => void;
}

export interface GlassIconsProps {
  items: GlassIconItem[];
  className?: string;
  colorful?: boolean;
}

const colorMap: Record<string, { glow: string; bubbleBg: string; bubbleBorder: string; bubbleColor: string }> = {
  lime: {
    glow: 'rgba(209, 255, 82, 0.35)',
    bubbleBg: 'rgba(209, 255, 82, 0.15)',
    bubbleBorder: 'rgba(209, 255, 82, 0.5)',
    bubbleColor: '#D1FF52',
  },
  blue: {
    glow: 'rgba(59, 130, 246, 0.35)',
    bubbleBg: 'rgba(59, 130, 246, 0.15)',
    bubbleBorder: 'rgba(59, 130, 246, 0.5)',
    bubbleColor: '#60A5FA',
  },
  purple: {
    glow: 'rgba(168, 85, 247, 0.35)',
    bubbleBg: 'rgba(168, 85, 247, 0.15)',
    bubbleBorder: 'rgba(168, 85, 247, 0.5)',
    bubbleColor: '#C084FC',
  },
  red: {
    glow: 'rgba(239, 68, 68, 0.35)',
    bubbleBg: 'rgba(239, 68, 68, 0.15)',
    bubbleBorder: 'rgba(239, 68, 68, 0.5)',
    bubbleColor: '#F87171',
  },
  indigo: {
    glow: 'rgba(99, 102, 241, 0.35)',
    bubbleBg: 'rgba(99, 102, 241, 0.15)',
    bubbleBorder: 'rgba(99, 102, 241, 0.5)',
    bubbleColor: '#818CF8',
  },
  orange: {
    glow: 'rgba(249, 115, 22, 0.35)',
    bubbleBg: 'rgba(249, 115, 22, 0.15)',
    bubbleBorder: 'rgba(249, 115, 22, 0.5)',
    bubbleColor: '#FB923C',
  },
  green: {
    glow: 'rgba(34, 197, 94, 0.35)',
    bubbleBg: 'rgba(34, 197, 94, 0.15)',
    bubbleBorder: 'rgba(34, 197, 94, 0.5)',
    bubbleColor: '#4ADE80',
  },
  yellow: {
    glow: 'rgba(234, 179, 8, 0.35)',
    bubbleBg: 'rgba(234, 179, 8, 0.15)',
    bubbleBorder: 'rgba(234, 179, 8, 0.5)',
    bubbleColor: '#FACC15',
  },
  cyan: {
    glow: 'rgba(6, 182, 212, 0.35)',
    bubbleBg: 'rgba(6, 182, 212, 0.15)',
    bubbleBorder: 'rgba(6, 182, 212, 0.5)',
    bubbleColor: '#22D3EE',
  },
  teal: {
    glow: 'rgba(20, 184, 166, 0.35)',
    bubbleBg: 'rgba(20, 184, 166, 0.15)',
    bubbleBorder: 'rgba(20, 184, 166, 0.5)',
    bubbleColor: '#2DD4BF',
  },
  rose: {
    glow: 'rgba(244, 63, 94, 0.35)',
    bubbleBg: 'rgba(244, 63, 94, 0.15)',
    bubbleBorder: 'rgba(244, 63, 94, 0.5)',
    bubbleColor: '#FB7185',
  }
};

const defaultColorConfig = colorMap.lime;

export default function GlassIcons({ items, className = '', colorful = true }: GlassIconsProps) {
  return (
    <div className={`glass-icons-container ${className}`}>
      {items.map((item, index) => {
        const colorKey = item.color ? item.color.toLowerCase() : 'lime';
        const colorConfig = colorful && colorMap[colorKey] ? colorMap[colorKey] : defaultColorConfig;
        const displayTitle = item.title || item.label;

        const customStyle: React.CSSProperties = {
          ['--glow-color' as any]: colorConfig.glow,
          ['--bubble-bg' as any]: colorConfig.bubbleBg,
          ['--bubble-border' as any]: colorConfig.bubbleBorder,
          ['--bubble-color' as any]: colorConfig.bubbleColor,
        };

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={`glass-icon-card cursor-pointer group ${item.customClass || ''}`}
            style={customStyle}
            onClick={item.onClick}
          >
            {/* Ambient Backlight */}
            <div 
              className="glass-icon-glow" 
              style={{ backgroundColor: colorConfig.bubbleColor }} 
            />

            {/* 3D Glass Icon Bubble */}
            <div className="glass-icon-bubble text-white">
              {item.icon}
            </div>

            {/* Title & Description Content */}
            {displayTitle && (
              <h3 className="font-display font-bold text-2xl leading-tight mb-2.5 text-white uppercase tracking-tight group-hover:text-white transition-colors">
                {displayTitle}
              </h3>
            )}

            {item.description && (
              <p className="text-xs text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
                {item.description}
              </p>
            )}

            {/* Subtle bottom badge or label if only label provided */}
            {!item.description && item.label && !item.title && (
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">
                {item.label}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export { GlassIcons };
