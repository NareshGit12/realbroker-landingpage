
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLocation, Link } from 'react-router-dom';

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
  
  const handleClick = (path: string) => {
    // If it's a section on Home2
    if (path === "features") {
      handleSectionNavigation("features");
    } 
    // If it's a section on the original page
    else if (path === "how-it-works" || path === "testimonials") {
      if (location.pathname === "/original") {
        handleSectionNavigation(path);
      } else {
        // If not on original page, navigate to original with section info
        window.location.href = `/original#${path}`;
      }
    }
    
    if (onItemClick) onItemClick();
  };

  return (
    <>
      <button 
        onClick={() => handleClick("features")}
        className={cn(
          `${textSizeClass} font-medium transition-colors bg-transparent border-none cursor-pointer p-0`,
          isActive('/#features') 
            ? "text-realtor-600 font-semibold" 
            : "text-gray-700 hover:text-realtor-600"
        )}
      >
        Features
      </button>
      <button 
        onClick={() => handleClick("how-it-works")}
        className={cn(
          `${textSizeClass} font-medium transition-colors bg-transparent border-none cursor-pointer p-0`,
          isActive('/original#how-it-works') 
            ? "text-realtor-600 font-semibold" 
            : "text-gray-700 hover:text-realtor-600"
        )}
      >
        How it Works
      </button>
      <button 
        onClick={() => handleClick("testimonials")}
        className={cn(
          `${textSizeClass} font-medium transition-colors bg-transparent border-none cursor-pointer p-0`,
          isActive('/original#testimonials') 
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
