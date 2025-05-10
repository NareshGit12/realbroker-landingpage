
import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  imagePath: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imagePath }) => {
  return (
    <div className="rounded-xl overflow-hidden bg-gradient-to-br from-deep-navy/80 to-dark-charcoal border border-white/10 shadow-premium h-full transition-transform duration-300 hover:scale-[1.02] group">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-transparent to-transparent z-10"></div>
        <img 
          src={imagePath} 
          alt={title}
          className="w-full object-cover h-64 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-neutral-gray">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
