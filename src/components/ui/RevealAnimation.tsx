import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
interface RevealAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}
const RevealAnimation: React.FC<RevealAnimationProps> = ({
  children,
  className,
  delay = 0,
  threshold = 0.2,
  direction = 'up'
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('is-revealed');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold,
      rootMargin: '0px 0px -100px 0px'
    });
    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay, threshold]);
  const getDirectionClass = () => {
    switch (direction) {
      case 'up':
        return 'translate-y-8';
      case 'down':
        return '-translate-y-8';
      case 'left':
        return 'translate-x-8';
      case 'right':
        return '-translate-x-8';
      case 'none':
        return '';
      default:
        return 'translate-y-8';
    }
  };
  return <div ref={elementRef} style={{
    transitionDelay: `${delay}ms`
  }} className="w-full flex-row justify-center">
      {children}
    </div>;
};
export default RevealAnimation;