
import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  imagePath: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imagePath }) => {
  // Ensure descriptions are long enough to fill 3 lines minimum
  const ensureLongDescription = (text: string): string => {
    if (text.length < 120) {
      return text + " This feature is designed to enhance your real estate business experience and streamline your workflow with RealBroker's premium platform.";
    }
    return text;
  };

  const enhancedDescription = ensureLongDescription(description);

  return (
    <div className="rounded-xl overflow-hidden bg-white border border-realtor-100 shadow-lg h-full transition-transform duration-300 hover:scale-[1.02] group max-w-xs mx-auto">
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
        <h3 className="text-xl font-bold mb-3 text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">{title}</h3>
        <p className="text-gray-600 min-h-[72px]">{enhancedDescription}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
