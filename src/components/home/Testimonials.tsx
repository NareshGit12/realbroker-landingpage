
import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import RevealAnimation from '@/components/ui/RevealAnimation';
import { Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  delay: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ 
  quote, 
  author, 
  role, 
  company, 
  avatar, 
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
        <img 
          src={avatar} 
          alt={author}
          className="w-12 h-12 rounded-full object-cover" 
          loading="lazy"
        />
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
      quote: "RealBroker.app has completely transformed how I collaborate with other agents. I've closed 3 deals in the first month alone through connections made on the platform.",
      author: "Sarah Johnson",
      role: "Senior Broker",
      company: "Luxury Homes Realty",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80",
      rating: 5,
      delay: 0
    },
    {
      quote: "The exclusive listings I've gained access to through this platform have given me a competitive edge. My clients are impressed with properties they can't find anywhere else.",
      author: "Michael Chen",
      role: "Real Estate Broker",
      company: "Urban Property Group",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80",
      rating: 5,
      delay: 100
    },
    {
      quote: "Being part of this invite-only network has elevated my professional reputation. The quality of brokers and listings on the platform is exceptional.",
      author: "James Rodriguez",
      role: "Commercial Broker",
      company: "Metropolitan Real Estate",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80",
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
              Hear from real estate professionals who are already experiencing success on our platform.
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
              avatar={testimonial.avatar}
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
