
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';
import MarketingHero from '@/components/marketing/MarketingHero';
import FeatureShowcase from '@/components/marketing/FeatureShowcase';
import EliteNetwork from '@/components/marketing/EliteNetwork';
import HowToJoin from '@/components/marketing/HowToJoin';
import FinalCTA from '@/components/marketing/FinalCTA';

const Tools: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
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
    } else {
      // Default behavior: scroll to top on page load
      window.scrollTo(0, 0);
    }
  }, [location.search, location.state]);

  const handleRequestInvite = () => {
    navigate('/?section=request-access');
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-gray-900">
      <Navbar />
      <main className="space-y-4">
        <MarketingHero />
        <div id="features" className="pt-3">
          <FeatureShowcase />
        </div>
        <EliteNetwork />
        <HowToJoin />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Tools;
