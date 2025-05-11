
import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  imagePath: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imagePath }) => {
  // Keep descriptions brief but consistent
  const truncateDescription = (text: string): string => {
    // Shorten description to around 80 characters max for better fit
    if (text.length > 80) {
      return text.substring(0, 80) + "...";
    }
    return text;
  };

  const enhancedDescription = truncateDescription(description);

  return (
    <div className="rounded-xl overflow-hidden bg-white border border-realtor-100 shadow-lg h-full transition-transform duration-300 hover:scale-[1.02] group max-w-xs mx-auto">
      <div className="relative h-[250px]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white z-10"></div>
        <img 
          src={imagePath} 
          alt={title}
          className="w-full object-contain h-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <h3 className="text-base font-bold mb-1 text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">{title}</h3>
        <p className="text-xs text-gray-600 min-h-[30px]">{enhancedDescription}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
