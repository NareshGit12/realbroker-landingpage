
import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';
import Logo from '@/components/layout/Logo';

const SocialLinks: React.FC = () => {
  return (
    <div>
      <div className="mb-4">
        <Logo isScrolled={true} />
      </div>
      <p className="text-muted-foreground mb-6">
        The exclusive platform for real estate professionals to connect, share listings, and close more deals.
      </p>
      <div className="flex gap-4">
        <a href="https://instagram.com/realbrokernetwork/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-realtor-600 transition-colors">
          <Instagram className="h-5 w-5" />
        </a>
        <a href="https://www.linkedin.com/company/getrealbroker/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-realtor-600 transition-colors">
          <Linkedin className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
