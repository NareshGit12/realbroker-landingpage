
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FeatureCardProps {
  title: string;
  description: string;
  imagePath: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imagePath }) => {
  // Keep descriptions brief but consistent
  const truncateDescription = (text: string): string => {
    // Shorten description to around 60 characters max for better fit
    if (text.length > 60) {
      return text.substring(0, 60) + "...";
    }
    return text;
  };

  const enhancedDescription = truncateDescription(description);

  return (
    <div className="rounded-xl overflow-hidden bg-white border border-realtor-100 shadow-lg h-full transition-transform duration-300 hover:scale-[1.02] group max-w-xs mx-auto">
      <div className="relative h-[200px]">
        <ScrollArea className="h-full">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white z-10"></div>
            <img 
              src={imagePath} 
              alt={title}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </ScrollArea>
      </div>
      <div className="p-2">
        <h3 className="text-sm font-bold mb-1 text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">{title}</h3>
        <p className="text-xs text-gray-600 min-h-[24px]">{enhancedDescription}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
