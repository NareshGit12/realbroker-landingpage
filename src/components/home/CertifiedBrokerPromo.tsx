
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import RevealAnimation from '@/components/ui/RevealAnimation';

const CertifiedBrokerPromo: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-realtor-50 to-white py-12 border-y border-realtor-100">
      <div className="container mx-auto px-4 md:px-6">
        <RevealAnimation>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Certified RealBroker™ Program
              </h3>
              <p className="text-gray-700 max-w-2xl">
                Join our elite network of certified real estate professionals and gain access to exclusive tools, resources, and support to elevate your career.
              </p>
            </div>
            <Link
              to="/certified-real-broker"
              className="inline-flex items-center gap-2 bg-realtor-600 hover:bg-realtor-700 text-white px-5 py-3 rounded-lg font-medium transition-colors"
            >
              Learn More <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default CertifiedBrokerPromo;
