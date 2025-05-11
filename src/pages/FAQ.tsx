
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';

const FAQ: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="text-center max-w-lg mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-realtor-600">FAQ</h1>
          <div className="h-1 w-24 bg-realtor-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 mb-8">Coming Soon</p>
          <p className="text-gray-500">
            We're compiling answers to frequently asked questions to help you get the most
            out of our platform. Please check back soon.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
