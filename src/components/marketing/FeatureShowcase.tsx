
import React from 'react';
import RevealAnimation from '@/components/ui/RevealAnimation';
import FeatureCard from '@/components/marketing/FeatureCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FeatureShowcase: React.FC = () => {
  const features = [
    {
      title: "Professional Branding Pages",
      description: "Showcase yourself with a sleek, customizable broker profile designed to impress clients and partners.",
      imagePath: "https://ayxhtlzyhpsjykxxnqqh.supabase.co/storage/v1/object/public/public/screens/2a_bro_profile_top.png",
      delay: 0,
      slanted: true
    },
    {
      title: "Rich Property Flyers",
      description: "Effortlessly create elegant, branded property marketing materials that stand out and close deals.",
      imagePath: "https://ayxhtlzyhpsjykxxnqqh.supabase.co/storage/v1/object/public/public/screens/mobile/Mobile_flyer.png",
      delay: 200
    },
    {
      title: "Browse Network Properties",
      description: " Access a clean, easily searchable directory of exclusive properties shared by other brokers within the network.",
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
      title: "Quick Create Broker-to-Broker Agreements",
      description: "Streamline your deal process with digital agreements that save time and increase efficiency.",
      imagePath: "https://ayxhtlzyhpsjykxxnqqh.supabase.co/storage/v1/object/public/public/screens/mobile/mobile_b2b%20agreement.png",
      delay: 200
    }
  ];

  // First feature with slanted design
  const firstFeature = features[0];
  
  // Rest of the features for the carousel
  const remainingFeatures = features.slice(1);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-realtor-100/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-realtor-50/30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <RevealAnimation>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
              <span className="text-gray-900">Powerful Features for</span>
              <span className="text-realtor-600"> Elite Brokers</span>
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={100}>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              RealBroker empowers you with tools designed specifically for high-end real estate professionals.
              Close more deals, faster, with less effort.
            </p>
          </RevealAnimation>
        </div>
        
        {/* Slanted first feature */}
        <div className="mb-24">
          <RevealAnimation>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">{firstFeature.title}</h3>
                <p className="text-gray-600 mb-6">{firstFeature.description}</p>
              </div>
              <div className="transform rotate-[-5deg] origin-center">
                <div className="relative rounded-xl overflow-hidden shadow-lg border border-realtor-100">
                  <img 
                    src={firstFeature.imagePath} 
                    alt={firstFeature.title}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </RevealAnimation>
        </div>
        
        {/* Carousel with navigation for remaining features */}
        <div className="mt-16 relative">
          <div className="text-center mb-4">
            <span className="text-sm text-gray-500">Swipe or use arrows to navigate</span>
          </div>
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {remainingFeatures.map((feature, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <RevealAnimation delay={feature.delay}>
                    <FeatureCard
                      title={feature.title}
                      description={feature.description}
                      imagePath={feature.imagePath}
                    />
                  </RevealAnimation>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="relative h-10 w-10 rounded-full bg-white border-realtor-200 hover:bg-realtor-50 static transform-none mr-2" />
              <CarouselNext className="relative h-10 w-10 rounded-full bg-white border-realtor-200 hover:bg-realtor-50 static transform-none ml-2" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
