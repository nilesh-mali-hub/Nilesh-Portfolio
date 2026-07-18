import { User } from 'lucide-react';
import { BentoCard } from './BentoCard';

interface ProfileCardProps {
  name: string;
  avatarUrl?: string;
  bio: string;
  location?: string;
  className?: string;
}

export function ProfileCard({ name, avatarUrl, bio, location, className = "" }: ProfileCardProps) {
  const formattedName = name.split(' ').map((part, i) => (
    <span key={i}>
      {part}
      {i < name.split(' ').length - 1 && <br />}
    </span>
  ));

  return (
    <BentoCard className={`p-8 ${className}`} staggered={true}>
      {avatarUrl ? (
        <img 
          src={avatarUrl} 
          alt={name} 
          className="w-12 h-12 rounded-full mb-6 object-cover border border-neutral-800"
        />
      ) : (
        <User className="w-6 h-6 mb-6 text-[#D1FF52]" />
      )}
      <h2 className="font-display font-bold text-3xl leading-none mb-4 text-white tracking-tighter uppercase">
        {formattedName}
      </h2>
      <p className="text-sm text-neutral-400 mb-4 font-medium leading-relaxed">
        {bio}
      </p>
      {location && (
        <p className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">{location}</p>
      )}
    </BentoCard>
  );
}
