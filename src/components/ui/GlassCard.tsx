
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className,
  hoverEffect = false,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "glass-card",
        "border border-red-100 dark:border-red-900/30",
        "shadow-[0_4px_16px_rgba(220,38,38,0.08)]",
        hoverEffect && "hover-scale hover:shadow-[0_8px_24px_rgba(220,38,38,0.12)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
