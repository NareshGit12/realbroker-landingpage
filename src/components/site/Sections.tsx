import React from 'react';
import { Briefcase, Search, Users } from 'lucide-react';
import { LOGIN_URL, REQUEST_INVITE_URL } from './links';

export const FEATURES = [
  { icon: Users, title: 'Connect with quality brokers', body: 'Every member is verified. See who works your areas, connect in one tap and build a network you can trust.' },
  { icon: Search, title: 'Find inventory for your buyer', body: 'Describe what your client wants, like “3 BHK in Indiranagar under 1.5 Cr”, and search 50,000+ broker listings plus WhatsApp groups across the city.' },
  { icon: Briefcase, title: 'Run a sharper business', body: 'Professional tools that save you hours on every deal, from the first showing to the final invoice.', tags: ['Inventory management', 'Customer flyers', 'E-sign agreements', 'Invoices'] },
];

export function FeatureCards() {
  return <div className="lp-grid3">
    {FEATURES.map((f) => <article key={f.title} className="lp-card lp-feature">
      <span className="lp-ficon"><f.icon aria-hidden="true" /></span>
      <h3>{f.title}</h3>
      <p>{f.body}</p>
      {f.tags && <div className="lp-tags">{f.tags.map((t) => <span key={t}>{t}</span>)}</div>}
    </article>)}
  </div>;
}

export function Steps({ steps }: { steps: { title: string; body: string }[] }) {
  return <ol className="lp-grid3 lp-steps">
    {steps.map((s, i) => <li key={s.title}><span className="lp-num">{i + 1}</span><h3>{s.title}</h3><p>{s.body}</p></li>)}
  </ol>;
}

export const JOIN_STEPS = [
  { title: 'Request an invite', body: 'Share your name, number and the areas you work in, with a profile photo and a short professional bio.' },
  { title: 'Get verified', body: 'Our team reviews your request, or a member who knows you invites you directly.' },
  { title: 'Connect and start finding', body: 'Connect with brokers in your areas, search inventory and post your listings from day one.' },
];

export function JoinButtons({ large, block }: { large?: boolean; block?: boolean }) {
  const cls = large ? ' lp-lg' : '';
  const style = block ? { flex: 1 } : undefined;
  return <div className="lp-row">
    <a href={REQUEST_INVITE_URL} className={`lp-btn lp-red${cls}`} style={style}>Request an invite</a>
    <a href={LOGIN_URL} className={`lp-btn lp-out${cls}`} style={style}>Log in</a>
  </div>;
}

export function Cta({ title = 'Join Bangalore’s private broker network.', text = 'Verified members only.' }: { title?: string; text?: string }) {
  return <section className="lp-cta">
    <h2>{title}</h2>
    <p>{text}</p>
    <div className="lp-row">
      <a href={REQUEST_INVITE_URL} className="lp-btn lp-red">Request an invite</a>
      <a href={LOGIN_URL} className="lp-btn lp-light">Log in</a>
    </div>
  </section>;
}

export function BrowserFrame({ src, url, alt, width, height }: { src: string; url: string; alt: string; width: number; height: number }) {
  return <div className="lp-frame">
    <div className="lp-frame-bar" aria-hidden="true"><i /><i /><i /><span>{url}</span></div>
    <img src={src} alt={alt} width={width} height={height} loading="lazy" />
  </div>;
}

export function PhoneFrame({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  return <div className="lp-phone-wrap"><div className="lp-phone"><div><img src={src} alt={alt} width={width} height={height} loading="lazy" /></div></div></div>;
}

export const SCREENS = {
  properties: { src: '/screens/app-properties.webp', width: 1600, height: 917, url: 'my.realbroker.app/properties', alt: 'RealBroker property search with filters for area, budget and BHK' },
  network: { src: '/screens/app-network.webp', width: 1600, height: 1075, url: 'my.realbroker.app/network', alt: 'RealBroker network page with verified member cards' },
  week: { src: '/screens/app-your-week.webp', width: 720, height: 843, alt: 'RealBroker on a phone: search and your week of calls, WhatsApps and views' },
};
