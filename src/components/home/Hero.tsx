
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import RevealAnimation from '@/components/ui/RevealAnimation';
import { ArrowDown } from 'lucide-react';
import { getHeadingVariant, HeadingVariant } from '@/utils/abTesting';

const Hero: React.FC = () => {
  const [headingVariant, setHeadingVariant] = useState<HeadingVariant | null>(null);
  
  // Load a new heading variant on each component mount
  useEffect(() => {
    setHeadingVariant(getHeadingVariant());
  }, []);
  
  if (!headingVariant) {
    return null; // Don't render until we have a heading variant
  }

  return (
    <section className="relative min-h-[85vh] flex items-center pt-20 pb-10">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-subtle -z-10"></div>
      
      {/* Circle Decorations */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-red-50 blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-50 blur-3xl opacity-30 -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <RevealAnimation>
            <span className="inline-block py-1 px-3 mb-4 text-xs font-medium uppercase tracking-wider bg-realtor-100 text-realtor-800 rounded-full">
              By Invitation Only
            </span>
          </RevealAnimation>
          
          <RevealAnimation delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-balance">
              {headingVariant.title}
              <br />
              <span className="text-realtor-600">{headingVariant.subtitle}</span>
            </h1>
          </RevealAnimation>
          
          <RevealAnimation delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl text-balance">
              {headingVariant.description}
            </p>
          </RevealAnimation>
          
          <RevealAnimation delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-8 sm:justify-center">
              <a href="#invite" className="w-full sm:w-auto sm:flex-1">
                <Button className="bg-realtor-600 hover:bg-realtor-700 text-white py-6 px-8 rounded-xl text-lg shadow-md w-full">
                  Request an Invite
                </Button>
              </a>
              <a href="#features" className="w-full sm:w-auto sm:flex-1">
                <Button variant="outline" className="border-realtor-200 hover:bg-realtor-50 text-realtor-800 py-6 px-8 rounded-xl text-lg w-full">
                  Learn More
                </Button>
              </a>
            </div>
          </RevealAnimation>
          
          <RevealAnimation delay={400}>
            <div className="mt-2 mb-0 text-center">
              <a 
                href="#features" 
                className="flex flex-col items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="mb-2">Discover More</span>
                <ArrowDown className="animate-bounce h-5 w-5" />
              </a>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default Hero;
