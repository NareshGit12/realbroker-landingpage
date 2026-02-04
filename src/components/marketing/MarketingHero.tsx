import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import RevealAnimation from "@/components/ui/RevealAnimation";

const headings = [
  "A smarter way for brokers to work together",
  "Manage listings, requirements & deals in one place",
  "Build your brand, not just your listings",
];

const MarketingHero: React.FC = () => {
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);

  useEffect(() => {
    // Set up the carousel to rotate every 5 seconds
    const interval = setInterval(() => {
      setCurrentHeadingIndex((prevIndex) => (prevIndex + 1) % headings.length);
    }, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Format the heading to ensure it always displays on two lines
  const formatHeadingForDisplay = (heading: string) => {
    const parts = heading.split("\n");
    if (parts.length === 2) {
      // Return the heading words before the last word and the last word separately
      return {
        mainText: parts[0],
        highlightText: parts[1],
      };
    } else {
      // If there's no explicit line break, find a suitable spot to break the heading
      const words = heading.split(" ");
      const breakPoint = Math.ceil(words.length / 2);

      return {
        mainText: words.slice(0, breakPoint).join(" "),
        highlightText: words.slice(breakPoint).join(" "),
      };
    }
  };

  const currentHeading = formatHeadingForDisplay(headings[currentHeadingIndex]);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-20 pb-10 bg-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-neutral-50 z-[-2]"></div>

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="flex flex-col items-center justify-center gap-6 md:gap-10">
          <div className="text-center w-full max-w-3xl mx-auto">
            <RevealAnimation>
              <div className="inline-block py-1 px-3 mb-6 text-xs font-medium uppercase tracking-wider bg-realtor-50 text-realtor-600 border border-realtor-100 rounded-full">
                By Invitation Only
              </div>
            </RevealAnimation>

            <RevealAnimation delay={100}>
              <div className="h-[120px] md:h-[150px] flex items-center justify-center">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight font-playfair transition-opacity duration-500">
                  <span className="text-gray-900">{currentHeading.mainText}</span>
                  <br className="block" />
                  <span className="text-realtor-600">{currentHeading.highlightText}</span>
                </h1>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={200}>
              <p className="text-lg md:text-xl text-gray-600 mb-6 mx-auto max-w-2xl">
                RealBroker is a network of Quality agents, with technology to make your workflow faster, smarter, and
                more connected..
              </p>
            </RevealAnimation>

          </div>

          <RevealAnimation delay={300}>
            <div className="w-full flex flex-col justify-center items-center mt-2">
              <div className="max-w-[1200px] w-full mx-auto px-4">
                <div className="relative rounded-2xl overflow-hidden mx-auto">
                  <img
                    src="https://ayxhtlzyhpsjykxxnqqh.supabase.co/storage/v1/object/public/public/screens/rb_dashboard.png"
                    alt="RealBroker Dashboard"
                    className="w-full h-auto mx-auto"
                    loading="lazy"
                  />
                </div>
                <h2 className="text-center text-2xl md:text-3xl font-bold mt-8 font-playfair">
                  <span className="text-gray-900">Efficient Dashboard to </span>
                  <span className="text-realtor-600">stay on top of network activity</span>
                </h2>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default MarketingHero;
