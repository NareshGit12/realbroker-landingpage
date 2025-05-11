
import React from 'react';
import RevealAnimation from '@/components/ui/RevealAnimation';
import FeatureCard from '@/components/marketing/FeatureCard';
import { 
  Share2, 
  Users, 
  FileText, 
  BarChart4,
  ShieldCheck,
  Globe
} from 'lucide-react';

const FeatureShowcase: React.FC = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
        <RevealAnimation>
          <span className="py-1 px-3 text-xs font-medium uppercase tracking-wider bg-realtor-100 text-realtor-800 rounded-full mb-4 inline-block">
            Powerful Features
          </span>
        </RevealAnimation>
        
        <RevealAnimation delay={100}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
            Everything You Need to <span className="text-realtor-600">Succeed</span>
          </h2>
        </RevealAnimation>
        
        <RevealAnimation delay={200}>
          <p className="text-gray-600 text-lg">
            Our platform offers a complete suite of features designed specifically for real estate professionals to collaborate efficiently and grow their business.
          </p>
        </RevealAnimation>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <RevealAnimation delay={300}>
          <FeatureCard
            icon={<Share2 className="h-8 w-8 text-realtor-600" />}
            title="Inventory Sharing"
            description="Share your property listings with trusted brokers in the network to expand your reach and close deals faster."
          />
        </RevealAnimation>
        
        <RevealAnimation delay={350}>
          <FeatureCard
            icon={<Users className="h-8 w-8 text-realtor-600" />}
            title="Verified Broker Network"
            description="Connect with pre-vetted, high-quality real estate professionals who meet our strict quality standards."
          />
        </RevealAnimation>
        
        <RevealAnimation delay={400}>
          <FeatureCard
            icon={<FileText className="h-8 w-8 text-realtor-600" />}
            title="Smart Agreements"
            description="Streamline collaboration with digital contracts and commission-sharing agreements built specifically for real estate."
          />
        </RevealAnimation>
        
        <RevealAnimation delay={450}>
          <FeatureCard
            icon={<BarChart4 className="h-8 w-8 text-realtor-600" />}
            title="Performance Analytics"
            description="Track your listings, leads, and closed deals with powerful analytics to optimize your business strategy."
          />
        </RevealAnimation>
        
        <RevealAnimation delay={500}>
          <FeatureCard
            icon={<ShieldCheck className="h-8 w-8 text-realtor-600" />}
            title="Secure Communication"
            description="Exchange sensitive client information and property details through our encrypted messaging system."
          />
        </RevealAnimation>
        
        <RevealAnimation delay={550}>
          <FeatureCard
            icon={<Globe className="h-8 w-8 text-realtor-600" />}
            title="Professional <span class='text-realtor-600'>Branding</span> Pages"
            description="Showcase your services with customized profile pages that highlight your expertise and listings."
          />
        </RevealAnimation>
      </div>
    </div>
  );
};

export default FeatureShowcase;
