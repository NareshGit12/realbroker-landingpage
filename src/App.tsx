import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import ScrollToTop from "./components/layout/ScrollToTop";
import { trackPageView } from "./utils/analytics";
import Page1 from "./pages/Page1";

// The home page ships in the main bundle; every other page loads on demand.
const MeetOurMembers = lazy(() => import("./pages/MeetOurMembers"));
const Product = lazy(() => import("./pages/Product"));
const Agreements = lazy(() => import("./pages/Agreements"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CharterAndConduct = lazy(() => import("./pages/CharterAndConduct"));
const Charter = lazy(() => import("./pages/Charter"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminHTMLGeneration = lazy(() => import("./pages/AdminHTMLGeneration"));
const AdminShell = lazy(() => import("./components/AdminShell"));

// Track page views when route changes
const PageViewTracker = () => {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);
  return null;
};

const PageFallback = () => <div className="lp" />;

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <PageViewTracker />
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/members" element={<MeetOurMembers />} />
        <Route path="/product" element={<Product />} />
        <Route path="/agreements" element={<Agreements />} />
        {/* Old addresses */}
        <Route path="/tools" element={<Navigate to="/product" replace />} />
        <Route path="/smart-agreements" element={<Navigate to="/agreements" replace />} />
        <Route path="/certified-realbroker" element={<Navigate to="/" replace />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/charter-and-conduct" element={<CharterAndConduct />} />
        <Route path="/charter" element={<Charter />} />
        <Route path="/login" element={<AdminShell><Login /></AdminShell>} />
        <Route path="/admin" element={<AdminShell protect><Admin /></AdminShell>} />
        <Route path="/admin/html-generation" element={<AdminShell protect><AdminHTMLGeneration /></AdminShell>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
