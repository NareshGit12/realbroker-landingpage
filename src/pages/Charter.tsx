
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';
import { toast } from 'sonner';
import DocumentHero from '@/components/charter/DocumentHero';
import DocumentSection from '@/components/charter/DocumentSection';
import { formatNumberedContent } from '@/components/charter/ContentFormatter';

const Charter = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Custom charter content with the 4 bullet points
  const charterContent = `1. What We Stand For
Trust First- We work with brokers we can count on. No cutting corners, no backdoor deals.

2. Work Together
This is a network built for collaboration — share clean inventory, respect deals, and grow together.

3. Keep It Professional
Good photos, real listings, clear terms. Let's raise the bar for how our industry works.

4. Use Smart Tools
We use tech to cut out the chaos (no more WhatsApp spam!) and make real estate faster, simpler, and more profitable.`;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      <DocumentHero 
        title="Network Charter"
        subtitle="Our Mission and Values"
        description="The Real Broker Network Charter establishes our mission, principles, and commitments to create a trusted network of professional brokers."
      />

      <div className="flex-grow container mx-auto px-4 py-0 mb-16">
        <div className="max-w-4xl mx-auto">
          {/* Network Charter Section */}
          <DocumentSection
            content={charterContent}
            isLoading={isLoading}
            formatContent={formatNumberedContent}
            title="Real Broker Network Charter"
            subtitle="Our Mission"
            description="To create a network of high quality trusted brokers connect, to share leads, and close deals faster with full transparency and professionalism."
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Charter;
