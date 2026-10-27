import React from 'react';
import { Check, Handshake, ShieldCheck, Users } from 'lucide-react';
import Seo from '@/components/seo/Seo';
import SiteLayout from '@/components/site/SiteLayout';
import { Cta, JoinButtons, Steps } from '@/components/site/Sections';

const PROBLEMS = ['Buyers going to another broker', 'Disputes over the commission split', 'Sellers switching agents without notice', 'Promises that don’t hold up'];
const KINDS = [
  { icon: Handshake, title: 'Broker to broker', body: 'Agree the split before you share the client. Both sides sign online.' },
  { icon: Users, title: 'Buyer to broker', body: 'Lock in the buyer you’re showing properties to.' },
  { icon: ShieldCheck, title: 'Seller to broker', body: 'Get a mandate from the owner before you market the property.' },
];
const HOW = [
  { title: 'Fill in the deal', body: 'Pick the agreement, add the property and the other party.' },
  { title: 'Send for e-signature', body: 'They sign from a link on their phone. You get a signed copy by email.' },
  { title: 'Raise the invoice', body: 'When the deal closes, create and email the invoice from the same place.' },
];

export default function Agreements() {
  return <>
    <Seo title="Broker agreements and invoices with e-signature | RealBroker"
      description="Send broker-to-broker, buyer and seller agreements for e-signature from your phone, and raise the invoice when the deal closes. Included with RealBroker membership."
      path="/agreements" />
    <SiteLayout>
      <section className="lp-ahero">
        <div className="lp-wrap lp-ahero-grid">
          <div>
            <p className="lp-eyebrow">Agreements &amp; invoices</p>
            <h1>Put every deal in writing, in minutes.</h1>
            <p className="lp-sub" style={{ marginBottom: 22 }}>Send broker, buyer and seller agreements for e-signature from your phone, and raise the invoice when the deal closes. No printing, no chasing.</p>
            <JoinButtons />
          </div>
          <div className="lp-adoc" aria-hidden="true">
            <div className="lp-card" style={{ padding: 18 }}>
              <div className="lp-adoc-head"><b>Broker-to-broker agreement</b><span>Signed</span></div>
              <p className="lp-adoc-meta">3 BHK, Indiranagar · 50/50 split</p>
              {[['PS', 'Listing broker', '10:42'], ['RK', 'Buyer’s broker', '11:05']].map(([i, n, t]) => <div key={n} className="lp-adoc-row">
                <span className="lp-face" style={{ width: 32, height: 32, border: 0 }}>{i}</span><span style={{ flex: 1 }}>{n}</span><span className="lp-adoc-ok"><Check aria-hidden="true" />Signed {t}</span>
              </div>)}
            </div>
            <div className="lp-card lp-adoc-inv"><span><b>Invoice #RB-0142</b><br /><small>₹ 2,75,000 · emailed</small></span><span className="lp-btn lp-ghost lp-sm">View</span></div>
          </div>
        </div>
      </section>

      <section className="lp-sec">
        <div className="lp-wrap">
          <p className="lp-eyebrow lp-center">Why it matters</p>
          <h2 className="lp-h2 lp-center" style={{ marginBottom: 24 }}>Verbal deals cost brokers money</h2>
          <div className="lp-grid4 lp-problems">{PROBLEMS.map((p) => <div key={p} className="lp-card">{p}</div>)}</div>
        </div>
      </section>

      <section className="lp-sec lp-band">
        <div className="lp-wrap">
          <h2 className="lp-h2 lp-center" style={{ marginBottom: 24 }}>Three agreements, one tap each</h2>
          <div className="lp-grid3">{KINDS.map((k) => <article key={k.title} className="lp-card lp-feature"><span className="lp-ficon"><k.icon aria-hidden="true" /></span><h3>{k.title}</h3><p>{k.body}</p></article>)}</div>
        </div>
      </section>

      <section className="lp-sec">
        <div className="lp-wrap"><p className="lp-eyebrow lp-center">How it works</p><Steps steps={HOW} /></div>
      </section>

      <Cta title="Close your next deal in writing." text="Agreements and invoices are included with membership." />
    </SiteLayout>
  </>;
}
