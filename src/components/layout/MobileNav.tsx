
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import NavLinks from './NavLinks';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from '@/components/ui/scroll-area';

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
  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <Sheet open={isMenuOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <SheetContent
        side="right"
        className="bg-gradient-to-b from-realtor-50 to-realtor-100 dark:from-realtor-900 dark:to-realtor-950 border-l-realtor-200 dark:border-l-realtor-800 p-0 w-3/4 md:hidden"
      >
        <ScrollArea className="h-full w-full">
          <div className="flex flex-col items-center justify-center h-full px-4 py-8">
            <Link 
              to="/smart-agreements" 
              className={cn(
                "text-lg font-medium transition-colors mb-10",
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
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
