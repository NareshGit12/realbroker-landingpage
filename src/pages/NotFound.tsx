import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '@/components/seo/Seo';
import SiteLayout from '@/components/site/SiteLayout';

export default function NotFound() {
  return <>
    <Seo title="Page not found | RealBroker" description="This page doesn't exist on RealBroker." path="/404" />
    <SiteLayout>
      <section className="lp-sec">
        <div className="lp-wrap" style={{ textAlign: 'center', maxWidth: 560 }}>
          <p className="lp-eyebrow">404</p>
          <h1 className="lp-page-h1" style={{ margin: '10px 0' }}>We can’t find that page</h1>
          <p className="lp-sub" style={{ marginBottom: 22 }}>It may have moved. Try the home page or browse our members.</p>
          <div className="lp-row" style={{ justifyContent: 'center' }}>
            <Link to="/" className="lp-btn lp-red">Go home</Link>
            <Link to="/members" className="lp-btn lp-out">Meet our members</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  </>;
}
