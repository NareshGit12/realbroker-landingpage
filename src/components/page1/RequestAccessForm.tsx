import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import RevealAnimation from '@/components/ui/RevealAnimation';

const RequestAccessForm: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    officeLocation: '',
    linkedinOrWebsite: '',
    about: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('invite_requests')
        .insert({
          name: formData.name,
          company: formData.company,
          area: formData.officeLocation,
          email: formData.linkedinOrWebsite, // Using email field for linkedin/website
          message: formData.about,
        });

      if (error) throw error;

      toast({
        title: 'Request Submitted!',
        description: 'Thank you for your interest. We\'ll review your application and get back to you soon.',
      });

      setFormData({
        name: '',
        company: '',
        officeLocation: '',
        linkedinOrWebsite: '',
        about: '',
      });
      setPhotoPreview(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="request-access" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <RevealAnimation>
          <div className="text-center mb-12">
            <span className="inline-block py-2 px-4 mb-4 text-xs font-semibold uppercase tracking-widest bg-realtor-100 text-realtor-700 rounded-full">
              Join Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-playfair mb-4">
              Request to <span className="text-realtor-600">Join</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              RealBroker is invite-only to keep the quality high. Fill this out and we will get back to you.
            </p>
          </div>
        </RevealAnimation>

        <RevealAnimation delay={100}>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="bg-white border border-border/50 rounded-2xl p-8 md:p-10 shadow-sm">
              <div className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Full Name <span className="text-realtor-600">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="h-12 border-border/50 focus:border-realtor-500"
                  />
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-foreground font-medium">
                    Company Name <span className="text-realtor-600">*</span>
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your brokerage or company name"
                    required
                    className="h-12 border-border/50 focus:border-realtor-500"
                  />
                </div>

                {/* Office Location */}
                <div className="space-y-2">
                  <Label htmlFor="officeLocation" className="text-foreground font-medium">
                    Office Location <span className="text-realtor-600">*</span>
                  </Label>
                  <Input
                    id="officeLocation"
                    name="officeLocation"
                    value={formData.officeLocation}
                    onChange={handleInputChange}
                    placeholder="e.g., Indiranagar, Sadashivnagar, etc."
                    required
                    className="h-12 border-border/50 focus:border-realtor-500"
                  />
                </div>

                {/* LinkedIn or Website */}
                <div className="space-y-2">
                  <Label htmlFor="linkedinOrWebsite" className="text-foreground font-medium">
                    LinkedIn or Website
                  </Label>
                  <Input
                    id="linkedinOrWebsite"
                    name="linkedinOrWebsite"
                    value={formData.linkedinOrWebsite}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="h-12 border-border/50 focus:border-realtor-500"
                  />
                </div>

                {/* About */}
                <div className="space-y-2">
                  <Label htmlFor="about" className="text-foreground font-medium">
                    Tell us about yourself
                  </Label>
                  <Textarea
                    id="about"
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    placeholder="Your main areas and types of property you handle..."
                    rows={4}
                    className="border-border/50 focus:border-realtor-500 resize-none"
                  />
                </div>

                {/* Photo Upload */}
                <div className="space-y-2">
                  <Label className="text-foreground font-medium">
                    Photo (For your RB Member Profile)
                  </Label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-3 px-6 py-3 bg-muted hover:bg-muted/80 rounded-lg cursor-pointer transition-colors border border-border/50">
                      <Upload className="w-5 h-5 text-muted-foreground" />
                      <span className="text-muted-foreground text-sm font-medium">
                        {photoPreview ? 'Change Photo' : 'Upload Photo'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                    </label>
                    {photoPreview && (
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-realtor-200">
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-realtor-600 hover:bg-realtor-700 text-white h-14 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default RequestAccessForm;
