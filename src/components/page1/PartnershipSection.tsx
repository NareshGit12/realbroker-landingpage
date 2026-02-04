import React from "react";
import { Check, Handshake, User, Users } from "lucide-react";
import RevealAnimation from "@/components/ui/RevealAnimation";

const PartnershipSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-realtor-50/30 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <RevealAnimation>
          <div className="text-center mb-16">
            <span className="inline-block py-2 px-4 mb-4 text-xs font-semibold uppercase tracking-widest bg-realtor-100 text-realtor-700 rounded-full">
              The Propalyst.com partnership
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-playfair mb-4">
              How does the <span className="text-realtor-600">"Side-by-Side"</span> work?
            </h2>
          </div>
        </RevealAnimation>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            <RevealAnimation delay={100}>
              <div className="text-center p-8 bg-white rounded-2xl border border-border/50 shadow-sm">
                <div className="w-16 h-16 bg-realtor-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="w-8 h-8 text-realtor-600" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">You Represent Your Owner</h3>
                <p className="text-muted-foreground">
                  You keep your 100% relationship with your seller. Nothing changes.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={200}>
              <div className="text-center p-8 bg-white rounded-2xl border border-border/50 shadow-sm">
                <div className="w-16 h-16 bg-realtor-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-realtor-600" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">We Represent the Buyer</h3>
                <p className="text-muted-foreground">
                  Propalyst.com finds the buyer and manages them through the entire process.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={300}>
              <div className="text-center p-8 bg-white rounded-2xl border border-border/50 shadow-sm">
                <div className="w-16 h-16 bg-realtor-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Handshake className="w-8 h-8 text-realtor-600" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">Transparent 50/50 Split</h3>
                <p className="text-muted-foreground">Standard side-by-side fee basis. Fair and straightforward.</p>
              </div>
            </RevealAnimation>
          </div>

          {/* Key benefits callout */}
          <RevealAnimation delay={400}>
            <div className="bg-realtor-600 rounded-2xl p-8 md:p-10 text-white text-center">
              <h3 className="text-2xl font-bold mb-6 font-playfair">You bring the Seller. We bring the buyer.</h3>
              <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">Free to Join</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">No Listing Charges</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">Earn extra for helping our buyers</span>
                </div>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default PartnershipSection;
