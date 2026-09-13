import React from 'react';
import Seo from '@/components/seo/Seo';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';
import Page1Hero from '@/components/page1/Page1Hero';
import ValuePropsSection from '@/components/page1/ValuePropsSection';
import PartnershipSection from '@/components/page1/PartnershipSection';
import RequestAccessForm from '@/components/page1/RequestAccessForm';
import TrustBar from '@/components/page1/TrustBar';

const SITE_URL = 'https://realbroker.network';

const homeJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RealBroker',
    url: SITE_URL,
    logo: `${SITE_URL}/lovable-uploads/aee5ebaa-b383-4ca3-9647-ab8921ed5030.png`,
    description:
      'An invite-only, broker-to-broker network for real estate professionals in Bangalore.',
    areaServed: 'Bangalore, India',
    sameAs: [
      'https://www.linkedin.com/company/getrealbroker/',
      'https://instagram.com/realbrokernetwork/',
      'https://www.facebook.com/people/RealBroker-Network/61587129039732/',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RealBroker',
    url: SITE_URL,
  },
];

const Page1: React.FC = () => {
  return (
    <>
      <Seo title="RealBroker | Invite-Only Broker Network in Bangalore" description="An invite-only broker-to-broker network in Bangalore. Share verified inventory, partner on deals side-by-side, and request access to join." path="/" jsonLd={homeJsonLd} />

    <div className="min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <main>
        <Page1Hero />
        <ValuePropsSection />
        <PartnershipSection />
        <RequestAccessForm />
        <TrustBar />
      </main>
      <Footer />
    </div>
    </>
  );
};

export default Page1;
