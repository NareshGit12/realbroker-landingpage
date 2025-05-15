
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-realtor-600 mb-6">Pricing</h1>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
            <p className="text-gray-600 mb-6">RealBroker is offered Free at this time to our Initial Members,
              Our pricing information will be available soon. Please check back for subscription options and features.</p>
            <Link to="/">
              <Button className="bg-realtor-600 hover:bg-realtor-700">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
