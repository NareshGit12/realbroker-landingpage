
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  isScrolled: boolean;
}

const Logo: React.FC<LogoProps> = ({ isScrolled }) => {
  return (
    <Link 
      to="/" 
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
          isScrolled ? "opacity-100" : "opacity-100", 
        )}>
          <div className="text-sm leading-none">REAL</div>
          <div className="text-sm leading-none">BROKER</div>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
