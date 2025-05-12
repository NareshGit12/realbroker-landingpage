
import React from 'react';
import { Check } from 'lucide-react';
import RevealAnimation from '@/components/ui/RevealAnimation';

const EliteNetwork: React.FC = () => {
  const benefits = [
    "Access to high-end, exclusive property inventory",
    "Collaboration with Bangalore's top 100 real estate professionals",
    "Increased deal flow and faster closings",
    "Enhanced professional reputation and brand visibility",
    "Digital tools that streamline your entire workflow",
    "Priority access to new features and premium support"
  ];

  return (
    <section className="py-12 bg-white relative">
      {/* Background accent */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-realtor-50/30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <RevealAnimation direction="left">
            <div className="relative flex justify-center">
              <div className="relative rounded-full overflow-hidden w-[70%] aspect-square bg-white">
                <img 
                  src="https://ayxhtlzyhpsjykxxnqqh.supabase.co/storage/v1/object/public/public/RBlogo/emblem_cropped.png"
                  alt="RealBroker Logo" 
                  className="w-full h-full object-contain p-6"
                  loading="lazy"
                />
              </div>
              {/* Removed the "100 Elite Brokers" text element */}
            </div>
          </RevealAnimation>
          
          <div>
            <RevealAnimation>
              <div className="inline-block py-1 px-3 mb-6 text-xs font-medium uppercase tracking-wider bg-realtor-50 text-realtor-600 border border-realtor-100 rounded-full">
                Exclusive Membership
              </div>
            </RevealAnimation>
            
            <RevealAnimation delay={100}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 font-playfair">
                The Elite Network for <span className="text-realtor-600">Bangalore's Top Brokers</span>
              </h2>
            </RevealAnimation>
            
            <RevealAnimation delay={200}>
              <p className="text-gray-600 text-lg mb-8">
                RealBroker is an exclusive, invite-only platform designed specifically for the top 100 high-end residential real estate brokers in Bangalore.
              </p>
            </RevealAnimation>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <RevealAnimation key={index} delay={300 + (index * 50)}>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-realtor-50 p-1 text-realtor-600">
                      <Check className="h-4 w-4" />
                    </div>
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                </RevealAnimation>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EliteNetwork;
