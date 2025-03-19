
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
          <span className="text-4xl font-extrabold" style={{ letterSpacing: "-0.05em" }}>R</span>
          <span className="text-4xl font-extrabold" style={{ letterSpacing: "-0.05em", marginLeft: "-0.15em" }}>B</span>
        </div>
        <div className={cn(
          "ml-2 text-realtor-600 font-bold uppercase transition-opacity",
          isScrolled ? "opacity-100" : "opacity-0 md:opacity-100",
        )}>
          <div className="text-sm leading-none">REAL</div>
          <div className="text-sm leading-none">BROKER</div>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
