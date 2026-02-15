import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, Send, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import RevealAnimation from '@/components/ui/RevealAnimation';

const RequestAccessForm: React.FC = () => {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: 'Independent',
    city: '',
    officeLocation: '',
    whatsappNumber: '',
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
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadPhoto = async (): Promise<string | null> => {
    if (!photoFile) return null;
    const fileExt = photoFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from('invite-photos')
      .upload(fileName, photoFile);
    if (error) {
      console.error('Error uploading photo:', error);
      return null;
    }
    const { data: urlData } = supabase.storage
      .from('invite-photos')
      .getPublicUrl(fileName);
    return urlData.publicUrl;
  };

  const sendConfirmationEmail = async (name: string, email: string) => {
    const subject = `${name}'s request to join RB has been submitted`;
    const body = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Thank you for your interest in RealBroker, ${name}!</h2>
        <p>We have received your request to join the RealBroker Network.</p>
        <p>Someone from our team will be in touch with you via WhatsApp soon.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>The RealBroker Team</strong></p>
      </div>
    `;
    try {
      await supabase.functions.invoke('send-notification-email', {
        body: { to: email, subject, body },
      });
      await supabase.functions.invoke('send-notification-email', {
        body: { to: 'support@realbroker.app', subject, body },
      });
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  };

  const createWhatsAppOutbound = async (name: string, phone: string) => {
    try {
      await supabase.from('whatsapp_outbound' as any).insert({
        phone,
        user_name: name,
        message: `Hi ${name}, thank you for your request to join the RealBroker Network! We have received your application and someone from our team will be in touch with you soon.`,
        send_status: 'pending',
        source: 'invite_request',
        campaign_name: 'invite_request_confirmation',
      });
    } catch (error) {
      console.error('Error creating WhatsApp outbound:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const photoUrl = await uploadPhoto();

      const messageParts: string[] = [];
      if (formData.linkedinOrWebsite.trim()) {
        messageParts.push(formData.linkedinOrWebsite.trim());
      }
      if (formData.about.trim()) {
        messageParts.push(formData.about.trim());
      }
      const combinedMessage = messageParts.join('\n') || null;

      const subject = `${formData.name}'s request to join RB has been submitted`;

      const { error } = await supabase
        .from('invite_requests')
        .insert({
          name: formData.name,
          email: formData.email,
          company: formData.company || 'Independent',
          city: formData.city,
          area: formData.officeLocation,
          whatsapp_number: formData.whatsappNumber,
          message: combinedMessage,
          profile_photo_url: photoUrl,
          recipient_email: 'support@realbroker.app',
          subject: subject,
        });

      if (error) throw error;

      await Promise.all([
        sendConfirmationEmail(formData.name, formData.email),
        formData.whatsappNumber ? createWhatsAppOutbound(formData.name, formData.whatsappNumber) : Promise.resolve(),
      ]);

      setShowSuccessDialog(true);

      setFormData({
        name: '',
        email: '',
        company: 'Independent',
        city: '',
        officeLocation: '',
        whatsappNumber: '',
        linkedinOrWebsite: '',
        about: '',
      });
      setPhotoPreview(null);
      setPhotoFile(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your full name" required className="h-12 border-border/50 focus:border-realtor-500" />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium">
                      Email Address <span className="text-realtor-600">*</span>
                    </Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" required className="h-12 border-border/50 focus:border-realtor-500" />
                  </div>

                  {/* Company Name */}
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-foreground font-medium">
                      Company Name <span className="text-realtor-600">*</span>
                    </Label>
                    <Input id="company" name="company" value={formData.company} onChange={handleInputChange} placeholder="Your brokerage or company name" required className="h-12 border-border/50 focus:border-realtor-500" />
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-foreground font-medium">
                      City <span className="text-realtor-600">*</span>
                    </Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleInputChange} placeholder="e.g., Bangalore, Mumbai, etc." required className="h-12 border-border/50 focus:border-realtor-500" />
                  </div>

                  {/* Office Location */}
                  <div className="space-y-2">
                    <Label htmlFor="officeLocation" className="text-foreground font-medium">
                      Office Location <span className="text-realtor-600">*</span>
                    </Label>
                    <Input id="officeLocation" name="officeLocation" value={formData.officeLocation} onChange={handleInputChange} placeholder="e.g., Indiranagar, Sadashivnagar, etc." required className="h-12 border-border/50 focus:border-realtor-500" />
                  </div>

                  {/* WhatsApp Number */}
                  <div className="space-y-2">
                    <Label htmlFor="whatsappNumber" className="text-foreground font-medium">
                      WhatsApp Number <span className="text-realtor-600">*</span>
                    </Label>
                    <Input id="whatsappNumber" name="whatsappNumber" type="tel" value={formData.whatsappNumber} onChange={handleInputChange} placeholder="+91 98765 43210" required className="h-12 border-border/50 focus:border-realtor-500" />
                  </div>

                  {/* LinkedIn or Website */}
                  <div className="space-y-2">
                    <Label htmlFor="linkedinOrWebsite" className="text-foreground font-medium">
                      LinkedIn or Website
                    </Label>
                    <Input id="linkedinOrWebsite" name="linkedinOrWebsite" value={formData.linkedinOrWebsite} onChange={handleInputChange} placeholder="https://linkedin.com/in/yourprofile" className="h-12 border-border/50 focus:border-realtor-500" />
                  </div>

                  {/* About */}
                  <div className="space-y-2">
                    <Label htmlFor="about" className="text-foreground font-medium">
                      Tell us about yourself
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Write 4-5 lines about yourself, what areas you work in, how long you have been in the business, some background, education, types of properties and clients you specialize in, anything else that would enhance your profile.
                    </p>
                    <Textarea id="about" name="about" value={formData.about} onChange={handleInputChange} placeholder="Tell us about your experience, expertise, and what makes you stand out..." rows={5} className="border-border/50 focus:border-realtor-500 resize-none" />
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
                        <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                      </label>
                      {photoPreview && (
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-realtor-200">
                          <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-realtor-600 hover:bg-realtor-700 text-white h-14 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
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

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-playfair">Request Submitted! 🎉</DialogTitle>
            <DialogDescription className="text-base pt-2">
              Thank you for your interest in joining RealBroker. Someone from our team will be in touch with you via WhatsApp soon.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 pt-4">
            <Button asChild className="w-full bg-realtor-600 hover:bg-realtor-700 text-white h-12">
              <a href="/members">Check out our current members</a>
            </Button>
            <Button asChild variant="outline" className="w-full h-12 border-realtor-300 text-realtor-700 hover:bg-realtor-50">
              <a href="https://propalyst.com" target="_blank" rel="noopener noreferrer">Visit Propalyst.com</a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RequestAccessForm;
