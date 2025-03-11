
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';
import { Button } from '@/components/ui/button';
import RevealAnimation from '@/components/ui/RevealAnimation';
import GlassCard from '@/components/ui/GlassCard';

const SmartAgreements: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 md:px-6 mb-16">
          <RevealAnimation>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-realtor-600 to-red-700 bg-clip-text text-transparent">
              RB Smart Agreements
            </h1>
          </RevealAnimation>
        </section>

        {/* Overview Section */}
        <section className="container mx-auto px-4 md:px-6 mb-16">
          <RevealAnimation>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Real Broker's Smart Agreements are digital contracts enhanced with blockchain technology to provide
                security, transparency, and efficiency. Using them is simple, the entire real estate transaction is
                processed digitally, with less paperwork, automated tasks, and better monitoring of every activity.
              </p>
              <p>
                Smart Agreements use blockchain technology to guarantee security. The agreements can never be
                changed without permission, and signatures are verified with special encrypted codes. Everything is
                stored securely, and each step is recorded permanently.
              </p>
              <p>
                Smart Agreements are user-friendly, following familiar real estate procedures. Real estate professionals
                don't need to learn new processes and clients don't need any special knowledge. The agreements
                follow the same format as traditional contracts.
              </p>
              <p>
                Smart Agreements are legal documents with digital signatures that are recognized by law and can be
                enforced in court. Each agreement is verified for compliance to make sure it follows the correct rules and
                processes before it can be finalized.
              </p>
            </div>
          </RevealAnimation>
        </section>

        {/* Key Benefits Section */}
        <section className="container mx-auto px-4 md:px-6 mb-16 bg-gray-50 dark:bg-gray-900 py-12 rounded-xl">
          <RevealAnimation>
            <h2 className="text-3xl font-bold mb-12 text-center">Key Benefits</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <GlassCard className="p-6 rounded-xl bg-white/70 dark:bg-gray-800/70" hoverEffect>
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-xl font-bold mb-2">Enhanced Security</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Smart Agreements use blockchain technology to guarantee improved security. The agreements can
                    never be changed without permission, and signatures are verified with special encrypted codes.
                    Everything is stored securely, and each step is recorded permanently.
                  </p>
                </div>
              </GlassCard>
              
              <GlassCard className="p-6 rounded-xl bg-white/70 dark:bg-gray-800/70" hoverEffect>
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-xl font-bold mb-2">User-Friendly</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Smart Agreements are user-friendly, following familiar real estate procedures. Real estate
                    professionals don't need to learn new processes and clients don't need any special knowledge. The
                    agreements follow the same format as traditional contracts.
                  </p>
                </div>
              </GlassCard>
              
              <GlassCard className="p-6 rounded-xl bg-white/70 dark:bg-gray-800/70" hoverEffect>
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-xl font-bold mb-2">Legal Validity</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Smart Agreements are legal documents with digital signatures that are recognized by law and can be
                    enforced in court. Each agreement is verified for compliance to make sure it follows the correct rules
                    and processes before it can be finalized.
                  </p>
                </div>
              </GlassCard>
              
              <GlassCard className="p-6 rounded-xl bg-white/70 dark:bg-gray-800/70" hoverEffect>
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-xl font-bold mb-2">Automated Tasks</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Many routine tasks like collecting signatures, sending notifications, and verifying documents are
                    automated, saving time and reducing errors.
                  </p>
                </div>
              </GlassCard>
              
              <GlassCard className="p-6 rounded-xl bg-white/70 dark:bg-gray-800/70" hoverEffect>
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-xl font-bold mb-2">Real-Time Information</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    The digital system allows checking the status of agreements, downloading documents, and
                    communicating with other parties quickly and easily. Problems are identified and resolved faster.
                  </p>
                </div>
              </GlassCard>
              
              <GlassCard className="p-6 rounded-xl bg-white/70 dark:bg-gray-800/70" hoverEffect>
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-xl font-bold mb-2">Cost Savings</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    With less paperwork, fewer physical meetings, and reduced administrative time, Smart Agreements
                    can lower costs for all parties involved in the real estate transaction.
                  </p>
                </div>
              </GlassCard>
            </div>
          </RevealAnimation>
        </section>
        
        {/* Using Smart Agreements Section */}
        <section className="container mx-auto px-4 md:px-6 mb-16">
          <RevealAnimation>
            <h2 className="text-3xl font-bold mb-8 border-b pb-4 border-realtor-200">Using Smart Agreements</h2>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                <strong>Creating an agreement is simple:</strong> Choose the appropriate template, enter the required information, and the Smart Agreement system will generate the document. You can review and make any necessary adjustments before proceeding.
              </p>
              <p>
                <strong>Signing is secure and convenient:</strong> All parties receive a secure link to review and sign the agreement. The system verifies identities and records each signature with a timestamp and unique identifier.
              </p>
              <p>
                <strong>Monitoring is straightforward:</strong> Track the progress of your agreement through a user-friendly dashboard. The system automatically notifies relevant parties when actions are required or when milestones are reached.
              </p>
              <p>
                <strong>Safe storage and easy access:</strong> All documents are securely stored and can be accessed anytime through our platform. The blockchain technology ensures that records cannot be altered or deleted, providing a permanent and verifiable history.
              </p>
            </div>
          </RevealAnimation>
        </section>
        
        {/* CTA Section */}
        <section className="container mx-auto px-4 md:px-6">
          <RevealAnimation>
            <div className="bg-gradient-to-r from-realtor-600 to-red-700 rounded-xl p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Experience the future of real estate transactions</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Contact your Real Broker agent today to learn more about using Smart Agreements for your next real estate transaction.
              </p>
              <Button size="lg" className="bg-white text-realtor-600 hover:bg-gray-100">
                Contact Us
              </Button>
            </div>
          </RevealAnimation>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SmartAgreements;
