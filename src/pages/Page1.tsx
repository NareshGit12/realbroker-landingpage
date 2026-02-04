import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';
import Page1Hero from '@/components/page1/Page1Hero';
import ValuePropsSection from '@/components/page1/ValuePropsSection';
import PartnershipSection from '@/components/page1/PartnershipSection';
import RequestAccessForm from '@/components/page1/RequestAccessForm';
import TrustBar from '@/components/page1/TrustBar';

const Page1: React.FC = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <main>
        <Page1Hero />
        <ValuePropsSection />
        <PartnershipSection />
        <RequestAccessForm />
        <TrustBar />
      </main>
      <Footer />
    </div>
  );
};

export default Page1;
