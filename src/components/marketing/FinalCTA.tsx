
import React from 'react';
import { ArrowRight } from 'lucide-react';
import RevealAnimation from '@/components/ui/RevealAnimation';

const FinalCTA: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <RevealAnimation>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Elevate Your Business?</h2>
          </RevealAnimation>
          <RevealAnimation delay={100}>
            <p className="text-lg text-muted-foreground mb-8 mx-auto max-w-2xl">
              Join Bangalore's exclusive network of elite real estate brokers today and start
              transforming the way you collaborate and close deals.
            </p>
          </RevealAnimation>
          <RevealAnimation delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mx-auto max-w-md">
              <a href="#invite" className="w-full sm:w-auto">
                <button className="bg-realtor-600 hover:bg-realtor-700 text-white py-4 sm:py-6 px-8 rounded-xl text-base sm:text-lg font-medium shadow-md w-full transition-all duration-300 hover:scale-105 flex items-center justify-center">
                  Request an Invitation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </a>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
