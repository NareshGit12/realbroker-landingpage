
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RevealAnimation from '@/components/ui/RevealAnimation';

const MarketingHero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-20 pb-10 bg-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-neutral-50 z-[-2]"></div>
      
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="flex flex-col items-center justify-center gap-8 md:gap-12">
          <div className="text-center w-full max-w-3xl mx-auto">
            <RevealAnimation>
              <div className="inline-block py-1 px-3 mb-6 text-xs font-medium uppercase tracking-wider bg-realtor-50 text-realtor-600 border border-realtor-100 rounded-full">
                By Invitation Only
              </div>
            </RevealAnimation>
            
            <RevealAnimation delay={100}>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight font-playfair">
                <span className="text-gray-900">Elevate Your</span>
                <br className="hidden sm:block" />
                <span className="text-realtor-600">Brokerage Success</span>
              </h1>
            </RevealAnimation>
            
            <RevealAnimation delay={200}>
              <p className="text-lg md:text-xl text-gray-600 mb-8 mx-auto max-w-2xl">
                Join Bangalore's exclusive network of elite real estate brokers. 
                Share inventory, discover collaborations, and close high-value deals faster.
              </p>
            </RevealAnimation>
            
            <RevealAnimation delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mx-auto max-w-md">
                <a href="#request-invite" className="w-full sm:w-auto">
                  <Button className="bg-realtor-600 hover:bg-realtor-700 text-white py-4 sm:py-6 px-4 sm:px-8 rounded-xl text-base sm:text-lg shadow-md w-full transition-all duration-300 hover:scale-105">
                    Request Your Invitation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </RevealAnimation>
          </div>
          
          <RevealAnimation delay={400}>
            <div className="w-full max-w-[1200px] px-2 sm:px-4 md:px-6">
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src="https://ayxhtlzyhpsjykxxnqqh.supabase.co/storage/v1/object/public/public/screens/main-hero.png" 
                  alt="RealBroker Dashboard" 
                  className="w-full h-auto" 
                  loading="lazy" 
                />
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default MarketingHero;
