
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import DocumentHero from '@/components/charter/DocumentHero';
import DocumentSection from '@/components/charter/DocumentSection';
import { formatNumberedContent } from '@/components/charter/ContentFormatter';

const Charter = () => {
  const [charterText, setCharterText] = useState<string>('Loading...');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      try {
        // Fetch Code of Conduct - using the same content for now
        const { data: conductData, error: conductError } = await supabase
          .from('rb_documents')
          .select('content')
          .eq('doc_name', 'RB_code_of_conduct_long')
          .single();
        
        if (conductError) throw conductError;
        
        // Format the text to ensure consistent formatting
        const conductFormatted = conductData.content?.trim() || 'No content available';
        
        setCharterText(conductFormatted);
        
      } catch (error) {
        console.error('Error fetching documents:', error);
        toast.error('Failed to load content. Please try again later.');
        setCharterText('Failed to load content. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

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
            content={charterText}
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
