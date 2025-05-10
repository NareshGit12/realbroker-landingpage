
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';
import MarketingHero from '@/components/marketing/MarketingHero';
import FeatureShowcase from '@/components/marketing/FeatureShowcase';
import EliteNetwork from '@/components/marketing/EliteNetwork';
import HowToJoin from '@/components/marketing/HowToJoin';
import FinalCTA from '@/components/marketing/FinalCTA';

const Home2: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Track page view
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-dark-charcoal text-white">
      <Navbar />
      <main>
        <MarketingHero />
        <FeatureShowcase />
        <EliteNetwork />
        <HowToJoin />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Home2;
