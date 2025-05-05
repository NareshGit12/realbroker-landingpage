
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-12 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
          
          <div className="text-sm text-muted-foreground mb-8">
            <p>Effective Date: May 01 2025</p>
            <p>Last Updated: May 01 2025</p>
          </div>
          
          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Introduction</h2>
              <p className="mb-4">
                Welcome to RealBroker ("we," "our," or "us"). RealBroker is an invite-only platform designed to help real estate professionals in India collaborate, share inventory, and close deals efficiently. This Privacy Policy outlines how we collect, use, and protect your personal information.
              </p>
              <p>By using our website or mobile application, you agree to the terms of this Privacy Policy.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Information We Collect</h2>
              <p className="mb-2">We collect the following types of information:</p>
              
              <h3 className="text-xl font-medium mb-2 text-gray-800">Personal Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Name, email address, phone number</li>
                <li>Business name and license information</li>
                <li>Profile photo and biography</li>
              </ul>
              
              <h3 className="text-xl font-medium mb-2 text-gray-800">Usage Data</h3>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>IP address, device info, browser type</li>
                <li>Pages visited, time spent, clicks and interactions</li>
              </ul>
              
              <h3 className="text-xl font-medium mb-2 text-gray-800">Communications</h3>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Messages sent through the platform</li>
                <li>Calls and emails made via the app (if integrated)</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. How We Use Your Information</h2>
              <p className="mb-2">We use your data to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide and improve RealBroker services</li>
                <li>Match and connect you with relevant brokers</li>
                <li>Facilitate inventory sharing and communication</li>
                <li>Respond to inquiries and offer support</li>
                <li>Personalize your experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Sharing Your Information</h2>
              <p className="mb-2">We do not sell your personal data.</p>
              <p className="mb-2">We may share information with:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Trusted third-party service providers (e.g., cloud hosting, analytics)</li>
                <li>Other RealBroker users (limited to information required for collaboration)</li>
                <li>Law enforcement, when legally required</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Cookies and Tracking</h2>
              <p className="mb-2">We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Understand user behavior</li>
                <li>Provide essential site features</li>
                <li>Improve platform performance</li>
              </ul>
              <p>You can manage cookie preferences through your browser settings.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Your Rights and Choices</h2>
              <p className="mb-2">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Access or correct your personal information</li>
                <li>Delete your account or request deletion of data</li>
                <li>Opt out of marketing communications</li>
              </ul>
              <p>To exercise these rights, email us at: privacy@realbroker.app</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Data Security</h2>
              <p>
                We use industry-standard security measures (e.g., encryption, access control) to protect your data. 
                However, no method of transmission over the internet is 100% secure.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. Third-Party Links</h2>
              <p>
                Our platform may link to external sites (e.g., Instagram, Facebook, YouTube). 
                We are not responsible for their privacy practices.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">9. Children's Privacy</h2>
              <p>
                RealBroker is not intended for individuals under the age of 18. 
                We do not knowingly collect data from minors.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">10. Updates to This Policy</h2>
              <p>
                We may update this policy from time to time. The latest version will be posted 
                on our website with the updated date.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">11. Contact Us</h2>
              <p className="mb-2">If you have questions about this Privacy Policy, contact us at:</p>
              <address className="not-italic">
                <p className="font-medium">RealBroker</p>
                <p>Email: Privacy@realbroker.in</p>
                <p>Phone: 77600 48805</p>
                <p>Address:</p>
                <p className="pl-4">
                  C/o Antler India<br />
                  732, 3rd Floor, Chinmaya Mission Hospital Rd,<br />
                  Indira Nagar 1st Stage, Stage 1, Indiranagar,<br />
                  Bengaluru, Karnataka 560038
                </p>
              </address>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
