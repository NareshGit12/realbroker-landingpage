import React from 'react';
import { Check, FileSignature, FileText, ReceiptText, UserRound } from 'lucide-react';
import Seo from '@/components/seo/Seo';
import SiteLayout from '@/components/site/SiteLayout';
import { BrowserFrame, Cta, JoinButtons, PhoneFrame, SCREENS } from '@/components/site/Sections';

const SHOTS = [
  { eyebrow: 'Search inventory', title: 'Find the right property for your buyer in seconds', body: 'Type what your client wants in plain words. RealBroker searches 50,000+ broker listings and WhatsApp groups, then lets you narrow by area, budget and BHK.', points: ['Smart search', 'Area, budget and BHK filters', 'Call or WhatsApp the listing broker'], frame: <BrowserFrame {...SCREENS.properties} /> },
  { eyebrow: 'Your network', title: 'Work with brokers you can trust', body: 'Every member is verified. See who works your areas, connect in one tap, and see their listings and requirements as they post them.', points: ['Verified members only', 'Connect in one tap', 'Profiles with listings and reviews'], frame: <BrowserFrame {...SCREENS.network} /> },
  { eyebrow: 'On your phone', title: 'Your week, on your phone', body: 'Install RealBroker on your phone. See who called, WhatsApped and viewed your listings this week, and search for your buyer from anywhere.', points: ['Calls, WhatsApps and views at a glance', 'Search from the home screen', 'Post a listing in seconds'], frame: <PhoneFrame {...SCREENS.week} /> },
];

const TOOLS = [
  { icon: UserRound, title: 'Your profile page', body: 'A public page with your listings, areas and reviews.' },
  { icon: FileText, title: 'Customer flyers', body: 'A branded flyer for every listing, ready to share.' },
  { icon: FileSignature, title: 'E-sign agreements', body: 'Broker, buyer and seller agreements, signed online.' },
  { icon: ReceiptText, title: 'Invoices', body: 'Raise and email an invoice when the deal closes.' },
];

export default function Product() {
  return <>
    <Seo title="Product — find inventory, work your network, close the deal | RealBroker"
      description="A quick look at RealBroker: smart property search across 50,000+ broker listings, a verified broker network, and agreements, flyers and invoices on your phone."
      path="/product" />
    <SiteLayout>
      <section className="lp-phero">
        <div className="lp-wrap">
          <p className="lp-eyebrow">Product</p>
          <h1>One place to find inventory, work your network and close the deal.</h1>
          <p className="lp-sub">A quick look at RealBroker, the app members use every day.</p>
          <div className="lp-phero-cta"><JoinButtons /></div>
        </div>
      </section>

      {SHOTS.map((s, i) => <section key={s.eyebrow} className={`lp-sec${i % 2 ? ' lp-band' : ''}`}>
        <div className={`lp-wrap lp-shot${i % 2 ? ' lp-shot-rev' : ''}`}>
          <div>
            <p className="lp-eyebrow">{i + 1} · {s.eyebrow}</p>
            <h2 className="lp-h2">{s.title}</h2>
            <p className="lp-sub" style={{ fontSize: 16, marginBottom: 16 }}>{s.body}</p>
            <ul className="lp-checks">{s.points.map((p) => <li key={p}><span><Check aria-hidden="true" /></span>{p}</li>)}</ul>
          </div>
          <div>{s.frame}</div>
        </div>
      </section>)}

      <section className="lp-sec lp-band">
        <div className="lp-wrap">
          <p className="lp-eyebrow lp-center">Also included</p>
          <h2 className="lp-h2 lp-center" style={{ marginBottom: 24 }}>Tools that come with membership</h2>
          <div className="lp-grid4">
            {TOOLS.map((t) => <div key={t.title} className="lp-card lp-feature" style={{ padding: 20 }}>
              <span className="lp-ficon"><t.icon aria-hidden="true" /></span>
              <h3 style={{ fontSize: 16 }}>{t.title}</h3>
              <p style={{ fontSize: 14 }}>{t.body}</p>
            </div>)}
          </div>
        </div>
      </section>

      <Cta />
    </SiteLayout>
  </>;
}
