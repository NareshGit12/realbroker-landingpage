
import React from 'react';
import RevealAnimation from '@/components/ui/RevealAnimation';

interface StepProps {
  number: number;
  title: string;
  description: string;
  delay: number;
}

const Step: React.FC<StepProps> = ({ number, title, description, delay }) => (
  <RevealAnimation delay={delay}>
    <div className="relative">
      <div className="flex items-start gap-6">
        <div className="relative">
          <div className="bg-realtor-600 text-white rounded-full w-14 h-14 flex items-center justify-center font-bold text-xl z-10 relative">
            {number}
          </div>
          {number < 3 && (
            <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-realtor-100"></div>
          )}
        </div>
        <div className="flex-1 pt-3">
          <h3 className="text-xl font-bold text-gray-900 mb-2 font-playfair">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  </RevealAnimation>
);

const HowToJoin: React.FC = () => {
  return (
    <section id="request-invite" className="py-20 bg-white relative">
      {/* Background accent */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-realtor-50/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <RevealAnimation>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 font-playfair">
              How to <span className="text-realtor-600">Join the Network</span>
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={100}>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              We carefully select our members to ensure a network of true professionals.
              Here's how you can become part of Bangalore's elite broker community.
            </p>
          </RevealAnimation>
        </div>
        
        <div className="max-w-2xl mx-auto space-y-12">
          <Step 
            number={1}
            title="Request Your Invitation"
            description="Fill out the application form below with your professional details and current portfolio overview."
            delay={0}
          />
          <Step 
            number={2}
            title="Verification Process"
            description="Our team will review your application to ensure you meet our high professional standards."
            delay={100}
          />
          <Step 
            number={3}
            title="Join & Connect"
            description="Once approved, you'll receive your exclusive invitation to join RealBroker and can immediately start connecting with other elite brokers."
            delay={200}
          />
        </div>
      </div>
    </section>
  );
};

export default HowToJoin;
