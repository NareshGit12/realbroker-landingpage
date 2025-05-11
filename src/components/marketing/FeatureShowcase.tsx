
import React from 'react';
import { CheckCircle, Building, Globe, BarChart3, Users2 } from 'lucide-react';
import RevealAnimation from '@/components/ui/RevealAnimation';

const FeatureItem = ({ icon, title, description }: { icon: React.ReactNode, title: string | React.ReactNode, description: string }) => (
  <div className="flex gap-4 items-start">
    <div className="mt-1">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

const FeatureShowcase: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <RevealAnimation>
            <div className="inline-block py-1 px-3 mb-4 text-xs font-medium uppercase tracking-wider bg-realtor-50 text-realtor-600 border border-realtor-100 rounded-full">
              Features
            </div>
          </RevealAnimation>
          <RevealAnimation delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Elite Brokers</h2>
          </RevealAnimation>
          <RevealAnimation delay={200}>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform is designed specifically for high-performing real estate professionals
              who want to collaborate and grow together.
            </p>
          </RevealAnimation>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div className="space-y-10">
            <RevealAnimation delay={300}>
              <FeatureItem 
                icon={<CheckCircle className="h-6 w-6 text-realtor-600" />}
                title={<>Professional <span className="text-realtor-600">Branding</span> Pages</>}
                description="Showcase your expertise with professionally designed profile pages that build trust with clients and partners."
              />
            </RevealAnimation>
            
            <RevealAnimation delay={400}>
              <FeatureItem 
                icon={<Building className="h-6 w-6 text-realtor-600" />}
                title="Premium Listing Showcase"
                description="Feature your high-value properties with immersive galleries, virtual tours, and detailed specifications."
              />
            </RevealAnimation>
            
            <RevealAnimation delay={500}>
              <FeatureItem 
                icon={<Globe className="h-6 w-6 text-realtor-600" />}
                title="Geospatial Property Mapping"
                description="Visualize listings with advanced mapping tools that showcase neighborhood amenities and property details."
              />
            </RevealAnimation>
          </div>
          
          <div className="space-y-10">
            <RevealAnimation delay={300}>
              <FeatureItem 
                icon={<BarChart3 className="h-6 w-6 text-realtor-600" />}
                title="Performance Analytics"
                description="Track your success with comprehensive analytics dashboards that reveal patterns and opportunities."
              />
            </RevealAnimation>
            
            <RevealAnimation delay={400}>
              <FeatureItem 
                icon={<Users2 className="h-6 w-6 text-realtor-600" />}
                title="Collaborative Client Management"
                description="Work seamlessly with other brokers to serve shared clients with our unified communication tools."
              />
            </RevealAnimation>
            
            <RevealAnimation delay={500}>
              <FeatureItem 
                icon={<CheckCircle className="h-6 w-6 text-realtor-600" />}
                title="Verified Broker Network"
                description="Connect with pre-screened, high-quality real estate professionals committed to excellence and collaboration."
              />
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
