
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';
import { FileText, Shield, ClipboardCheck, Key, Link as LinkIcon } from 'lucide-react';
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
            <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Revolutionizing real estate transactions with blockchain-powered smart contracts
            </p>
          </RevealAnimation>
        </section>

        {/* Overview Section */}
        <section className="container mx-auto px-4 md:px-6 mb-16">
          <RevealAnimation>
            <h2 className="text-3xl font-bold mb-8 border-b pb-4 border-realtor-200">Overview</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                RB Smart Agreements is an innovative platform that transforms traditional real estate agreements 
                into blockchain-enabled smart contracts, creating a seamless, secure, and efficient transaction 
                process for all parties involved.
              </p>
              <p>
                Our system combines the legal validity of traditional contracts with the security, transparency, 
                and automation of blockchain technology, resulting in faster closings, reduced costs, and enhanced 
                trust throughout the real estate transaction.
              </p>
            </div>
          </RevealAnimation>
        </section>

        {/* Key Features Section */}
        <section className="container mx-auto px-4 md:px-6 mb-16 bg-gray-50 dark:bg-gray-900 py-12 rounded-xl">
          <RevealAnimation>
            <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <GlassCard className="p-6 rounded-xl bg-white/70 dark:bg-gray-800/70" hoverEffect>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-realtor-100 dark:bg-realtor-900/30 p-3 rounded-full mb-4">
                    <FileText className="h-8 w-8 text-realtor-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Smart Contract Integration</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Legally binding agreements with automated execution and settlement through blockchain technology
                  </p>
                </div>
              </GlassCard>
              
              <GlassCard className="p-6 rounded-xl bg-white/70 dark:bg-gray-800/70" hoverEffect>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-realtor-100 dark:bg-realtor-900/30 p-3 rounded-full mb-4">
                    <Shield className="h-8 w-8 text-realtor-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Enhanced Security</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Immutable blockchain records and advanced encryption protect sensitive transaction data
                  </p>
                </div>
              </GlassCard>
              
              <GlassCard className="p-6 rounded-xl bg-white/70 dark:bg-gray-800/70" hoverEffect>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-realtor-100 dark:bg-realtor-900/30 p-3 rounded-full mb-4">
                    <ClipboardCheck className="h-8 w-8 text-realtor-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Streamlined Transactions</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Automated process reduces paperwork, delays, and friction in the transaction workflow
                  </p>
                </div>
              </GlassCard>
              
              <GlassCard className="p-6 rounded-xl bg-white/70 dark:bg-gray-800/70" hoverEffect>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-realtor-100 dark:bg-realtor-900/30 p-3 rounded-full mb-4">
                    <Key className="h-8 w-8 text-realtor-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Digital Identity Verification</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Secure authentication and verification of all transaction participants
                  </p>
                </div>
              </GlassCard>
              
              <GlassCard className="p-6 rounded-xl bg-white/70 dark:bg-gray-800/70" hoverEffect>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-realtor-100 dark:bg-realtor-900/30 p-3 rounded-full mb-4">
                    <LinkIcon className="h-8 w-8 text-realtor-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Interoperability</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Seamless integration with existing real estate platforms, MLS systems, and financial services
                  </p>
                </div>
              </GlassCard>
            </div>
          </RevealAnimation>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-4 md:px-6 mb-16">
          <RevealAnimation>
            <h2 className="text-3xl font-bold mb-8 border-b pb-4 border-realtor-200">Benefits</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4">For Real Estate Agents</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Faster transaction closings</li>
                  <li>Reduced paperwork and administrative burden</li>
                  <li>Enhanced client trust and satisfaction</li>
                  <li>Competitive advantage in the marketplace</li>
                  <li>Automated commission disbursement</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">For Buyers and Sellers</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Transparent transaction process</li>
                  <li>Reduced closing costs</li>
                  <li>Enhanced security and fraud protection</li>
                  <li>Faster closings with fewer delays</li>
                  <li>Digital records of all transaction documents</li>
                </ul>
              </div>
            </div>
          </RevealAnimation>
        </section>
        
        {/* How It Works Section */}
        <section className="container mx-auto px-4 md:px-6 mb-16">
          <RevealAnimation>
            <h2 className="text-3xl font-bold mb-8 border-b pb-4 border-realtor-200">How It Works</h2>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-realtor-100 dark:bg-realtor-900/30 h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">1</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Agreement Creation</h3>
                  <p>Agents create agreements using familiar templates enhanced with smart contract capabilities</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-realtor-100 dark:bg-realtor-900/30 h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">2</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Digital Signatures</h3>
                  <p>All parties securely sign documents with blockchain-verified digital signatures</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-realtor-100 dark:bg-realtor-900/30 h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">3</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Smart Contract Activation</h3>
                  <p>Upon signing, the agreement is converted to a blockchain-enabled smart contract</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-realtor-100 dark:bg-realtor-900/30 h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">4</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Automated Execution</h3>
                  <p>Contract terms are automatically executed when predefined conditions are met</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-realtor-100 dark:bg-realtor-900/30 h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">5</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Secure Settlement</h3>
                  <p>Funds are securely transferred and transaction recorded permanently on the blockchain</p>
                </div>
              </div>
            </div>
          </RevealAnimation>
        </section>
        
        {/* CTA Section */}
        <section className="container mx-auto px-4 md:px-6">
          <RevealAnimation>
            <div className="bg-gradient-to-r from-realtor-600 to-red-700 rounded-xl p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Real Estate Business?</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Join the future of real estate transactions with RB Smart Agreements.
              </p>
              <Button size="lg" className="bg-white text-realtor-600 hover:bg-gray-100">
                Request Early Access
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
