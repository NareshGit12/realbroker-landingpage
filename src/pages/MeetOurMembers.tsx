import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';
import BrokerCard, { BrokerInfo } from '@/components/members/BrokerCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import RevealAnimation from '@/components/ui/RevealAnimation';
import { supabase } from '@/integrations/supabase/client';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const MeetOurMembers = () => {
  const [members, setMembers] = useState<BrokerInfo[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Configure autoplay plugin with faster speed
  const autoplayOptions = {
    delay: 3000, // 3 seconds between slides
    stopOnInteraction: false, // Continue autoplay after user interaction
    rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
  };

  // Initialize carousel with autoplay plugin
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      slidesToScroll: 1,
      skipSnaps: false 
    },
    [Autoplay(autoplayOptions)]
  );

  useEffect(() => {
    async function fetchMembers() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, full_name, company_name, city, bio, avatar_url, rating, areas, member_since')
          .not('full_name', 'is', null)
          .order('rating', { ascending: false })
          .limit(20);
          
        if (error) {
          console.error('Error fetching members:', error);
          return;
        }
        
        if (data) {
          // Transform the data to match BrokerInfo structure
          const formattedMembers: BrokerInfo[] = data.map(profile => ({
            id: profile.id,
            name: profile.full_name || 'Unknown Name',
            agency: profile.company_name || 'Independent Broker',
            location: profile.city || 'Bangalore',
            description: profile.bio || 'Professional real estate broker specializing in residential and commercial properties.',
            imageSrc: profile.avatar_url || '/placeholder.svg',
            rating: profile.rating || 4,
            expertiseAreas: profile.areas || ['Residential', 'Commercial'],
            memberSince: profile.member_since ? new Date(profile.member_since).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recent Member',
            propertiesCount: 0
          }));
          
          setMembers(formattedMembers);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchMembers();
  }, []);

  // Fallback to sample data if no members found
  const useFallbackData = members.length === 0 && !loading;
  
  // Sample broker data as fallback
  const fallbackBrokers: BrokerInfo[] = [
    {
      id: '1',
      name: 'Shinoj Nambiar',
      agency: 'GoSpaze Realty',
      location: 'Bangalore',
      description: "Shinoj Nambiar is a RERA-certified real estate professional with over a decade of industry experience. He is the visionary founder of GoSpaze, a platform committed to transparent real estate services.",
      imageSrc: '/lovable-uploads/56a0fa98-6072-4e44-a72c-039ebd60c476.png',
      rating: 5,
      expertiseAreas: ['Whitefield', 'East Bangalore', 'Bellandur'],
      memberSince: 'May 2025',
      propertiesCount: 0
    },
    {
      id: '2',
      name: 'Priya Sharma',
      agency: 'Anthra Real Estate Agency',
      location: 'Bangalore',
      description: 'Priya Sharma is a senior broker specializing in luxury properties across Bangalore. With 8 years of experience, she has closed over 200 deals in the premium segment and maintains a stellar reputation for client satisfaction.',
      imageSrc: '/photo-1581091226825-a6a2a5aee158',
      rating: 5,
      expertiseAreas: ['Koramangala', 'Indiranagar', 'HSR Layout'],
      memberSince: 'March 2024',
      propertiesCount: 12
    },
    {
      id: '3',
      name: 'Rajiv Menon',
      agency: 'Prime Properties',
      location: 'Bangalore',
      description: "Rajiv is an award-winning real estate professional with expertise in commercial real estate and investment properties. He has advised numerous international clients looking to invest in Bangalore's growing tech corridors.",
      imageSrc: '/photo-1519085360753-af0119f7cbe7',
      rating: 4,
      expertiseAreas: ['Electronic City', 'Whitefield', 'Outer Ring Road'],
      memberSince: 'January 2023',
      propertiesCount: 24
    },
    {
      id: '4',
      name: 'Kavita Reddy',
      agency: 'Dreams Realty',
      location: 'Bangalore',
      description: 'With specialization in the tech corridor of Bangalore, Kavita has helped numerous IT professionals find their dream homes. Her attention to detail and understanding of client needs makes her one of the most sought-after brokers.',
      imageSrc: '/photo-1605810230434-7631ac76ec81',
      rating: 4,
      expertiseAreas: ['JP Nagar', 'Bannerghatta Road', 'BTM Layout'],
      memberSince: 'October 2022',
      propertiesCount: 18
    },
    {
      id: '5',
      name: 'Anand Kumar',
      agency: 'Horizon Estates',
      location: 'Bangalore',
      description: "Anand specializes in luxury villa projects and gated communities. With over 15 years in real estate, he has an unparalleled network of high-net-worth clients and developers in Bangalore's premium neighborhoods.",
      imageSrc: '/photo-1560250097-0b93528c311a',
      rating: 5,
      expertiseAreas: ['Sadashivanagar', 'Dollars Colony', 'Hebbal'],
      memberSince: 'April 2021',
      propertiesCount: 32
    }
  ];

  const displayMembers = useFallbackData ? fallbackBrokers : members;

  return (
    <>
      <Navbar />
      <main>
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <RevealAnimation>
              <div className="text-center mb-12">
                <span className="inline-block py-1 px-3 mb-4 text-xs font-medium uppercase tracking-wider bg-realtor-100 text-realtor-800 rounded-full">
                  Our Network
                </span>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
                  Meet Our <span className="text-realtor-600">Members</span>
                </h1>
                <p className="text-lg text-gray-800 max-w-2xl mx-auto">
                  Connect with our exclusive network of top-performing real estate professionals in Bangalore
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={100}>
              <div className="relative py-8">
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <p className="text-lg text-gray-600">Loading members...</p>
                  </div>
                ) : (
                  <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                      {displayMembers.map((member) => (
                        <div 
                          key={member.id} 
                          className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] xl:flex-[0_0_20%] pl-4 pr-4"
                        >
                          <div className="h-full">
                            <BrokerCard broker={member} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </RevealAnimation>

            <RevealAnimation delay={200}>
              <div className="text-center mt-8">
                <p className="text-gray-700 mb-6">
                  Our network consists of handpicked, vetted real estate professionals who adhere to our strict code of conduct.
                </p>
              </div>
            </RevealAnimation>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MeetOurMembers;
