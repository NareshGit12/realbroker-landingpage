
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import NavLinks from './NavLinks';

interface MobileNavProps {
  isMenuOpen: boolean;
  isActive: (path: string) => boolean;
  handleSectionNavigation: (sectionId: string) => void;
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ 
  isMenuOpen, 
  isActive, 
  handleSectionNavigation,
  onClose
}) => {
  return (
    <div
      className={cn(
        'fixed inset-0 top-16 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md transition-transform duration-300 md:hidden',
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <nav className="flex flex-col items-center justify-center h-full space-y-8 p-4 bg-realtor-50/90 dark:bg-realtor-900/90 rounded-lg shadow-lg m-4 border border-realtor-100 dark:border-realtor-800">
        <Link 
          to="/smart-agreements" 
          className={cn(
            "text-lg font-medium transition-colors",
            isActive('/smart-agreements') 
              ? "text-realtor-600 font-semibold" 
              : "hover:text-realtor-600"
          )}
          onClick={onClose}
        >
          Smart Agreements
        </Link>
        
        {/* Navigation Links */}
        <div className="flex flex-col items-center space-y-8 w-full">
          <NavLinks 
            handleSectionNavigation={handleSectionNavigation}
            isActive={isActive}
            isMobile={true}
            onItemClick={onClose}
          />
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;
