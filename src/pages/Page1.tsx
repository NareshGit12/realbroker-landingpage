import React from 'react';
import { Handshake, Search, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '@/components/seo/Seo';
import SiteLayout from '@/components/site/SiteLayout';
import MemberCard, { MemberAvatar } from '@/components/site/MemberCard';
import { BrowserFrame, PhoneFrame, Cta, FeatureCards, JoinButtons, JOIN_STEPS, SCREENS, Steps } from '@/components/site/Sections';
import { pick, useMembers } from '@/components/site/members';
import { LOGO_URL, SITE_URL, SOCIAL } from '@/components/site/links';

const TITLE = 'RealBroker — the private network for Bangalore’s verified brokers';
const DESCRIPTION = 'Connect with quality, verified brokers across Bangalore. Search 50,000+ broker listings, find inventory for your buyers and close deals on RealBroker, the invitation-only broker network.';

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RealBroker',
    url: SITE_URL,
    logo: `${SITE_URL}${LOGO_URL}`,
    description: 'The invitation-only network for verified real estate brokers in Bangalore.',
    areaServed: 'Bangalore, India',
    sameAs: Object.values(SOCIAL),
  },
  { '@context': 'https://schema.org', '@type': 'WebSite', name: 'RealBroker', url: SITE_URL },
];

const SIDE_BY_SIDE = [
  { icon: Users, title: 'You keep your seller', body: 'Your client relationship doesn’t change.' },
  { icon: Search, title: 'We find the buyer', body: 'Propalyst sources, qualifies and manages the buyer.' },
  { icon: Handshake, title: '50/50 split', body: 'Free to join. No listing charges.' },
];

export default function Page1() {
  const members = useMembers();
  const withPhoto = (members || []).filter((m) => m.avatar);
  const faces = pick(withPhoto, 6, 11);
  const featured = pick(withPhoto.length >= 4 ? withPhoto : members || [], 4, 3);

  return <>
    <Seo title={TITLE} description={DESCRIPTION} path="/" jsonLd={jsonLd} />
    <SiteLayout>
      <section className="lp-home-hero">
        <div className="lp-wrap lp-home-hero-grid">
          <div>
            <p className="lp-eyebrow">Invitation-only · Verified brokers · Bangalore</p>
            <h1 className="lp-home-h1">The private network where Bangalore’s brokers <span>find inventory and close deals.</span></h1>
            <p className="lp-sub" style={{ marginBottom: 24 }}>Connect with quality, verified brokers across the city. Search their listings and the busiest WhatsApp groups in one place.</p>
            <JoinButtons large />
            <div className="lp-proof" style={{ marginTop: 28 }}>
              <div className="lp-proof-item">
                {faces.length > 0 && <span className="lp-faces" aria-hidden="true">{faces.map((m) => <MemberAvatar key={m.id} m={m} className="lp-face" />)}</span>}
                <span><b>100+</b><small>verified brokers</small></span>
              </div>
              <span className="lp-proof-sep" aria-hidden="true" />
              <div className="lp-proof-item"><span><b>50,000+</b><small>broker listings to search from</small></span></div>
            </div>
          </div>
          <div className="lp-home-shot">
            <div className="lp-hide-m"><BrowserFrame {...SCREENS.properties} /></div>
            <div className="lp-show-m-block"><PhoneFrame {...SCREENS.week} /></div>
          </div>
        </div>
      </section>

      <section className="lp-band lp-sec">
        <div className="lp-wrap">
          <p className="lp-eyebrow lp-center">What you get</p>
          <h2 className="lp-h2 lp-center" style={{ marginBottom: 28 }}>Everything a broker needs, in one network</h2>
          <FeatureCards />
          <p className="lp-center" style={{ margin: '24px 0 0' }}><Link to="/product" className="lp-link">See the product ›</Link></p>
        </div>
      </section>

      <section className="lp-sec">
        <div className="lp-wrap">
          <div className="lp-card lp-sbs">
            <div>
              <p className="lp-eyebrow">With Propalyst.com</p>
              <h2 className="lp-h2">You bring the seller. We bring the buyer.</h2>
              <p className="lp-sub" style={{ fontSize: 16 }}>List on RealBroker and Propalyst.com promotes your property to qualified buyers for free. You keep your seller; we act as the buyer’s agent on a standard 50/50 side-by-side split.</p>
            </div>
            <div className="lp-sbs-grid">
              {SIDE_BY_SIDE.map((s) => <div key={s.title} className="lp-sbs-item">
                <span className="lp-ficon" style={{ width: 36, height: 36, background: '#fff' }}><s.icon aria-hidden="true" /></span>
                <h3>{s.title}</h3><p>{s.body}</p>
              </div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="lp-band lp-sec">
        <div className="lp-wrap">
          <div className="lp-sec-head">
            <div><p className="lp-eyebrow">Members</p><h2 className="lp-h2" style={{ marginBottom: 0 }}>Meet the brokers on RealBroker</h2></div>
            <Link to="/members" className="lp-btn lp-ghost lp-sm lp-hide-m">See all members</Link>
          </div>
          <div className="lp-grid4">
            {members === null ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="lp-mskel" />) : featured.map((m) => <MemberCard key={m.id} m={m} />)}
          </div>
          <Link to="/members" className="lp-btn lp-ghost lp-show-m" style={{ width: '100%', marginTop: 16 }}>See all members</Link>
        </div>
      </section>

      <section className="lp-sec">
        <div className="lp-wrap"><p className="lp-eyebrow lp-center">How it works</p><Steps steps={JOIN_STEPS} /></div>
      </section>

      <Cta />
    </SiteLayout>
  </>;
}
