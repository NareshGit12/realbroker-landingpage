
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  imagePath: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imagePath }) => {
  const [isImageOpen, setIsImageOpen] = useState(false);

  return (
    <>
      {/* Image Popup/Modal */}
      {isImageOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setIsImageOpen(false)}>
          <div className="relative max-w-4xl w-full h-auto">
            <button 
              className="absolute top-2 right-2 bg-white/20 hover:bg-white/40 rounded-full p-1 text-white"
              onClick={(e) => {
                e.stopPropagation();
                setIsImageOpen(false);
              }}
            >
              <X className="h-6 w-6" />
            </button>
            <img 
              src={imagePath} 
              alt={title.replace(/<[^>]*>/g, '')} 
              className="max-h-[80vh] max-w-full object-contain mx-auto rounded-md"
            />
          </div>
        </div>
      )}

      {/* Feature Card */}
      <div className="rounded-xl overflow-hidden bg-white border border-realtor-100 shadow-md h-full transition-transform duration-300 hover:scale-[1.02] group mx-auto">
        <div 
          className="relative h-[250px] cursor-pointer" 
          onClick={() => setIsImageOpen(true)}
        >
          <img 
            src={imagePath} 
            alt={title.replace(/<[^>]*>/g, '')}
            className="w-full object-contain h-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/5 hover:bg-black/0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <span className="bg-white/90 text-realtor-600 px-3 py-1 rounded-full text-sm font-medium">
              Click to enlarge
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold mb-2 text-gray-900 font-playfair" dangerouslySetInnerHTML={{ __html: title }}></h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </>
  );
};

export default FeatureCard;
