import React from 'react';
import { MapPin, Github, Linkedin, Facebook, Instagram } from 'lucide-react';
import { BatchMate } from '../types/BatchMate';

interface BatchMateCardProps {
  mate: BatchMate;
  onClick: (mate: BatchMate) => void;
  onMouseEnter: (id: number) => void;
  onMouseLeave: () => void;
  index: number;
}

const BatchMateCard: React.FC<BatchMateCardProps> = ({ 
  mate, 
  onClick, 
  onMouseEnter, 
  onMouseLeave, 
  index 
}) => {
  const SocialIcon = ({ platform, url }: { platform: string; url?: string }) => {
    if (!url) return null;
    
    const icons = {
      instagram: Instagram,
      facebook: Facebook,
      linkedin: Linkedin,
      github: Github,
    };
    
    const Icon = icons[platform as keyof typeof icons];
    
    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-all duration-200 group"
      >
        <Icon size={16} className="text-zinc-600 group-hover:text-zinc-800 transition-colors duration-200" />
      </a>
    );
  };

  return (
    <div
      onClick={() => onClick(mate)}
      onMouseEnter={() => onMouseEnter(mate.id)}
      onMouseLeave={onMouseLeave}
      className="group cursor-pointer slide-up-animation"
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      <div className="relative bg-gradient-to-b from-zinc-900/30 to-zinc-900/20 backdrop-blur-md border border-zinc-800/50 hover:border-zinc-700/70 transition-all duration-300 overflow-hidden h-full">
        {/* Content */}
        <div className="relative p-6">
          {/* Profile Section */}
          <div className="mb-6">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <img
                src={mate.picture}
                alt={mate.name}
                className="w-full h-full object-cover rounded-full border-2 border-zinc-700 group-hover:border-zinc-600 transition-colors duration-300"
              />
            </div>
            <div className="text-center">
              <h3 className="text-white font-medium text-lg mb-1 group-hover:text-zinc-200 transition-colors duration-300">
                {mate.name}
              </h3>
              <p className="text-zinc-400 text-sm font-light">
                {mate.profession}
              </p>
            </div>
          </div>
          {/* Minimal Info */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center text-zinc-500 text-sm">
              <MapPin size={14} className="mr-2 flex-shrink-0" />
              <span className="font-light truncate">{mate.location}</span>
            </div>
          </div>
          {/* Social Links */}
          <div className="flex justify-center space-x-3">
            {Object.entries(mate.socialMedia).map(([platform, url]) => (
              <SocialIcon key={platform} platform={platform} url={url} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchMateCard;