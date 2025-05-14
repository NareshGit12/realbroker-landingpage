
import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  imagePath: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imagePath }) => {
  return (
    <div className="rounded-xl overflow-hidden bg-white border border-realtor-100 shadow-md h-full transition-transform duration-300 hover:scale-[1.02] group mx-auto">
      <div className="relative h-[250px]">
        <img 
          src={imagePath} 
          alt={title.replace(/<[^>]*>/g, '')}
          className="w-full object-contain h-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-gray-900 font-playfair" dangerouslySetInnerHTML={{ __html: title }}></h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
