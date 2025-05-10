
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
    <section className="py-20 bg-gradient-to-b from-deep-navy to-dark-charcoal relative">
      {/* Background accent */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gold/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <RevealAnimation direction="left">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-deep-teal/20 rounded-full blur-sm"></div>
              <div className="relative rounded-full overflow-hidden border border-white/10 shadow-premium aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1551816230-ef5d99548907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2564&q=80"
                  alt="Elite Brokers Network" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-dark-charcoal border border-gold/30 rounded-lg p-4 shadow-premium">
                <div className="text-gold font-bold text-4xl">100</div>
                <div className="text-white text-sm">Elite Brokers</div>
              </div>
            </div>
          </RevealAnimation>
          
          <div>
            <RevealAnimation>
              <div className="inline-block py-1 px-3 mb-6 text-xs font-medium uppercase tracking-wider bg-gold/20 text-gold border border-gold/30 rounded-full">
                Exclusive Membership
              </div>
            </RevealAnimation>
            
            <RevealAnimation delay={100}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-playfair">
                The Elite Network for <span className="text-gold">Bangalore's Top Brokers</span>
              </h2>
            </RevealAnimation>
            
            <RevealAnimation delay={200}>
              <p className="text-neutral-gray text-lg mb-8">
                RealBroker is an exclusive, invite-only platform designed specifically for the top 100 high-end residential real estate brokers in Bangalore.
              </p>
            </RevealAnimation>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <RevealAnimation key={index} delay={300 + (index * 50)}>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-gold/20 p-1 text-gold">
                      <Check className="h-4 w-4" />
                    </div>
                    <p className="text-white">{benefit}</p>
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
