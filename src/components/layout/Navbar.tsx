
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  // Check if a given path is active or if we're on that path
  const isActive = (path: string) => {
    if (path.startsWith('/#')) {
      // For homepage anchors, only consider active on the home page
      return location.pathname === '/' && location.hash === path.substring(1);
    }
    return location.pathname === path;
  };

  // Handle navigation to sections - improved to work from any page
  const handleSectionNavigation = (sectionId: string) => {
    if (location.pathname === '/') {
      // If already on home page, just scroll to the section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on another page, navigate to home with the section info
      navigate('/', { state: { scrollTo: sectionId } });
    }
    
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/smart-agreements" 
              className={cn(
                "text-sm font-medium transition-colors",
                isActive('/smart-agreements') 
                  ? "text-realtor-600 font-semibold" 
                  : "hover:text-realtor-600"
              )}
            >
              Smart Agreements
            </Link>
            <button 
              onClick={() => handleSectionNavigation("features")}
              className={cn(
                "text-sm font-medium transition-colors bg-transparent border-none cursor-pointer p-0",
                isActive('/#features') 
                  ? "text-realtor-600 font-semibold" 
                  : "hover:text-realtor-600"
              )}
            >
              Features
            </button>
            <button 
              onClick={() => handleSectionNavigation("how-it-works")}
              className={cn(
                "text-sm font-medium transition-colors bg-transparent border-none cursor-pointer p-0",
                isActive('/#how-it-works') 
                  ? "text-realtor-600 font-semibold" 
                  : "hover:text-realtor-600"
              )}
            >
              How it Works
            </button>
            <button 
              onClick={() => handleSectionNavigation("testimonials")}
              className={cn(
                "text-sm font-medium transition-colors bg-transparent border-none cursor-pointer p-0",
                isActive('/#testimonials') 
                  ? "text-realtor-600 font-semibold" 
                  : "hover:text-realtor-600"
              )}
            >
              Testimonials
            </button>
            <button 
              onClick={() => handleSectionNavigation("invite")}
              className="p-0 border-none bg-transparent"
            >
              <Button variant="default" size="sm" className="bg-realtor-600 hover:bg-realtor-700">
                Request Invite
              </Button>
            </button>
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
          <Link 
            to="/smart-agreements" 
            className={cn(
              "text-lg font-medium transition-colors",
              isActive('/smart-agreements') 
                ? "text-realtor-600 font-semibold" 
                : "hover:text-realtor-600"
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            Smart Agreements
          </Link>
          <button 
            onClick={() => handleSectionNavigation("features")}
            className={cn(
              "text-lg font-medium transition-colors bg-transparent border-none cursor-pointer p-0",
              isActive('/#features') 
                ? "text-realtor-600 font-semibold" 
                : "hover:text-realtor-600"
            )}
          >
            Features
          </button>
          <button 
            onClick={() => handleSectionNavigation("how-it-works")}
            className={cn(
              "text-lg font-medium transition-colors bg-transparent border-none cursor-pointer p-0",
              isActive('/#how-it-works') 
                ? "text-realtor-600 font-semibold" 
                : "hover:text-realtor-600"
            )}
          >
            How it Works
          </button>
          <button 
            onClick={() => handleSectionNavigation("testimonials")}
            className={cn(
              "text-lg font-medium transition-colors bg-transparent border-none cursor-pointer p-0",
              isActive('/#testimonials') 
                ? "text-realtor-600 font-semibold" 
                : "hover:text-realtor-600"
            )}
          >
            Testimonials
          </button>
          <button 
            onClick={() => handleSectionNavigation("invite")}
            className="p-0 border-none bg-transparent w-full max-w-xs"
          >
            <Button 
              variant="default" 
              size="lg" 
              className="bg-realtor-600 hover:bg-realtor-700 w-full"
            >
              Request Invite
            </Button>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
