
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/layout/ScrollToTop";
import Index from "./pages/Index";
import SmartAgreements from "./pages/SmartAgreements";
import TermsOfUse from "./pages/TermsOfUse";
import CertifiedRealBroker from "./pages/CertifiedRealBroker";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/smart-agreements" element={<SmartAgreements />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/certified-realbroker" element={<CertifiedRealBroker />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
