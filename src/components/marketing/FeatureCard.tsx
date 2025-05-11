
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
    <div className="rounded-xl overflow-hidden bg-white border border-realtor-100 shadow-lg h-full transition-transform duration-300 hover:scale-[1.02] group max-w-xs mx-auto">
      <div className="relative h-[200px]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white z-10"></div>
        <img 
          src={imagePath} 
          alt={title.replace(/<[^>]*>/g, '')}
          className="w-full object-cover h-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 
          className="text-xl font-bold mb-3 text-gray-900"
          dangerouslySetInnerHTML={{ __html: title }}
        ></h3>
        <p className="text-gray-600 text-sm">{enhancedDescription}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
