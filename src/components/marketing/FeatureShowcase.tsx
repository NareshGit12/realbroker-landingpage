
import React from 'react';
import FeatureCard from './FeatureCard';
import RevealAnimation from '@/components/ui/RevealAnimation';

const FeatureShowcase: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <RevealAnimation>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Elite Brokers
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={100}>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform provides the tools and connections you need to elevate your real estate business.
            </p>
          </RevealAnimation>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon="/lovable-uploads/4f63dd9f-6196-43d3-af90-96aa480244c9.png"
            title="Property Matchmaking"
            description="Our smart algorithm connects your buyers with the perfect properties from trusted partner brokers."
          />
          <FeatureCard 
            icon="/lovable-uploads/20059da1-2ba0-441c-9054-9453f4454710.png"
            title="Secure Transaction Hub"
            description="Manage offers, negotiations and closings in one secure digital environment with complete audit trails."
          />
          <FeatureCard 
            icon="/lovable-uploads/0727a7dd-20d3-4c42-a4e5-4631797ba805.png"
            title={<>Professional <span className="text-[#ea384c]">Branding</span> Pages</>}
            description="Showcase your expertise with customizable profile pages that highlight your success and specialties."
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
