
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
        hoverEffect && "hover-scale",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
