
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ScrollToTop from "./components/layout/ScrollToTop";
import { trackPageView } from "./utils/analytics";
import Index from "./pages/Index";
import SmartAgreements from "./pages/SmartAgreements";
import TermsOfUse from "./pages/TermsOfUse";
import CertifiedRealBroker from "./pages/CertifiedRealBroker";
import Analytics from "./pages/Analytics";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Home2 from "./pages/Home2";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Pricing from "./pages/Pricing";
import Faq from "./pages/Faq";
import Support from "./pages/Support";
import CharterAndConduct from "./pages/CharterAndConduct";
import Charter from "./pages/Charter";

// Track page views when route changes
const PageViewTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);
  
  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <PageViewTracker />
        <Routes>
          <Route path="/" element={<Home2 />} />
          <Route path="/original" element={<Index />} />
          <Route path="/smart-agreements" element={<SmartAgreements />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/certified-realbroker" element={<CertifiedRealBroker />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/home2" element={<Home2 />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/support" element={<Support />} />
          <Route path="/charter-and-conduct" element={<CharterAndConduct />} />
          <Route path="/charter" element={<Charter />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
