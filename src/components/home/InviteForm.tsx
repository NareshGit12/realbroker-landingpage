
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import RevealAnimation from '@/components/ui/RevealAnimation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const InviteForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email || !name || !company) {
      toast({
        title: "Error",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Create form data to send
      const formData = {
        name,
        email,
        company,
        to: "naresh.shetty@gmail.com",
        subject: "New Invite Request from RealBroker"
      };
      
      // Send the form data to a serverless function or email service
      // Note: In a real application, you would use a serverless function or email service API
      // For demonstration, we'll simulate a successful submission
      console.log('Form data to be sent:', formData);
      
      // Show success
      toast({
        title: "Request submitted",
        description: "We'll review your application and get back to you soon.",
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="invite" className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <RevealAnimation>
            <div>
              <span className="inline-block py-1 px-3 mb-4 text-xs font-medium uppercase tracking-wider bg-realtor-100 text-realtor-800 rounded-full">
                Join Our Network
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Request an <span className="text-gradient">Invitation</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                RealBroker.app is an exclusive platform for professional real estate brokers in Bangalore. 
                Request an invitation to join our growing network.
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  "Join a community of verified real estate professionals",
                  "Access exclusive listings not available on public platforms",
                  "Collaborate on deals and expand your professional network",
                  "Increase your closing rate through broker-to-broker connections"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-realtor-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealAnimation>

          <RevealAnimation direction="right">
            <GlassCard className="overflow-hidden">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-realtor-500 focus:border-transparent outline-none transition-all"
                      placeholder="John Smith"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-realtor-500 focus:border-transparent outline-none transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-1">
                      Brokerage Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-realtor-500 focus:border-transparent outline-none transition-all"
                      placeholder="Century 21, RE/MAX, etc."
                    />
                  </div>
                  
                  <Button type="submit" className="w-full mt-2 bg-realtor-600 hover:bg-realtor-700 py-6 text-white">
                    <span>Request Access</span> 
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground pt-2">
                    By submitting, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </form>
              ) : (
                <div className="py-8 px-4 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-green-100 p-4">
                      <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for your interest in RealBroker.app. We'll review your application
                    and contact you soon.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-realtor-200 hover:bg-realtor-50 text-realtor-800"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Submit Another Request
                  </Button>
                </div>
              )}
            </GlassCard>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default InviteForm;
