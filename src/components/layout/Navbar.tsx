
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import NavLinks from './NavLinks';
import MobileNav from './MobileNav';

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

  // Handle URL search params for section scrolling
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get('section');
    
    if (section) {
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          
          // Clear the URL parameter after scrolling
          const newUrl = window.location.pathname;
          window.history.replaceState({}, '', newUrl);
        }
      }, 100);
    }
  }, [location.search]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if a given path is active or if we're on that path
  const isActive = (path: string) => {
    if (path.startsWith('/#')) {
      // For homepage anchors, only consider active on the home page
      return (location.pathname === '/' || location.pathname === '/home2') && location.hash === path.substring(1);
    }
    return location.pathname === path;
  };

  // Handle navigation to sections - improved to work from any page
  const handleSectionNavigation = (sectionId: string) => {
    if (location.pathname === '/' || location.pathname === '/home2') {
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
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-realtor-100/50'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Logo isScrolled={isScrolled} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks 
              handleSectionNavigation={handleSectionNavigation}
              isActive={isActive}
            />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none text-realtor-600 hover:text-realtor-700"
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
      <MobileNav 
        isMenuOpen={isMenuOpen}
        isActive={isActive}
        handleSectionNavigation={handleSectionNavigation}
        onClose={() => setIsMenuOpen(false)}
      />
    </header>
  );
};

export default Navbar;
