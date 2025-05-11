
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import CertifiedBrokerPromo from '@/components/home/CertifiedBrokerPromo';
import HowItWorks from '@/components/home/HowItWorks';
import InviteForm from '@/components/home/InviteForm';
import Testimonials from '@/components/home/Testimonials';
import Footer from '@/components/home/Footer';

const Index: React.FC = () => {
  const location = useLocation();
  const initialRenderRef = useRef(true);
  
  // Handle scrolling to sections based on URL params or location state
  useEffect(() => {
    // Check URL search params first
    const searchParams = new URLSearchParams(location.search);
    const sectionFromParams = searchParams.get('section');
    
    if (sectionFromParams) {
      const element = document.getElementById(sectionFromParams);
      if (element) {
        // Add a slight delay to ensure rendering is complete
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
          // Clear the URL parameter after scrolling
          const newUrl = window.location.pathname;
          window.history.replaceState({}, '', newUrl);
        }, 100);
      }
    }
    // Then check location state as fallback
    else if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        // Add a slight delay to ensure rendering is complete
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
          // Clear the state after scrolling
          window.history.replaceState({}, document.title);
        }, 100);
      }
    }
  }, [location.search, location.state]);

  // Add animation observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    const elements = document.querySelectorAll('.reveal-animation');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <main className="space-y-6 md:space-y-12 lg:space-y-16">
        <Hero />
        <Features />
        <CertifiedBrokerPromo />
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>
        <InviteForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
