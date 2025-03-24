// Define our heading variants
export type HeadingVariant = {
  id: number;
  title: string;
  subtitle: string;
};

export const headingVariants: HeadingVariant[] = [
  {
    id: 1,
    title: "Access more property supply in your market,",
    subtitle: "Share your deals, Grow your business",
  },
  {
    id: 2,
    title: "Expand your real estate network today,",
    subtitle: "Connect with verified brokers, Close more deals",
  },
  {
    id: 3,
    title: "Unlock exclusive property listings,",
    subtitle: "Build strategic partnerships, Increase your revenue",
  },
];

// Retrieve the selected heading variant from localStorage or select a random one
export const getHeadingVariant = (): HeadingVariant => {
  // Check if we already have a stored variant
  const storedVariantId = localStorage.getItem('heading_variant_id');
  
  if (storedVariantId) {
    const variantId = parseInt(storedVariantId, 10);
    const foundVariant = headingVariants.find(variant => variant.id === variantId);
    
    // If we have a valid variant, return it
    if (foundVariant) {
      return foundVariant;
    }
  }
  
  // Otherwise, select a random variant
  const randomIndex = Math.floor(Math.random() * headingVariants.length);
  const selectedVariant = headingVariants[randomIndex];
  
  // Store the selected variant ID in localStorage
  localStorage.setItem('heading_variant_id', selectedVariant.id.toString());
  
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
