
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';
import { Card, CardContent } from '@/components/ui/card';
import RevealAnimation from '@/components/ui/RevealAnimation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const CharterAndConduct = () => {
  const [conductText, setConductText] = useState<string>('Loading...');
  const [charterText, setCharterText] = useState<string>('Loading...');
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
        
        // Fetch Network Charter
        const { data: charterData, error: charterError } = await supabase
          .from('rb_documents')
          .select('content')
          .eq('doc_name', 'RB_network_charter_long')
          .single();
        
        if (charterError) throw charterError;
        
        setConductText(conductData.content || 'No content available');
        setCharterText(charterData.content || 'No content available');
      } catch (error) {
        console.error('Error fetching documents:', error);
        toast.error('Failed to load content. Please try again later.');
        setConductText('Failed to load content. Please try again later.');
        setCharterText('Failed to load content. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // Format text function to handle line breaks
  const formatText = (text: string) => {
    return text.split('\n').map((paragraph, index) => (
      paragraph.trim() ? (
        <p key={index} className="mb-4">
          {paragraph}
        </p>
      ) : <br key={index} />
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Page Header */}
      <div className="pt-24 pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-6">Charter & Code of Conduct</h1>
          <p className="text-center text-lg text-muted-foreground max-w-3xl mx-auto">
            Establishing standards of excellence, ethical conduct, and community principles for the RealBroker network.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Code of Conduct Section */}
          <RevealAnimation>
            <Card className="shadow-md border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-realtor-600">Code of Conduct</h2>
                {isLoading ? (
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-full"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-5/6"></div>
                  </div>
                ) : (
                  <div className="prose prose-slate max-w-none">
                    {formatText(conductText)}
                  </div>
                )}
              </CardContent>
            </Card>
          </RevealAnimation>

          {/* Network Charter Section */}
          <RevealAnimation>
            <Card className="shadow-md border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-realtor-600">Network Charter</h2>
                {isLoading ? (
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-full"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-5/6"></div>
                  </div>
                ) : (
                  <div className="prose prose-slate max-w-none">
                    {formatText(charterText)}
                  </div>
                )}
              </CardContent>
            </Card>
          </RevealAnimation>

          {/* FAQs Section */}
          <RevealAnimation>
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How are the Code of Conduct and Charter enforced?</AccordionTrigger>
                  <AccordionContent>
                    Our Code of Conduct and Network Charter are enforced through our governance council with input from community members. Violations may result in warnings, temporary restrictions, or in severe cases, removal from the network.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How can I report a potential violation?</AccordionTrigger>
                  <AccordionContent>
                    You can report potential violations through our confidential reporting system available in your dashboard, or by contacting our support team directly. All reports are reviewed promptly and handled with discretion.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How often are these documents updated?</AccordionTrigger>
                  <AccordionContent>
                    We review and update our Code of Conduct and Network Charter annually, or as needed to address new challenges or opportunities within our network. All members are notified of significant changes.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </RevealAnimation>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CharterAndConduct;
