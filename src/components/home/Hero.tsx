
import React from 'react';
import { Button } from '@/components/ui/button';
import RevealAnimation from '@/components/ui/RevealAnimation';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-subtle -z-10"></div>
      
      {/* Circle Decorations */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-red-50 blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-50 blur-3xl opacity-30 -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <RevealAnimation>
            <span className="inline-block py-1 px-3 mb-4 text-xs font-medium uppercase tracking-wider bg-realtor-100 text-realtor-800 rounded-full">
              Invitation Only
            </span>
          </RevealAnimation>
          
          <RevealAnimation delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-balance">
              Access more property supply in your market,
              <br />
              <span className="text-realtor-600">Close more deals, Grow your business</span>
            </h1>
          </RevealAnimation>
          
          <RevealAnimation delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl text-balance">
              Expand your inventory through your network
            </p>
          </RevealAnimation>
          
          <RevealAnimation delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-16"> {/* Reduced space from mb-36 to mb-16 */}
              <a href="#invite" className="w-full">
                <Button className="bg-realtor-600 hover:bg-realtor-700 text-white py-6 px-8 rounded-xl text-lg shadow-md w-full">
                  Request an Invite
                </Button>
              </a>
              <a href="#features" className="w-full">
                <Button variant="outline" className="border-realtor-200 hover:bg-realtor-50 text-realtor-800 py-6 px-8 rounded-xl text-lg w-full">
                  Learn More
                </Button>
              </a>
            </div>
          </RevealAnimation>
          
          <RevealAnimation delay={400}>
            <a 
              href="#features" 
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="mb-2">Discover More</span>
              <ArrowDown className="animate-bounce h-5 w-5" />
            </a>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default Hero;
