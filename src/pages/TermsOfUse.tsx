
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';

const TermsOfUse: React.FC = () => {
  // Scroll to top on component mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 pt-8">Terms of Use</h1>
          <p className="text-muted-foreground mb-8">Effective Date: January 01, 2025</p>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p>Welcome to "RealBroker". By accessing or using our platform, you agree to comply with and be bound by these Terms of Use. Please read them carefully before proceeding. If you do not agree with these terms, you must not use our platform.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>These Terms of Use constitute a legally binding agreement between you ("user," "you," or "your") and RealBroker ("we," "us," or "our"). By accessing or using our services, you agree to comply with these terms and all applicable laws and regulations.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Eligibility</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be at least 18 years old and capable of entering into a binding agreement to use our services.</li>
              <li>You agree to provide accurate, complete, and current information during registration and to keep your account information updated.</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">3. Services Provided</h2>
            <p>RealBroker.app offers a platform that facilitates collaboration and transactions between real estate professionals. Services include but are not limited to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Broker-to-broker collaboration tools</li>
              <li>Access to property listings</li>
              <li>Communication tools (e.g., chat and messaging)</li>
              <li>Marketplace for matching brokers with buyers and sellers</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Account Responsibility</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.</li>
              <li>Notify us immediately of any unauthorized access or breach of security.</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Permitted Use</h2>
            <p>You agree to use RealBroker.app for lawful purposes only and in compliance with all applicable laws. Prohibited activities include, but are not limited to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Posting false, misleading, or fraudulent information.</li>
              <li>Sharing or distributing content without proper authorization.</li>
              <li>Engaging in activities that harm or disrupt the platform or other users.</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Listing Content and Intellectual Property</h2>
            <p>Users are responsible for ensuring the accuracy and legality of any property listings or other content they upload to the platform.</p>
            <p>All content, trademarks, and intellectual property on RealBroker.app remain the property of RealBroker or its licensors. Users may not copy, modify, or distribute our intellectual property without prior written consent.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">7. Fees and Payment</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>RealBroker may charge fees for specific services. These fees will be clearly disclosed before you use the service.</li>
              <li>All payments made to RealBroker are non-refundable unless explicitly stated otherwise.</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">8. Dispute Resolution</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>RealBroker is not responsible for disputes between users (e.g., brokers).</li>
              <li>However, we may, at our discretion, mediate disputes to the extent possible.</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">9. Limitation of Liability</h2>
            <p>RealBroker shall not be held liable for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Loss of revenue, profit, or data due to your use of the platform.</li>
              <li>Any unauthorized access to your account caused by your failure to safeguard your credentials.</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">10. Termination of Use</h2>
            <p>RealBroker reserves the right to suspend or terminate your account at any time for violations of these terms or any illegal activity.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">11. Privacy</h2>
            <p>Our use of your personal information is governed by our Privacy Policy. Please review it to understand how we collect, use, and protect your data.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">12. Changes to Terms</h2>
            <p>We may update these Terms of Use from time to time. Significant changes will be communicated through the platform or via email. Continued use of the platform after such updates constitutes acceptance of the revised terms.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">13. Contact Us</h2>
            <p>For questions or concerns about these Terms of Use, please contact us at:</p>
            <p>Email: <a href="mailto:support@realbroker.app" className="text-realtor-600 hover:underline">support@realbroker.app</a></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfUse;
