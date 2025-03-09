
import React from 'react';
import { Building, Search, Users2, Handshake, Shield, ArrowUpRight } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import RevealAnimation from '@/components/ui/RevealAnimation';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => (
  <RevealAnimation delay={delay}>
    <GlassCard hoverEffect className="h-full">
      <div className="p-4 flex flex-col h-full">
        <div className="rounded-full bg-realtor-50 p-3 w-12 h-12 flex items-center justify-center text-realtor-600 mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm flex-grow">{description}</p>
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
          <a href="#" className="text-realtor-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Learn more <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </GlassCard>
  </RevealAnimation>
);

const Features: React.FC = () => {
  const features = [
    {
      icon: <Building className="h-5 w-5" />,
      title: "Exclusive Listings",
      description: "Access properties before they hit the market, exclusively shared among verified brokers.",
      delay: 0
    },
    {
      icon: <Search className="h-5 w-5" />,
      title: "Smart Matching",
      description: "Our algorithm connects your clients with the perfect properties from other brokers.",
      delay: 100
    },
    {
      icon: <Users2 className="h-5 w-5" />,
      title: "Broker Network",
      description: "Build relationships with top-performing real estate professionals in your area.",
      delay: 200
    },
    {
      icon: <Handshake className="h-5 w-5" />,
      title: "Deal Collaboration",
      description: "Seamlessly coordinate showings, offers, and closings with partner brokers.",
      delay: 300
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Verified Members",
      description: "Every member is carefully vetted to ensure a network of trusted professionals.",
      delay: 400
    }
  ];

  return (
    <section id="features" className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <RevealAnimation>
            <span className="inline-block py-1 px-3 mb-4 text-xs font-medium uppercase tracking-wider bg-realtor-100 text-realtor-800 rounded-full">
              Features
            </span>
          </RevealAnimation>
          <RevealAnimation delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to 
              <span className="text-gradient"> Succeed Together</span>
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={200}>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform provides all the tools you need to connect with other brokers,
              share listings, and close more deals.
            </p>
          </RevealAnimation>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
