import { BentoCard } from './BentoCard';
import { motion } from 'motion/react';

const skills = [
  { name: 'Photoshop', percentage: 95 },
  { name: 'Illustrator', percentage: 90 },
  { name: 'Figma', percentage: 92 },
  { name: 'React', percentage: 75 },
  { name: 'Next.js', percentage: 70 },
  { name: 'AI Tools', percentage: 98 }
];

export function TechStackCard({ className = "" }: { className?: string }) {
  return (
    <BentoCard className={`p-8 flex flex-col relative group overflow-hidden ${className}`} staggered={true}>
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/20 to-neutral-900/50 backdrop-blur-md z-0 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <h3 className="font-display font-bold text-2xl mb-8 text-white uppercase tracking-tighter">Tech Stack</h3>
        <div className="flex flex-col gap-5 flex-1 justify-center">
          {skills.map((skill, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                <span className="text-white">{skill.name}</span>
              </div>
              <div className="w-full bg-neutral-800/80 rounded-full h-1.5 overflow-hidden border border-neutral-800">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.1 * index, ease: "easeOut" }}
                  className="bg-[#D1FF52] h-full rounded-full"
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
