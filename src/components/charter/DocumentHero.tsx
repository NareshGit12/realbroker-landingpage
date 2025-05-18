
import React from 'react';

interface DocumentHeroProps {
  title: string;
  subtitle: string;
  logoUrl?: string;
  description?: string;
}

const DocumentHero: React.FC<DocumentHeroProps> = ({
  title,
  subtitle,
  logoUrl = "https://ayxhtlzyhpsjykxxnqqh.supabase.co/storage/v1/object/public/public/RBlogo/emblem_cropped.png",
  description
}) => {
  return (
    <div className="pt-28 pb-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{title}</h1>
              <p className="text-xl text-gray-600">{subtitle}</p>
            </div>
            <div className="hidden md:block">
              <img 
                src={logoUrl}
                alt="RealBroker Badge" 
                className="w-24 h-24"
              />
            </div>
          </div>
          {description && (
            <p className="text-lg text-gray-600">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentHero;
