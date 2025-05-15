
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const NewsletterSubscription: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

  return (
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
  );
};

export default NewsletterSubscription;
