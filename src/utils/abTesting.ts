
// Define our heading variants
export type HeadingVariant = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
};

export const headingVariants: HeadingVariant[] = [
  {
    id: 1,
    title: "Access more property supply in your market,",
    subtitle: "Share your deals, Grow your business",
    description: "Expand your inventory through your network",
  },
  {
    id: 2,
    title: "Expand your real estate network today,",
    subtitle: "Connect with verified brokers, Close more deals",
    description: "Find exclusive opportunities through trusted connections",
  },
  {
    id: 3,
    title: "Unlock exclusive property listings,",
    subtitle: "Build strategic partnerships, Increase your revenue",
    description: "Access off-market properties you won't find anywhere else",
  },
  {
    id: 4,
    title: "RealBroker helps you collaborate with other trusted brokers",
    subtitle: "Grow your business by building a trusted network,",
    description: "Automatically create commission sharing agreements",
  },
];

// Retrieve a heading variant - now shows different messages on refresh
export const getHeadingVariant = (): HeadingVariant => {
  // Always select a random variant on each page load/refresh
  const randomIndex = Math.floor(Math.random() * headingVariants.length);
  const selectedVariant = headingVariants[randomIndex];
  
  // Store the selected variant ID in localStorage
  localStorage.setItem('heading_variant_id', selectedVariant.id.toString());
  
  // Track this variant view in analytics
  if (window.gtag) {
    window.gtag('event', 'view_heading_variant', {
      'heading_variant_id': selectedVariant.id,
      'heading_title': selectedVariant.title
    });
  }
  
  return selectedVariant;
};

// Get the current heading variant ID (useful for form submissions)
export const getCurrentHeadingVariantId = (): number => {
  const storedVariantId = localStorage.getItem('heading_variant_id');
  
  if (storedVariantId) {
    return parseInt(storedVariantId, 10);
  }
  
  // If no variant is stored, this should never happen if getHeadingVariant is called first
  // But just in case, return the first variant ID
  return headingVariants[0].id;
};
