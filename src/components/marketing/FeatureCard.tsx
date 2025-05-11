
import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  imagePath: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imagePath }) => {
  return (
    <div className="rounded-xl overflow-hidden bg-white border border-realtor-100 shadow-lg h-full transition-transform duration-300 hover:scale-[1.02] group">
      <div className="relative h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white z-10"></div>
        <img 
          src={imagePath} 
          alt={title}
          className="w-full object-contain h-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
