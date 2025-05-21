
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import DocumentHero from '@/components/charter/DocumentHero';
import DocumentSection from '@/components/charter/DocumentSection';
import FAQSection from '@/components/charter/FAQSection';
import { formatNumberedContent } from '@/components/charter/ContentFormatter';

const CharterAndConduct = () => {
  const [conductText, setConductText] = useState<string>('Loading...');
  const [charterText, setCharterText] = useState<string>(
    `1-What We Stand For
Trust First- We work with brokers we can count on. No cutting corners, no backdoor deals.

2-Work Together
This is a network built for collaboration — share clean inventory, respect deals, and grow together.

3-Keep It Professional
Good photos, real listings, clear terms. Let's raise the bar for how our industry works.

4-Use Smart Tools
We use tech to cut out the chaos (no more WhatsApp spam!) and make real estate faster, simpler, and more profitable.`
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      try {
        // Fetch Code of Conduct
        const { data: conductData, error: conductError } = await supabase
          .from('rb_documents')
          .select('content')
          .eq('doc_name', 'RB_code_of_conduct_long')
          .single();
        
        if (conductError) throw conductError;
        
        // Format the text to ensure consistent formatting
        const conductFormatted = conductData.content?.trim() || 'No content available';
        
        setConductText(conductFormatted);
        
        console.log('Conduct text format:', conductFormatted);
      } catch (error) {
        console.error('Error fetching documents:', error);
        toast.error('Failed to load content. Please try again later.');
        setConductText('Failed to load content. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // FAQ data
  const faqs = [
    {
      question: "How are the Code of Conduct and Charter enforced?",
      answer: "Our Code of Conduct is enforced through our governance council with input from community members. Violations may result in warnings, temporary restrictions, or in severe cases, removal from the network.",
      value: "item-1"
    },
    {
      question: "How can I report a potential violation?",
      answer: "You can report potential violations through our confidential reporting system available in your dashboard, or by contacting our support team directly. All reports are reviewed promptly and handled with discretion.",
      value: "item-2"
    },
    {
      question: "What happens if someone breaks the code?",
      answer: "If someone breaks the code, they will be notified and given an opportunity to address the issue. Repeated or severe violations will result in removal from the platform. We take our community standards seriously to maintain trust and quality within the network.",
      value: "item-3"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      <DocumentHero 
        title="Member Guidelines"
        subtitle="Built for Trust. Backed by Professionals."
        description="By joining RealBroker, you agree to these principles. They're designed to protect your deals, relationships, and reputation in the market."
      />

      <div className="flex-grow container mx-auto px-4 py-0 mb-16">
        <div className="max-w-4xl mx-auto">
          {/* First Code of Conduct Section */}
          <DocumentSection
            content={conductText}
            isLoading={isLoading}
            formatContent={formatNumberedContent}
            title="RealBroker Code of Conduct"
            subtitle="Built for Trust. Backed by Professionals."
            description="By joining RealBroker, you agree to a few simple rules. These are here to protect your deals, your relationships, and your reputation in the market."
            className="document-section conduct-section mb-12"
          />
          
          {/* Second Code of Conduct Section with updated title to Network Charter */}
          <DocumentSection
            content={charterText}
            isLoading={false}
            formatContent={formatNumberedContent}
            title="Real Broker Network Charter"
            subtitle="Our Mission"
            description="To create a network of high quality trusted brokers connect, to share leads, and close deals faster with full transparency and professionalism."
            className="document-section conduct-section"
          />
          
          {/* FAQs Section */}
          <FAQSection title="Frequently Asked Questions" faqs={faqs} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CharterAndConduct;
