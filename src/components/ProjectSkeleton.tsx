import { BentoCard } from './BentoCard';

interface ProjectSkeletonProps {
  className?: string;
}

export function ProjectSkeleton({ className = "h-full min-h-[300px]" }: ProjectSkeletonProps) {
  return (
    <BentoCard className={`relative overflow-hidden bg-neutral-900 border border-neutral-800 rounded-[2rem] p-8 flex flex-col justify-between ${className}`} staggered={true}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      
      {/* Top category badge & icon placeholder */}
      <div className="flex justify-between items-start relative z-10">
        <div className="h-6 w-24 bg-neutral-800 rounded-full animate-pulse border border-neutral-700/50" />
        <div className="w-10 h-10 bg-neutral-800 rounded-full animate-pulse border border-neutral-700/50" />
      </div>

      {/* Middle preview placeholder */}
      <div className="my-auto py-6 relative z-10 flex flex-col items-center justify-center gap-2">
        <div className="w-12 h-12 rounded-2xl bg-neutral-800 animate-pulse border border-neutral-700/30 flex items-center justify-center">
          <div className="w-5 h-5 rounded bg-neutral-700 animate-pulse" />
        </div>
      </div>

      {/* Bottom title placeholder */}
      <div className="space-y-2 relative z-10">
        <div className="h-7 w-3/4 bg-neutral-800 rounded-lg animate-pulse" />
        <div className="h-3.5 w-1/2 bg-neutral-800/60 rounded-md animate-pulse" />
      </div>
    </BentoCard>
  );
}
