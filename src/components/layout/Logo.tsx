
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  isScrolled: boolean;
}

const Logo: React.FC<LogoProps> = ({ isScrolled }) => {
  const navigate = useNavigate();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/'); // Navigate to the root path (Home2)
  };

  return (
    <a 
      href="/" 
      onClick={handleLogoClick}
      className="flex items-center gap-2 text-2xl font-bold text-realtor-600"
    >
      <div className="flex items-center">
        <div className="text-realtor-600 font-bold flex items-center">
          <img 
            src="/lovable-uploads/aee5ebaa-b383-4ca3-9647-ab8921ed5030.png" 
            alt="RB Logo" 
            className="h-12 w-auto" 
          />
        </div>
        <div className={cn(
          "ml-2 text-realtor-600 font-bold uppercase",
          isScrolled ? "opacity-100" : "opacity-100", // Changed from opacity-0 to opacity-100 to always show
        )}>
          <div className="text-sm leading-none">REAL</div>
          <div className="text-sm leading-none">BROKER</div>
        </div>
      </div>
    </a>
  );
};

export default Logo;
