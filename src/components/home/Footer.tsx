
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Footer: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success",
      description: "You've been added to our newsletter",
    });
    
    setEmail('');
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
              />
              <Button type="submit" className="bg-realtor-600 hover:bg-realtor-700">
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1 */}
          <div>
            <div className="flex items-center text-2xl font-bold text-realtor-600 mb-4">
              <div className="flex items-center">
                <span className="text-3xl">R</span>
                <span className="text-3xl -ml-1">B</span>
                <div className="ml-2 uppercase">
                  <div className="text-sm leading-none">REAL</div>
                  <div className="text-sm leading-none">BROKER</div>
                </div>
              </div>
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
              {["Features", "How It Works", "Pricing", "Testimonials", "FAQ"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-realtor-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3 */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              {["Blog", "Guides", "Support", "API Documentation", "Partner Program"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-realtor-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4 */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Careers", "Press", "Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-realtor-600 transition-colors">
                    {item}
                  </a>
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

export default Footer;
