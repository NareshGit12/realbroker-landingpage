
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';
import MarketingHero from '@/components/marketing/MarketingHero';
import FeatureShowcase from '@/components/marketing/FeatureShowcase';
import EliteNetwork from '@/components/marketing/EliteNetwork';
import HowToJoin from '@/components/marketing/HowToJoin';
import FinalCTA from '@/components/marketing/FinalCTA';
import InviteForm from '@/components/home/InviteForm';

const Home2: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Track page view
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-gray-900">
      <Navbar />
      <main className="space-y-10">
        <MarketingHero />
        <FeatureShowcase />
        <EliteNetwork />
        <HowToJoin />
        <InviteForm />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Home2;
