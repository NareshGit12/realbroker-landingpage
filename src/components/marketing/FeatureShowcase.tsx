import React from 'react';
import RevealAnimation from '@/components/ui/RevealAnimation';
import FeatureCard from '@/components/marketing/FeatureCard';
import { useIsMobile } from '@/hooks/use-mobile';

const FeatureShowcase: React.FC = () => {
  const isMobile = useIsMobile();
  
  const features = [
    {
      title: "Professional <span class='text-realtor-600'>Branding</span> Pages",
      description: "Showcase yourself with a sleek, customizable broker profile designed to impress clients and partners.",
      imagePath: "https://ayxhtlzyhpsjykxxnqqh.supabase.co/storage/v1/object/public/public/screens/2a_bro_profile_top.png",
      delay: 0,
      slanted: true
    },
    {
      title: "Rich Property Flyers",
      description: "Effortlessly create elegant, branded property marketing materials that stand out.",
      imagePath: "https://ayxhtlzyhpsjykxxnqqh.supabase.co/storage/v1/object/public/public/screens/mobile/Mobile_flyer.png",
      delay: 200
    },
    {
      title: "Browse Network Properties",
      description: "Access a clean, easily searchable directory of exclusive properties shared by other brokers.",
      imagePath: "https://ayxhtlzyhpsjykxxnqqh.supabase.co/storage/v1/object/public/public/screens/mobile/mobile_net_prop.png",
      delay: 0
    },
    {
      title: "Connect with Other Brokers",
      description: "Experience seamless communication with top-tier professionals in Bangalore's real estate market.",
      imagePath: "https://ayxhtlzyhpsjykxxnqqh.supabase.co/storage/v1/object/public/public/screens/mobile/mobile_network.png",
      delay: 100
    },
    {
      title: "Quick Create Broker Agreements",
      description: "Streamline your deal process with digital agreements that save time and increase efficiency.",
      imagePath: "https://ayxhtlzyhpsjykxxnqqh.supabase.co/storage/v1/object/public/public/screens/mobile/mobile_b2b%20agreement.png",
      delay: 200
    }
  ];

  // First feature with slanted design
  const firstFeature = features[0];
  
  // Rest of the features for the grid layout
  const remainingFeatures = features.slice(1);

  return (
    <section className="py-8 bg-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-realtor-100/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-realtor-50/30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-6">
          <RevealAnimation>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 font-playfair">
              <span className="text-gray-900">Powerful Features for</span>
              <span className="text-realtor-600"> Elite Brokers</span>
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={100}>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              RealBroker empowers you with tools designed specifically for high-end real estate professionals.
            </p>
          </RevealAnimation>
        </div>
        
        {/* First feature - improved balanced layout */}
        <div className="mb-8 max-w-6xl mx-auto">
          <RevealAnimation>
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Text content - balanced width on desktop */}
              <div className="lg:w-2/5 space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold font-playfair" dangerouslySetInnerHTML={{ __html: firstFeature.title }}></h3>
                <p className="text-gray-700 md:text-lg">{firstFeature.description}</p>
              </div>
              
              {/* Image - balanced width on desktop */}
              <div className="lg:w-3/5 mt-4 lg:mt-0">
                <img 
                  src={firstFeature.imagePath} 
                  alt={firstFeature.title.replace(/<[^>]*>/g, '')}
                  className="w-full rounded-lg object-contain shadow-md"
                  loading="lazy"
                />
              </div>
            </div>
          </RevealAnimation>
        </div>
        
        {/* Grid section replacing carousel */}
        <div className="mt-10 relative max-w-6xl mx-auto">
          <RevealAnimation>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center font-playfair">
              <span className="text-gray-900">Tools to </span>
              <span className="text-realtor-600">Elevate Your Brokerage</span>
            </h2>
          </RevealAnimation>
          
          <div className="grid md:grid-cols-2 gap-6">
            {remainingFeatures.map((feature, index) => (
              <RevealAnimation key={index} delay={feature.delay}>
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  imagePath={feature.imagePath}
                />
              </RevealAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
