
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

  // Function to format content into points with numbers
  const formatNumberedContent = (text: string, title: string, subtitle?: string, description?: string) => {
    // Split the text by numbered points (1., 2., etc.)
    const sections = text.split(/(\d+\.)\s+/);
    
    if (sections.length <= 1) {
      // If no numbered points are detected, just display the text normally
      return formatText(text);
    }
    
    // Group the sections into points
    const points = [];
    for (let i = 1; i < sections.length; i += 2) {
      if (i + 1 < sections.length) {
        points.push({ number: sections[i], content: sections[i + 1] });
      }
    }
    
    return (
      <div className="space-y-8">
        {points.length > 0 ? (
          <>
            {/* Introduction section with consistent styling */}
            <div className="border-l-4 border-realtor-500 pl-6 py-2 mb-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                {title}
              </h3>
              <div className="space-y-3 ml-4">
                {subtitle && <p className="text-gray-600 font-medium">{subtitle}</p>}
                {description && <p className="text-gray-600">{description}</p>}
              </div>
            </div>
            
            {/* Numbered points */}
            {points.map((point, index) => (
              <div key={index} className="border-l-4 border-realtor-500 pl-6 py-2">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {point.number} {point.content.split('\n')[0]}
                </h3>
                <div className="space-y-3 ml-4">
                  {point.content
                    .split('\n')
                    .slice(1)
                    .map((line, i) => 
                      line.trim() && (
                        <div key={i} className="flex items-start">
                          <span className="text-realtor-500 mr-2 mt-1">•</span>
                          <p className="text-gray-600">{line.trim()}</p>
                        </div>
                      )
                    )}
                </div>
              </div>
            ))}
          </>
        ) : (
          // Fallback if parsing fails
          formatText(text)
        )}
      </div>
    );
  };

  // Format text function to handle line breaks
  const formatText = (text: string) => {
    return text.split('\n').map((paragraph, index) => (
      paragraph.trim() ? (
        <p key={index} className="mb-4 text-gray-600">
          {paragraph}
        </p>
      ) : <br key={index} />
    ));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-28 pb-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Member Guidelines</h1>
                <p className="text-xl text-gray-600">Built for Trust. Backed by Professionals.</p>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://ayxhtlzyhpsjykxxnqqh.supabase.co/storage/v1/object/public/public/RBlogo/emblem_cropped.png" 
                  alt="RealBroker Badge" 
                  className="w-24 h-24"
                />
              </div>
            </div>
            <p className="text-lg text-gray-600">
              By joining RealBroker, you agree to these principles. They're designed to protect 
              your deals, relationships, and reputation in the market.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow container mx-auto px-4 py-0 mb-16">
        <div className="max-w-4xl mx-auto">
          {/* Code of Conduct Section */}
          <RevealAnimation>
            <Card className="border-0 shadow-md overflow-hidden bg-white mb-12">
              <CardContent className="p-8">
                {isLoading ? (
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-full"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-5/6"></div>
                  </div>
                ) : (
                  <div className="prose prose-lg max-w-none">
                    {formatNumberedContent(
                      conductText, 
                      "RealBroker Code of Conduct", 
                      "Built for Trust. Backed by Professionals.", 
                      "By joining RealBroker, you agree to a few simple rules. These are here to protect your deals, your relationships, and your reputation in the market."
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </RevealAnimation>
          
          {/* Network Charter Section */}
          <RevealAnimation>
            <Card className="border-0 shadow-md overflow-hidden bg-white">
              <CardContent className="p-8">
                {isLoading ? (
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-full"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-5/6"></div>
                  </div>
                ) : (
                  <div className="prose prose-lg max-w-none">
                    {formatNumberedContent(
                      charterText, 
                      "RealBroker Network Charter", 
                      "Built for Trust. Backed by Professionals.", 
                      "The RealBroker Network Charter establishes the foundational principles that guide how members interact, collaborate, and grow together."
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </RevealAnimation>

          {/* FAQs Section */}
          <RevealAnimation>
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-medium">How are the Code of Conduct and Charter enforced?</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Our Code of Conduct and Network Charter are enforced through our governance council with input from community members. Violations may result in warnings, temporary restrictions, or in severe cases, removal from the network.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-medium">How can I report a potential violation?</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    You can report potential violations through our confidential reporting system available in your dashboard, or by contacting our support team directly. All reports are reviewed promptly and handled with discretion.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-medium">What happens if someone breaks the code?</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    If someone breaks the code, they will be notified and given an opportunity to address the issue. Repeated or severe violations will result in removal from the platform. We take our community standards seriously to maintain trust and quality within the network.
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
