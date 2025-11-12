
import React from 'react';
import NewsletterSubscription from './footer/NewsletterSubscription';
import FooterNavigation from './footer/FooterNavigation';
import SocialLinks from './footer/SocialLinks';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-16 pb-8 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Newsletter Section */}
        <NewsletterSubscription />
        
        {/* Divider */}
        <div className="border-t border-gray-200 mb-12"></div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1 */}
          <SocialLinks />
          
          {/* Columns 2-4 */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3">
            <FooterNavigation />
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} RealBroker.app. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
