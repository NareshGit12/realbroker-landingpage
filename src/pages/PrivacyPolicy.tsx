
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';

const PrivacyPolicy: React.FC = () => {
  // Scroll to top on component mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 pt-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Effective Date: May 01, 2025</p>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p>Welcome to RealBroker ("we," "our," or "us"). RealBroker is an invite-only platform designed to help real estate professionals in India collaborate, share inventory, and close deals efficiently. This Privacy Policy outlines how we collect, use, and protect your personal information.</p>
            <p>By using our website or mobile application, you agree to the terms of this Privacy Policy.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
            <p>Welcome to RealBroker ("we," "our," or "us"). RealBroker is an invite-only platform designed to help real estate professionals in India collaborate, share inventory, and close deals efficiently. This Privacy Policy outlines how we collect, use, and protect your personal information.</p>
            <p>By using our website or mobile application, you agree to the terms of this Privacy Policy.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>
            <p>We collect the following types of information:</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-2">Personal Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email address, phone number</li>
              <li>Business name and license information</li>
              <li>Profile photo and biography</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-2">Usage Data</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address, device info, browser type</li>
              <li>Pages visited, time spent, clicks and interactions</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-2">Communications</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Messages sent through the platform</li>
              <li>Calls and emails made via the app (if integrated)</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
            <p>We use your data to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and improve RealBroker services</li>
              <li>Match and connect you with relevant brokers</li>
              <li>Facilitate inventory sharing and communication</li>
              <li>Respond to inquiries and offer support</li>
              <li>Personalize your experience</li>
              <li>Comply with legal obligations</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Sharing Your Information</h2>
            <p>We do not sell your personal data.</p>
            <p>We may share information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Trusted third-party service providers (e.g., cloud hosting, analytics)</li>
              <li>Other RealBroker users (limited to information required for collaboration)</li>
              <li>Law enforcement, when legally required</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Cookies and Tracking</h2>
            <p>We use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Understand user behavior</li>
              <li>Provide essential site features</li>
              <li>Improve platform performance</li>
            </ul>
            <p>You can manage cookie preferences through your browser settings.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Your Rights and Choices</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access or correct your personal information</li>
              <li>Delete your account or request deletion of data</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <p>To exercise these rights, email us at: privacy@realbroker.app</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">7. Data Security</h2>
            <p>We use industry-standard security measures (e.g., encryption, access control) to protect your data. However, no method of transmission over the internet is 100% secure.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">8. Third-Party Links</h2>
            <p>Our platform may link to external sites (e.g., Instagram, Facebook, YouTube). We are not responsible for their privacy practices.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">9. Children's Privacy</h2>
            <p>RealBroker is not intended for individuals under the age of 18. We do not knowingly collect data from minors.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">10. Updates to This Policy</h2>
            <p>We may update this policy from time to time. The latest version will be posted on our website with the updated date.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">11. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, contact us at:</p>
            <p className="font-medium">RealBroker</p>
            <p>Email: Privacy@realbroker.app</p>
            <p>Phone: 77600 48805</p>
            <p>Address:</p>
            <p className="pl-4">
              C/o Antler India<br />
              732, 3rd Floor, Chinmaya Mission Hospital Rd,<br />
              Indira Nagar 1st Stage, Stage 1, Indiranagar,<br />
              Bengaluru, Karnataka 560038
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
