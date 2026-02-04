import React from 'react';
import { Shield, Users, Target, Sparkles } from 'lucide-react';
import RevealAnimation from '@/components/ui/RevealAnimation';

const valueProps = [
  {
    icon: Shield,
    title: 'Vetted Agents Only',
    description: 'We only invite quality brokers. You don\'t have to worry about spam or unprofessional agents. Work with people you can trust.',
  },
  {
    icon: Users,
    title: 'More Eyes on Your Listings',
    description: 'When you post a property on RB, 50+ of the city\'s top brokers see it. They have the HNI clients you are looking for.',
  },
  {
    icon: Target,
    title: 'We Find the Buyers',
    description: 'We promote your properties on Propalyst.com for free. We find the buyers, qualify them, and bring them to you. We act as the Buyer Agent; you keep your Seller.',
  },
  {
    icon: Sparkles,
    title: 'Professional Tools in Seconds',
    description: 'Create high-end property flyers and digital profiles instantly. Make a great impression on your HNI clients without any extra work.',
  },
];

const ValuePropsSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <RevealAnimation>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-playfair mb-4">
              What RealBroker Does for <span className="text-realtor-600">You</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to close more deals and grow your business
            </p>
          </div>
        </RevealAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {valueProps.map((prop, index) => (
            <RevealAnimation key={prop.title} delay={index * 100}>
              <div className="group relative bg-white border border-border/50 rounded-2xl p-8 hover:shadow-lg hover:border-realtor-200 transition-all duration-300">
                {/* Subtle gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-realtor-50/0 to-realtor-50/0 group-hover:from-realtor-50/50 group-hover:to-transparent rounded-2xl transition-all duration-300" />
                
                <div className="relative">
                  <div className="w-14 h-14 bg-realtor-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-realtor-600 transition-colors duration-300">
                    <prop.icon className="w-7 h-7 text-realtor-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {prop.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              </div>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropsSection;
