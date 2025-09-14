
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLocation, Link, useNavigate } from 'react-router-dom';

interface NavLinksProps {
  handleSectionNavigation: (sectionId: string) => void;
  isActive: (path: string) => boolean;
  isMobile?: boolean;
  onItemClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ 
  handleSectionNavigation, 
  isActive, 
  isMobile = false,
  onItemClick
}) => {
  const textSizeClass = isMobile ? "text-lg" : "text-sm";
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleClick = (sectionId: string) => {
    handleSectionNavigation(sectionId);
    if (onItemClick) onItemClick();
  };

  const navigateToPage = (path: string) => {
    navigate(path);
    if (onItemClick) onItemClick();
  };

  return (
    <>
      <button 
        onClick={() => {
          // Navigate to members page
          navigate('/members');
          if (onItemClick) onItemClick();
        }}
        className={cn(
          `${textSizeClass} font-medium transition-colors bg-transparent border-none cursor-pointer p-0`,
          isActive('/members') 
            ? "text-realtor-600 font-semibold" 
            : "text-gray-700 hover:text-realtor-600"
        )}
      >
        Meet our Members
      </button>
      <a 
        href="https://my.realbroker.app/login"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          `${textSizeClass} font-medium transition-colors text-gray-700 hover:text-realtor-600`
        )}
      >
        Member Login
      </a>
      <a 
        href="https://propalyst.com"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          `${textSizeClass} font-medium transition-colors text-gray-700 hover:text-realtor-600`
        )}
      >
        Propalyst.com
      </a>
      <button 
        onClick={() => {
          // Navigate to original page and jump to "testimonials" section
          navigate('/original?section=testimonials');
          if (onItemClick) onItemClick();
        }}
        className={cn(
          `${textSizeClass} font-medium transition-colors bg-transparent border-none cursor-pointer p-0`,
          isActive('/#testimonials') 
            ? "text-realtor-600 font-semibold" 
            : "text-gray-700 hover:text-realtor-600"
        )}
      >
        Testimonials
      </button>
      <button 
        onClick={() => handleClick("invite")}
        className={cn(
          "p-0 border-none bg-transparent",
          isMobile && "w-full max-w-xs"
        )}
      >
        <Button 
          variant="default" 
          size={isMobile ? "lg" : "sm"} 
          className={cn(
            "bg-realtor-600 hover:bg-realtor-700 shadow-md",
            isMobile && "w-full"
          )}
        >
          Request Invite
        </Button>
      </button>
    </>
  );
};

export default NavLinks;
