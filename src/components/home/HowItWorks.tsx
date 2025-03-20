
import React from 'react';
import { Check, SendHorizonal, UserPlus, Building, Star } from 'lucide-react';
import RevealAnimation from '@/components/ui/RevealAnimation';

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const Step: React.FC<StepProps> = ({ number, title, description, icon, delay }) => (
  <RevealAnimation delay={delay}>
    <div className="flex items-start gap-6">
      <div className="relative">
        <div className="bg-realtor-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg z-10 relative">
          {number}
        </div>
        {number < 4 && (
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-realtor-100"></div>
        )}
      </div>
      <div className="flex-1 pt-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="rounded-full bg-realtor-50 p-2 w-10 h-10 flex items-center justify-center text-realtor-600">
            {icon}
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  </RevealAnimation>
);

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Get Invited",
      description: "Join by invitation from an existing member or request access from our team.",
      icon: <UserPlus className="h-5 w-5" />,
      delay: 0
    },
    {
      number: 2,
      title: "Share Listings",
      description: "Upload your exclusive properties to share with other verified brokers.",
      icon: <Building className="h-5 w-5" />,
      delay: 100
    },
    {
      number: 3,
      title: "Connect & Collaborate",
      description: "Message other brokers, schedule showings, and track deal progress.",
      icon: <SendHorizonal className="h-5 w-5" />,
      delay: 200
    },
    {
      number: 4,
      title: "Close More Deals",
      description: "Increase your success rate through collaboration with trusted partners.",
      icon: <Check className="h-5 w-5" />,
      delay: 300
    }
  ];

  return (
    <section id="how-it-works" className="py-8 md:py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <RevealAnimation>
              <span className="inline-block py-1 px-3 mb-4 text-xs font-medium uppercase tracking-wider bg-realtor-100 text-realtor-800 rounded-full">
                How It Works
              </span>
            </RevealAnimation>
            <RevealAnimation delay={100}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Simple Process, <span className="text-gradient">Powerful Results</span>
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={200}>
              <p className="text-muted-foreground text-lg mb-8">
                Our platform is designed to make collaboration between real estate professionals seamless and productive.
              </p>
            </RevealAnimation>

            <div className="space-y-12">
              {steps.map((step) => (
                <Step
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  delay={step.delay}
                />
              ))}
            </div>
          </div>

          <RevealAnimation direction="right">
            <div className="rounded-2xl overflow-hidden shadow-card">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
                alt="Real estate professionals collaborating around a table with laptops" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
