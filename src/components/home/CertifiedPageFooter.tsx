
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '@/components/layout/Logo';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';

const CertifiedPageFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Insert the email into the subscribers table
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email }]);
      
      if (error) {
        if (error.code === '23505') {
          // Unique violation error code
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter",
            variant: "destructive",
          });
        } else {
          console.error("Error saving subscriber:", error);
          toast({
            title: "Error",
            description: "Failed to subscribe. Please try again later.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Success",
          description: "You've been added to our newsletter",
        });
        setEmail('');
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navigation helper function
  const navigateToHomeSection = (sectionId: string) => {
    navigate('/', { state: { scrollTo: sectionId } });
  };

  return (
    <footer className="bg-white pt-16 pb-8 relative">
      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-gray-50"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        {/* Newsletter Section */}
        <div className="max-w-3xl mx-auto mb-16 relative z-10">
          <div className="glass-card p-8 md:p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">
              Get notifications about new features and industry insights.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-realtor-500 focus:border-transparent outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              <Button 
                type="submit" 
                className="bg-realtor-600 hover:bg-realtor-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'} 
                {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1 */}
          <div>
            <div className="mb-4">
              <Logo isScrolled={true} />
            </div>
            <p className="text-muted-foreground mb-6">
              The exclusive platform for real estate professionals to connect, share listings, and close more deals.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-realtor-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-realtor-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-realtor-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-realtor-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Column 2 */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Explore</h4>
            <ul className="space-y-3">
              {[
                { name: "Features", action: () => navigateToHomeSection("features") },
                { name: "How It Works", action: () => navigateToHomeSection("how-it-works") },
                { name: "Pricing", action: () => navigateToHomeSection("") },
                { name: "Testimonials", action: () => navigateToHomeSection("testimonials") },
                { name: "FAQ", action: () => navigateToHomeSection("") }
              ].map((item) => (
                <li key={item.name}>
                  <button 
                    onClick={item.action}
                    className="text-muted-foreground hover:text-realtor-600 transition-colors bg-transparent border-none cursor-pointer p-0"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3 */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              {[
                { name: "Support", action: () => navigateToHomeSection("") },
                { name: "Certified RealBroker Program", path: "/certified-realbroker" }
              ].map((item) => (
                <li key={typeof item === 'string' ? item : item.name}>
                  {'path' in item ? (
                    <Link to={item.path} className="text-muted-foreground hover:text-realtor-600 transition-colors">
                      {item.name}
                    </Link>
                  ) : (
                    <button 
                      onClick={item.action}
                      className="text-muted-foreground hover:text-realtor-600 transition-colors bg-transparent border-none cursor-pointer p-0"
                    >
                      {item.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4 */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", action: () => navigateToHomeSection("") },
                { name: "Privacy Policy", action: () => navigateToHomeSection("") },
                { name: "Terms of Service", path: "/terms-of-use" }
              ].map((item) => (
                <li key={typeof item === 'string' ? item : item.name}>
                  {'path' in item ? (
                    <Link to={item.path} className="text-muted-foreground hover:text-realtor-600 transition-colors">
                      {item.name}
                    </Link>
                  ) : (
                    <button 
                      onClick={item.action}
                      className="text-muted-foreground hover:text-realtor-600 transition-colors bg-transparent border-none cursor-pointer p-0"
                    >
                      {item.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} RealBroker.app. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default CertifiedPageFooter;
