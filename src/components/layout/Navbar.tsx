
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a 
            href="#" 
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
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium hover:text-realtor-600 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-realtor-600 transition-colors">
              How it Works
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:text-realtor-600 transition-colors">
              Testimonials
            </a>
            <Button variant="default" size="sm" className="bg-realtor-600 hover:bg-realtor-700">
              Request Invite
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-0 top-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transition-transform duration-300 md:hidden',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8 p-4">
          <a 
            href="#features" 
            className="text-lg font-medium hover:text-realtor-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            className="text-lg font-medium hover:text-realtor-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            How it Works
          </a>
          <a 
            href="#testimonials" 
            className="text-lg font-medium hover:text-realtor-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Testimonials
          </a>
          <Button 
            variant="default" 
            size="lg" 
            className="bg-realtor-600 hover:bg-realtor-700 w-full max-w-xs"
            onClick={() => setIsMenuOpen(false)}
          >
            Request Invite
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
