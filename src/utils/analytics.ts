
// This file provides utility functions for Google Analytics tracking

/**
 * Track a page view in Google Analytics
 * @param path The page path to track
 * @param title Optional page title
 */
export const trackPageView = (path: string, title?: string) => {
  if (!window.gtag) return;
  
  window.gtag('config', 'G-CZEK885DCE', {
    page_path: path,
    page_title: title
  });
};

/**
 * Track a custom event in Google Analytics
 * @param eventName The name of the event
 * @param eventParams Additional parameters for the event
 */
export const trackEvent = (
  eventName: string, 
  eventParams?: Record<string, any>
) => {
  if (!window.gtag) return;
  
  window.gtag('event', eventName, eventParams);
};
