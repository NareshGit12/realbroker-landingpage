
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
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

const MeetOurMembers = () => {
  // Sample broker data
  const brokers: BrokerInfo[] = [
    {
      id: '1',
      name: 'Shinoj Nambiar',
      agency: 'GoSpaze Realty',
      location: 'Bangalore',
      description: 'Shinoj Nambiar is a RERA-certified real estate professional with over a decade of industry experience. He is the visionary founder of GoSpaze, a platform committed to transparent real estate services. His expertise spans buying, selling, reselling, and managing high-end residential properties.',
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
      description: 'Rajiv is an award-winning real estate professional with expertise in commercial real estate and investment properties. He has advised numerous international clients looking to invest in Bangalore's growing tech corridors.',
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
      description: 'Anand specializes in luxury villa projects and gated communities. With over 15 years in real estate, he has an unparalleled network of high-net-worth clients and developers in Bangalore's premium neighborhoods.',
      imageSrc: '/photo-1560250097-0b93528c311a',
      rating: 5,
      expertiseAreas: ['Sadashivanagar', 'Dollars Colony', 'Hebbal'],
      memberSince: 'April 2021',
      propertiesCount: 32
    }
  ];

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
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Meet Our <span className="text-realtor-600">Members</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Connect with our exclusive network of top-performing real estate professionals in Bangalore
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={100}>
              <div className="relative py-8 px-4">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-4">
                    {brokers.map((broker) => (
                      <CarouselItem key={broker.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                        <BrokerCard broker={broker} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center mt-8">
                    <CarouselPrevious className="static translate-y-0 mr-2" />
                    <CarouselNext className="static translate-y-0 ml-2" />
                  </div>
                </Carousel>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={200}>
              <div className="text-center mt-12">
                <p className="text-muted-foreground mb-6">
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
