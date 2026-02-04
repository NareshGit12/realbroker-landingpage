import React from 'react';
import { Users, Building, Award } from 'lucide-react';
import RevealAnimation from '@/components/ui/RevealAnimation';

const TrustBar: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-realtor-600 to-realtor-700">
      <div className="container mx-auto px-4 md:px-6">
        <RevealAnimation>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-white/80">Quality Members</div>
              </div>
            </div>

            <div className="hidden md:block w-px h-12 bg-white/20" />

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">400+</div>
                <div className="text-sm text-white/80">Active Listings</div>
              </div>
            </div>

            <div className="hidden md:block w-px h-12 bg-white/20" />

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold font-playfair">Bangalore's</div>
                <div className="text-sm text-white/80">Best Network</div>
              </div>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default TrustBar;
