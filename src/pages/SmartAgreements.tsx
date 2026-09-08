
import React from 'react';
import Seo from '@/components/seo/Seo';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';
import RevealAnimation from '@/components/ui/RevealAnimation';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { FileText, Users, Pen, Archive, Shield, Clock, Award, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SmartAgreements: React.FC = () => {
  return (
    <>
      <Seo title="Smart Agreements | Co-Broking Made Simple" description="Digital co-broking agreements for RealBroker members: clear ownership, agreed splits, and a secure record of every partnered deal." path="/smart-agreements" />
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
          <RevealAnimation delay={200}>
            <p className="text-xl md:text-2xl text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
              Lock In Your Deals with Digital Agreements—Fast, Secure, & Hassle-Free!
            </p>
          </RevealAnimation>
        </section>

        {/* Stop Losing Deals Section */}
        <section className="container mx-auto px-4 md:px-6 mb-16">
          <RevealAnimation>
            <GlassCard className="p-8 rounded-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
                <span className="text-realtor-600">🔒</span> Stop Losing Deals Due to Unclear Agreements
              </h2>
              <p className="mb-4 text-lg">Brokers often face issues like:</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">❌</span> 
                  <span>Losing buyers to other brokers because there's no exclusivity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">❌</span> 
                  <span>Disputes over commission splits with co-brokers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">❌</span> 
                  <span>Sellers backing out or switching agents without notice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">❌</span> 
                  <span>Wasting time on verbal agreements that don't hold up</span>
                </li>
              </ul>
              <p className="text-lg">
                With RealBroker Smart Agreements, you can protect your deals, ensure clarity, and operate professionally—without the hassle of paperwork.
              </p>
            </GlassCard>
          </RevealAnimation>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-4 md:px-6 mb-16">
          <RevealAnimation>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="text-realtor-600">📌</span> How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <RevealAnimation delay={100}>
                <GlassCard className="p-6 rounded-xl h-full">
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 bg-realtor-50 rounded-full flex items-center justify-center text-realtor-600">
                      <FileText size={32} />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">
                    <span className="text-realtor-600">💼</span> Step 1: Select Your Agreement Type
                  </h3>
                  <p className="text-center text-muted-foreground">
                    Choose from our pre-built templates for Broker-to-Broker, Buyer-Broker, or Seller-Agent agreements.
                  </p>
                </GlassCard>
              </RevealAnimation>

              <RevealAnimation delay={200}>
                <GlassCard className="p-6 rounded-xl h-full">
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 bg-realtor-50 rounded-full flex items-center justify-center text-realtor-600">
                      <Users size={32} />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">
                    <span className="text-realtor-600">📝</span> Step 2: Auto-Filled Details
                  </h3>
                  <p className="text-center text-muted-foreground">
                    RealBroker pulls in property details, broker credentials, and terms—saving you time.
                  </p>
                </GlassCard>
              </RevealAnimation>

              <RevealAnimation delay={300}>
                <GlassCard className="p-6 rounded-xl h-full">
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 bg-realtor-50 rounded-full flex items-center justify-center text-realtor-600">
                      <Pen size={32} />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">
                    <span className="text-realtor-600">🖊️</span> Step 3: Sign & Share Digitally
                  </h3>
                  <p className="text-center text-muted-foreground">
                    No need for printouts or in-person meetings. Agreements can be signed on mobile or desktop in seconds.
                  </p>
                </GlassCard>
              </RevealAnimation>

              <RevealAnimation delay={400}>
                <GlassCard className="p-6 rounded-xl h-full">
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 bg-realtor-50 rounded-full flex items-center justify-center text-realtor-600">
                      <Archive size={32} />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">
                    <span className="text-realtor-600">📂</span> Step 4: Securely Stored for Future Reference
                  </h3>
                  <p className="text-center text-muted-foreground">
                    Access all your agreements in one place, ensuring clarity in every deal.
                  </p>
                </GlassCard>
              </RevealAnimation>
            </div>
          </RevealAnimation>
        </section>

        {/* Why Brokers Love Section */}
        <section className="container mx-auto px-4 md:px-6 mb-16">
          <RevealAnimation>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="text-realtor-600">💡</span> Why Brokers Love RealBroker Agreements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <RevealAnimation delay={100}>
                <GlassCard className="p-6 rounded-xl h-full">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 text-realtor-600 mt-1">
                      <Shield size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        ✔ Protect Your Commission
                      </h3>
                      <p className="text-muted-foreground">
                        Never lose your share due to unclear terms.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </RevealAnimation>

              <RevealAnimation delay={150}>
                <GlassCard className="p-6 rounded-xl h-full">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 text-realtor-600 mt-1">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        ✔ Close Deals Faster
                      </h3>
                      <p className="text-muted-foreground">
                        Reduce negotiation friction with ready-to-go agreements.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </RevealAnimation>

              <RevealAnimation delay={200}>
                <GlassCard className="p-6 rounded-xl h-full">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 text-realtor-600 mt-1">
                      <Award size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        ✔ Build Trust & Credibility
                      </h3>
                      <p className="text-muted-foreground">
                        Look professional and operate with transparency.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </RevealAnimation>

              <RevealAnimation delay={250}>
                <GlassCard className="p-6 rounded-xl h-full">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 text-realtor-600 mt-1">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        ✔ Save Time & Effort
                      </h3>
                      <p className="text-muted-foreground">
                        No manual paperwork, just quick digital execution.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </RevealAnimation>

              <RevealAnimation delay={300}>
                <GlassCard className="p-6 rounded-xl h-full">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 text-realtor-600 mt-1">
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        ✔ 100% Legally Compliant
                      </h3>
                      <p className="text-muted-foreground">
                        Agreements are industry-standard and secure.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </RevealAnimation>
            </div>
          </RevealAnimation>
        </section>

        {/* Testimonials Section */}
        <section className="container mx-auto px-4 md:px-6 mb-16">
          <RevealAnimation>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="text-realtor-600">📣</span> What Brokers Are Saying
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RevealAnimation delay={100}>
                <GlassCard className="p-6 rounded-xl h-full">
                  <p className="mb-4 text-lg italic">
                    "I used to lose deals because of handshake agreements. Now, everything is in writing and digital—it's a game changer!"
                  </p>
                  <p className="font-medium">
                    <span className="text-realtor-600">🗣️</span> Amit, Broker in Bangalore
                  </p>
                </GlassCard>
              </RevealAnimation>

              <RevealAnimation delay={200}>
                <GlassCard className="p-6 rounded-xl h-full">
                  <p className="mb-4 text-lg italic">
                    "With RealBroker, I don't worry about co-brokers taking my buyers anymore. My agreements are signed & secure."
                  </p>
                  <p className="font-medium">
                    <span className="text-realtor-600">🗣️</span> Priya, Luxury Real Estate Agent in Bangalore
                  </p>
                </GlassCard>
              </RevealAnimation>
            </div>
          </RevealAnimation>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 md:px-6 mb-16">
          <RevealAnimation>
            <GlassCard className="p-8 rounded-xl text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="text-realtor-600">🚀</span> Get Started Today!
              </h2>
              <p className="text-lg mb-2">
                <span className="text-realtor-600">🔹</span> Protect Your Deals. Save Time. Work Smarter.
              </p>
              <p className="text-lg mb-6">
                <span className="text-realtor-600">🔹</span> Sign up now & start using RealBroker Smart Agreements
              </p>
              <Link to="/#invite">
                <Button className="bg-realtor-600 hover:bg-realtor-700 text-white px-8 py-6 rounded-full text-lg">
                  <span className="text-realtor-50 mr-2">👉</span> Sign Up for Early Access
                </Button>
              </Link>
            </GlassCard>
          </RevealAnimation>
        </section>
      </main>
      
      <Footer />
    </div>
    </>
  );
};

export default SmartAgreements;
