
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  imagePath: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imagePath }) => {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

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
          className="relative h-[250px] overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={() => setIsImageOpen(true)}
        >
          {/* Preview Image - Widened to ensure it fills the container width */}
          <img 
            src={imagePath} 
            alt={title.replace(/<[^>]*>/g, '')}
            className="w-[120%] max-w-none object-cover h-full transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: 'center top' }}
            loading="lazy"
          />
          
          {/* Mouseover Zoom Effect Overlay */}
          {isHovering && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300">
              <div className="max-h-[80vh] max-w-[90%] relative">
                <img 
                  src={imagePath} 
                  alt={title.replace(/<[^>]*>/g, '')} 
                  className="max-h-[60vh] max-w-full object-contain mx-auto rounded-md border-2 border-white/30"
                />
                <p className="absolute bottom-2 left-0 right-0 text-center text-white text-xs">
                  Click to view full size
                </p>
              </div>
            </div>
          )}
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
