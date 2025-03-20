
import React from 'react';
import { Building, Search, Users2, Handshake, Shield, ArrowUpRight, FileText } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import RevealAnimation from '@/components/ui/RevealAnimation';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  link?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay, link }) => (
  <RevealAnimation delay={delay}>
    <GlassCard hoverEffect className="h-full">
      <div className="p-4 flex flex-col h-full">
        <div className="rounded-full bg-realtor-50 p-3 w-12 h-12 flex items-center justify-center text-realtor-600 mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm flex-grow">{description}</p>
        {link && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
            <Link to={link} className="text-realtor-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Learn more <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        )}
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
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Smart Agreements",
      description: "Create, sign, and manage digital agreements between brokers, buyers, and sellers with ease.",
      delay: 500,
      link: "/smart-agreements"
    }
  ];

  return (
    <section id="features" className="py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 md:mb-10 text-center">
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
              link={feature.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
