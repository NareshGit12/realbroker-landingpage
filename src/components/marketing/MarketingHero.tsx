import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RevealAnimation from '@/components/ui/RevealAnimation';
const MarketingHero: React.FC = () => {
  return <section className="relative min-h-[85vh] flex items-center pt-20 pb-10 bg-white">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-neutral-50 z-[-2]"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-realtor-100/20 blur-3xl z-[-1]"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-realtor-50/30 blur-3xl z-[-1]"></div>
      
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-1 gap-12 items-center">
          <div className="text-center lg:text-left">
            <RevealAnimation>
              <div className="inline-block py-1 px-3 mb-6 text-xs font-medium uppercase tracking-wider bg-realtor-50 text-realtor-600 border border-realtor-100 rounded-full">
                By Invitation Only
              </div>
            </RevealAnimation>
            
            <RevealAnimation delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight font-playfair w-full">
                <span className="text-gray-900">Elevate Your</span><br />
                <span className="text-realtor-600">Brokerage Success</span>
              </h1>
            </RevealAnimation>
            
            <RevealAnimation delay={200}>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                Join Bangalore's exclusive network of elite real estate brokers. 
                Share inventory, discover collaborations, and close high-value deals faster.
              </p>
            </RevealAnimation>
            
            <RevealAnimation delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
                <a href="#request-invite" className="w-full">
                  <Button className="bg-realtor-600 hover:bg-realtor-700 text-white py-6 px-8 rounded-xl text-lg shadow-md w-full transition-all duration-300 hover:scale-105">
                    Request Your Invitation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </RevealAnimation>
          </div>
          
          <RevealAnimation direction="right" delay={400}>
            <div className="relative">
              <div className="transform rotate-[-5deg] origin-center">
                <div className="absolute -inset-1 bg-gradient-to-r from-realtor-300/30 to-realtor-500/30 rounded-2xl blur-sm"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-realtor-100">
                  <img src="https://ayxhtlzyhpsjykxxnqqh.supabase.co/storage/v1/object/public/public/screens/1a_dash_top.png" alt="RealBroker Dashboard" className="w-full h-auto" loading="lazy" />
                </div>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>;
};
export default MarketingHero;