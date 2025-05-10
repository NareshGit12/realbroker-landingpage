
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RevealAnimation from '@/components/ui/RevealAnimation';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const FinalCTA: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !company || !phone) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Insert the invite request into the database
      const { error } = await supabase
        .from('invite_requests')
        .insert([{ name, email, company, phone }]);
      
      if (error) {
        if (error.code === '23505') {
          // Duplicate email error
          toast({
            title: "Already requested",
            description: "This email is already registered for an invitation",
            variant: "destructive",
          });
        } else {
          console.error("Error saving invite request:", error);
          toast({
            title: "Error",
            description: "Failed to submit your request. Please try again later.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Request submitted",
          description: "Your invitation request has been received. Our team will review it soon.",
        });
        // Clear the form
        setName('');
        setEmail('');
        setCompany('');
        setPhone('');
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-deep-navy to-dark-charcoal relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-deep-navy/30 z-[-1]"></div>
      <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full bg-gold/10 blur-3xl z-[-1]"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-deep-navy/80 to-dark-charcoal border border-white/10 rounded-2xl shadow-premium p-8 md:p-12">
            <div className="text-center mb-10">
              <RevealAnimation>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-playfair">
                  Ready to <span className="text-gold">Elevate Your Business?</span>
                </h2>
              </RevealAnimation>
              <RevealAnimation delay={100}>
                <p className="text-neutral-gray text-lg max-w-2xl mx-auto">
                  Request your invitation to join Bangalore's exclusive network of elite real estate brokers
                  and start closing more high-value deals.
                </p>
              </RevealAnimation>
            </div>
            
            <RevealAnimation delay={200}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-gray mb-1">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-deep-navy/50 text-white focus:ring-2 focus:ring-gold/50 focus:border-transparent outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-gray mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-deep-navy/50 text-white focus:ring-2 focus:ring-gold/50 focus:border-transparent outline-none transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-neutral-gray mb-1">
                      Company Name
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-deep-navy/50 text-white focus:ring-2 focus:ring-gold/50 focus:border-transparent outline-none transition-all"
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-gray mb-1">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-deep-navy/50 text-white focus:ring-2 focus:ring-gold/50 focus:border-transparent outline-none transition-all"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
                
                <div className="text-center pt-4">
                  <Button 
                    type="submit"
                    className="bg-gold hover:bg-gold/90 text-dark-charcoal py-6 px-12 rounded-xl text-lg shadow-premium transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Request Your Invitation'}
                    {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
                  </Button>
                  <p className="text-neutral-gray text-sm mt-4">
                    By requesting an invitation, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </form>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
