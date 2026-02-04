
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ScrollToTop from "./components/layout/ScrollToTop";
import { trackPageView } from "./utils/analytics";
import SmartAgreements from "./pages/SmartAgreements";
import TermsOfUse from "./pages/TermsOfUse";
import CertifiedRealBroker from "./pages/CertifiedRealBroker";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Page1 from "./pages/Page1";
import NotFound from "./pages/NotFound";
import CharterAndConduct from "./pages/CharterAndConduct";
import Charter from "./pages/Charter";
import MeetOurMembers from "./pages/MeetOurMembers";
import AdminHTMLGeneration from "./pages/AdminHTMLGeneration";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Tools from "./pages/Tools";

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
          <Route path="/" element={<Page1 />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/smart-agreements" element={<SmartAgreements />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/certified-realbroker" element={<CertifiedRealBroker />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/charter-and-conduct" element={<CharterAndConduct />} />
          <Route path="/charter" element={<Charter />} />
          <Route path="/members" element={<MeetOurMembers />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin>
                <Admin />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/html-generation" 
            element={
              <ProtectedRoute requireAdmin>
                <AdminHTMLGeneration />
              </ProtectedRoute>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
