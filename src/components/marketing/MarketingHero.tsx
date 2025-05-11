
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RevealAnimation from '@/components/ui/RevealAnimation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

const MarketingHero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-20 pb-10 bg-white">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-neutral-50 z-[-2]"></div>
      
      {/* Vertical pink stripes in background */}
      <div className="absolute inset-0 z-[-1] w-full">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="absolute top-0 bottom-0 w-[3%] bg-realtor-50" style={{ left: `${i * 8.3}%` }}></div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-left">
            <RevealAnimation>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Professional Branding Pages
              </h2>
            </RevealAnimation>
            
            <RevealAnimation delay={100}>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                Showcase yourself with a sleek, customizable broker profile designed to impress clients and partners.
              </p>
            </RevealAnimation>
            
            <RevealAnimation delay={200}>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#request-invite" className="w-full sm:w-auto">
                  <Button className="bg-realtor-600 hover:bg-realtor-700 text-white py-6 px-8 rounded-xl text-lg shadow-md w-full transition-all duration-300 hover:scale-105">
                    Request Your Invitation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </RevealAnimation>
          </div>
          
          {/* Right side - Profile card */}
          <RevealAnimation delay={300} direction="right">
            <div className="relative">
              {/* Red header strip */}
              <div className="absolute top-0 left-0 right-0 h-24 bg-realtor-500 rounded-t-2xl z-0"></div>
              
              <Card className="relative z-10 shadow-lg rounded-2xl overflow-hidden border-0">
                <div className="pt-16 px-6 pb-6 relative">
                  {/* Profile avatar */}
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Avatar className="w-20 h-20 border-4 border-white">
                      <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" alt="Broker Profile" />
                      <AvatarFallback>BR</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  {/* Profile content */}
                  <div className="text-center mt-8">
                    <h3 className="text-xl font-bold">Manjesh Rao</h3>
                    <p className="text-sm text-gray-600 mb-2">Broker at Bliss</p>
                    
                    {/* Certification badges */}
                    <div className="flex justify-center gap-2 mb-3">
                      {[1, 2, 3].map((badge) => (
                        <div key={badge} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs">✓</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Rating */}
                    <div className="flex justify-center mb-4">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-yellow-400">★</span>
                        ))}
                      </div>
                      <span className="text-sm ml-1">5.0</span>
                    </div>
                    
                    {/* Location */}
                    <p className="text-sm text-gray-600 mb-4">📍 Bangalore</p>
                    
                    {/* Profile tabs */}
                    <div className="flex justify-between text-xs border-b border-gray-200 mb-4">
                      {['Profile Details', 'Deals', 'Partnerships', 'Certifications', 'Testimonials', 'Reviews', 'CRM'].map((tab) => (
                        <span key={tab} className={`pb-2 px-1 ${tab === 'Profile Details' ? 'border-b-2 border-realtor-500 text-realtor-600 font-medium' : 'text-gray-500'}`}>
                          {tab}
                        </span>
                      ))}
                    </div>
                    
                    {/* Contact information */}
                    <div className="mt-4">
                      <h4 className="text-left font-semibold mb-2">Contact Information</h4>
                      <div className="flex flex-col gap-2 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">📱</span>
                          <span className="text-sm">91991 23491</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">✉️</span>
                          <span className="text-sm">manjesh@realestate.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">🌐</span>
                          <span className="text-sm">Website</span>
                        </div>
                      </div>
                      
                      {/* Contact button */}
                      <Button className="w-full mt-4 bg-realtor-600 text-white hover:bg-realtor-700">
                        Contact Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default MarketingHero;
