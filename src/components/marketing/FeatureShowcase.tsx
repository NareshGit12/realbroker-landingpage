
import React from 'react';
import RevealAnimation from '@/components/ui/RevealAnimation';
import FeatureCard from '@/components/marketing/FeatureCard';

const FeatureShowcase: React.FC = () => {
  const features = [
    {
      title: "Professional Branding Pages",
      description: "Showcase yourself with a sleek, customizable broker profile designed to impress clients and partners.",
      imagePath: "https://ayxhtlzyhpsjykxxnqqh.supabase.co/storage/v1/object/public/public/screens/2a_bro_profile_top.png",
      delay: 0
    },
    {
      title: "Streamlined Communications Dashboard",
      description: "Post requirements and stay updated with what your elite network is discussing.",
      imagePath: "https://ayxhtlzyhpsjykxxnqqh.supabase.co/storage/v1/object/public/public/screens/2-Dash_board.png",
      delay: 100
    },
    {
      title: "Rich Property Flyers",
      description: "Create elegant, branded property marketing materials that stand out and close deals.",
      imagePath: "https://ayxhtlzyhpsjykxxnqqh.supabase.co/storage/v1/object/public/public/screens/3-Property_Flyer.png",
      delay: 200
    },
    {
      title: "Browse Network Properties",
      description: "Access a clean, searchable directory of exclusive properties from other elite brokers.",
      imagePath: "https://ayxhtlzyhpsjykxxnqqh.supabase.co/storage/v1/object/public/public/screens/4-Broker_network.png",
      delay: 0
    },
    {
      title: "Connect with Other Brokers",
      description: "Experience seamless communication with top-tier professionals in Bangalore's real estate market.",
      imagePath: "https://ayxhtlzyhpsjykxxnqqh.supabase.co/storage/v1/object/public/public/screens/5-network_properties.png",
      delay: 100
    },
    {
      title: "Quick Create Broker-to-Broker Agreements",
      description: "Streamline your deal process with digital agreements that save time and increase efficiency.",
      imagePath: "https://ayxhtlzyhpsjykxxnqqh.supabase.co/storage/v1/object/public/public/screens/6-Broker_Agreements.png",
      delay: 200
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-deep-navy via-dark-charcoal to-deep-navy relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-deep-teal/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gold/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <RevealAnimation>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
              <span className="text-white">Powerful Features for</span>
              <span className="text-gold"> Elite Brokers</span>
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={100}>
            <p className="text-neutral-gray text-lg max-w-3xl mx-auto">
              RealBroker empowers you with tools designed specifically for high-end real estate professionals.
              Close more deals, faster, with less effort.
            </p>
          </RevealAnimation>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
          {features.map((feature, index) => (
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
    </section>
  );
};

export default FeatureShowcase;
