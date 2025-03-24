
// Type definitions for Google Analytics gtag.js
interface Window {
  dataLayer: any[];
  gtag: (
    command: 'config' | 'event' | 'js' | 'set', 
    targetId: string | Date, 
    config?: Record<string, any>
  ) => void;
}
