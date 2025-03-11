
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';
import RevealAnimation from '@/components/ui/RevealAnimation';

const SmartAgreements: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 md:px-6 mb-16">
          <RevealAnimation>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-realtor-600 to-red-700 bg-clip-text text-transparent">
              RB Smart Agreements
            </h1>
          </RevealAnimation>
          <RevealAnimation delay={200}>
            <p className="text-xl md:text-2xl text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
              Lock In Your Deals with Digital Agreements—Fast, Secure, & Hassle-Free!
            </p>
          </RevealAnimation>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SmartAgreements;
