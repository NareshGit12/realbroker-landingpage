
import React from 'react';
import RevealAnimation from '@/components/ui/RevealAnimation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const FinalCTA: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <section className="py-12 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <RevealAnimation>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 font-playfair">
              Ready to <span className="text-realtor-600">Elevate Your Business</span>?
            </h2>
          </RevealAnimation>
          
          <RevealAnimation delay={100}>
            <p className="text-gray-600 text-lg mb-8">
              Join Bangalore's exclusive broker network and start growing your real estate business today.
            </p>
          </RevealAnimation>
          
          <RevealAnimation delay={200}>
            <Button 
              onClick={() => scrollToSection('invite')}
              className="bg-realtor-600 hover:bg-realtor-700 text-white px-8 py-6 rounded-lg text-lg"
            >
              Request Your Invitation <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
