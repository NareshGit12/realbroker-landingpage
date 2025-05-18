
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RevealAnimation from '@/components/ui/RevealAnimation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-28 pb-16 bg-realtor-600 text-white">
        <div className="container mx-auto px-4">
          <RevealAnimation>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Charter & Code of Conduct</h1>
            <p className="text-center text-lg max-w-3xl mx-auto opacity-90">
              Establishing standards of excellence, ethical conduct, and community principles for our professional network.
            </p>
          </RevealAnimation>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow container mx-auto px-4 py-12 -mt-10">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Tabs Navigation */}
          <RevealAnimation>
            <Tabs defaultValue="conduct" className="w-full">
              <div className="flex justify-center mb-6">
                <TabsList className="bg-white dark:bg-gray-800 p-1 shadow-md">
                  <TabsTrigger value="conduct" className="px-6 py-3">Code of Conduct</TabsTrigger>
                  <TabsTrigger value="charter" className="px-6 py-3">Network Charter</TabsTrigger>
                </TabsList>
              </div>

              {/* Code of Conduct Tab */}
              <TabsContent value="conduct">
                <Card className="shadow-lg border-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-realtor-500 to-realtor-600 text-white p-8">
                    <CardTitle className="text-2xl font-bold">Code of Conduct</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-6">
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
              </TabsContent>

              {/* Network Charter Tab */}
              <TabsContent value="charter">
                <Card className="shadow-lg border-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-realtor-500 to-realtor-600 text-white p-8">
                    <CardTitle className="text-2xl font-bold">Network Charter</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-6">
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
              </TabsContent>
            </Tabs>
          </RevealAnimation>

          {/* Separator */}
          <RevealAnimation>
            <div className="flex items-center justify-center my-12">
              <Separator className="w-1/3" />
              <span className="mx-4 text-gray-500 font-medium">FAQ</span>
              <Separator className="w-1/3" />
            </div>
          </RevealAnimation>

          {/* FAQs Section */}
          <RevealAnimation>
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gray-50 dark:bg-gray-800 p-8">
                <CardTitle className="text-2xl font-bold text-center">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-b border-gray-200">
                    <AccordionTrigger className="py-5 text-lg font-medium text-left">
                      How are the Code of Conduct and Charter enforced?
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-gray-700 dark:text-gray-300">
                      Our Code of Conduct and Network Charter are enforced through our governance council with input from community members. Violations may result in warnings, temporary restrictions, or in severe cases, removal from the network.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2" className="border-b border-gray-200">
                    <AccordionTrigger className="py-5 text-lg font-medium text-left">
                      How can I report a potential violation?
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-gray-700 dark:text-gray-300">
                      You can report potential violations through our confidential reporting system available in your dashboard, or by contacting our support team directly. All reports are reviewed promptly and handled with discretion.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3" className="border-b border-gray-200">
                    <AccordionTrigger className="py-5 text-lg font-medium text-left">
                      How often are these documents updated?
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-gray-700 dark:text-gray-300">
                      We review and update our Code of Conduct and Network Charter annually, or as needed to address new challenges or opportunities within our network. All members are notified of significant changes.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger className="py-5 text-lg font-medium text-left">
                      What happens if I witness a violation of the Code of Conduct?
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-gray-700 dark:text-gray-300">
                      If you witness a violation, we encourage you to report it through the proper channels. As a community member, your vigilance helps maintain the integrity of our network and ensures a safe, respectful environment for all participants.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </RevealAnimation>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CharterAndConduct;
