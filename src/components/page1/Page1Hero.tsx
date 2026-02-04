import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import RevealAnimation from '@/components/ui/RevealAnimation';
import MemberCarousel from './MemberCarousel';

const Page1Hero: React.FC = () => {
  const scrollToForm = () => {
    const element = document.getElementById('request-access');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[75vh] flex items-center justify-center pt-24 pb-8 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-realtor-50/30 to-white -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-realtor-100/40 blur-3xl -z-10" />
      <div className="absolute bottom-1/3 left-1/6 w-72 h-72 rounded-full bg-realtor-50/50 blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <RevealAnimation>
            <span className="inline-block py-2 px-4 mb-6 text-xs font-semibold uppercase tracking-widest bg-realtor-100 text-realtor-700 rounded-full border border-realtor-200">
              Invite-Only Network
            </span>
          </RevealAnimation>
          
          <RevealAnimation delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-foreground font-playfair leading-tight">
              Close More{' '}
              <span className="text-realtor-600">"Side-by-Side"</span> Deals
              <br />
              with Bangalore's Best Brokers
            </h1>
          </RevealAnimation>
          
          <RevealAnimation delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed text-center">
              Join an exclusive, invite-only network of top-quality agents. No spam, no fake listings. 
              Just real inventory and real buyers.
            </p>
          </RevealAnimation>
          
          <RevealAnimation delay={300}>
            <div className="flex flex-col items-center">
              <Button 
                onClick={scrollToForm}
                size="lg"
                className="bg-realtor-600 hover:bg-realtor-700 text-white px-8 py-6 md:px-10 md:py-7 rounded-xl text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Apply to Join the Network
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              {/* Member Carousel */}
              <div className="mt-8 w-full max-w-2xl">
                <MemberCarousel />
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default Page1Hero;
