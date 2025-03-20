
import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import RevealAnimation from '@/components/ui/RevealAnimation';
import { Star } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  imageSrc: string;
  imageAlt: string;
  rating: number;
  delay: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ 
  quote, 
  author, 
  role, 
  company, 
  imageSrc,
  imageAlt,
  rating,
  delay 
}) => (
  <RevealAnimation delay={delay}>
    <GlassCard className="h-full flex flex-col">
      <div className="flex items-center gap-1 mb-4">
        {Array(5).fill(0).map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
      
      <blockquote className="text-lg mb-6 flex-grow">"{quote}"</blockquote>
      
      <div className="flex items-center gap-3 mt-auto pt-6 border-t border-gray-100">
        <Avatar className="w-12 h-12">
          <AvatarImage src={imageSrc} alt={imageAlt} />
          <AvatarFallback>{author.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{author}</p>
          <p className="text-sm text-muted-foreground">{role}, {company}</p>
        </div>
      </div>
    </GlassCard>
  </RevealAnimation>
);

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "RealBroker has completely transformed how I collaborate with other brokers in Bangalore. I've closed 3 premium deals in Koramangala through connections made on the platform.",
      author: "Priya Sharma",
      role: "Senior Broker",
      company: "Anthra Real Estate Agency, Bangalore",
      imageSrc: "/photo-1581091226825-a6a2a5aee158",
      imageAlt: "Portrait of Priya Sharma",
      rating: 5,
      delay: 0
    },
    {
      quote: "The exclusive listings I've gained access to through this platform have given me a significant edge in the Bangalore market. My clients love the properties in Indiranagar they can't find on MagicBricks.",
      author: "Arjun Patel",
      role: "Luxury Real Estate Broker",
      company: "JK Properties, Bangalore",
      imageSrc: "/photo-1581092795360-fd1ca04f0952",
      imageAlt: "Portrait of Arjun Patel",
      rating: 5,
      delay: 100
    },
    {
      quote: "Being part of this invite-only network has elevated my business in Whitefield. The quality of brokers and premium listings on the platform is unmatched in Bangalore's tech corridor.",
      author: "Kavita Reddy",
      role: "Commercial Broker",
      company: "Dreams Realty, Bangalore",
      imageSrc: "/photo-1605810230434-7631ac76ec81",
      imageAlt: "Portrait of Kavita Reddy",
      rating: 4,
      delay: 200
    }
  ];

  return (
    <section id="testimonials" className="section-padding bg-gradient-subtle">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <RevealAnimation>
            <span className="inline-block py-1 px-3 mb-4 text-xs font-medium uppercase tracking-wider bg-realtor-100 text-realtor-800 rounded-full">
              Testimonials
            </span>
          </RevealAnimation>
          <RevealAnimation delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What <span className="text-gradient">Brokers Are Saying</span>
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={200}>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Hear from real estate professionals who are already experiencing success on our platform in Bangalore.
            </p>
          </RevealAnimation>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              imageSrc={testimonial.imageSrc}
              imageAlt={testimonial.imageAlt}
              rating={testimonial.rating}
              delay={testimonial.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
