import React from 'react';
import SiteNav from './SiteNav';
import SiteFooter from './SiteFooter';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <div className="lp">
    <SiteNav />
    <main>{children}</main>
    <SiteFooter />
  </div>;
}
