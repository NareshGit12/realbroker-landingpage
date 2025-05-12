
import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  imagePath: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imagePath }) => {
  // Keep descriptions brief but consistent
  const truncateDescription = (text: string): string => {
    // Shorten description to around 100 characters max
    if (text.length > 100) {
      return text.substring(0, 100) + "...";
    }
    return text;
  };

  const enhancedDescription = truncateDescription(description);

  return (
    <div className="rounded-xl overflow-hidden bg-white border border-realtor-100 shadow-lg h-full transition-transform duration-300 hover:scale-[1.02] group mx-auto">
      <div className="relative h-[300px]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white z-10"></div>
        <img 
          src={imagePath} 
          alt={title.replace(/<[^>]*>/g, '')}
          className="w-full object-contain h-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis font-playfair" dangerouslySetInnerHTML={{ __html: title }}></h3>
        <p className="text-gray-600 text-sm min-h-[40px]">{enhancedDescription}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
