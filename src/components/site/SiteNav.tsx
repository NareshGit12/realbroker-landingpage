import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { LOGIN_URL, LOGO_URL, REQUEST_INVITE_URL } from './links';

const LINKS = [
  { to: '/members', label: 'Members' },
  { to: '/product', label: 'Product' },
  { to: '/agreements', label: 'Agreements' },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);

  return <header className="lp-nav">
    <div className="lp-nav-in">
      <Link to="/" aria-label="RealBroker home"><img src={LOGO_URL} alt="RealBroker" width={43} height={32} /></Link>
      <nav className="lp-nav-links" aria-label="Main">
        {LINKS.map((l) => <NavLink key={l.to} to={l.to}>{l.label}</NavLink>)}
      </nav>
      <div className="lp-nav-act">
        <a href={LOGIN_URL} className="lp-nav-login">Log in</a>
        <a href={REQUEST_INVITE_URL} className="lp-btn lp-red lp-sm">Request an invite</a>
        <button type="button" className="lp-burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </div>
    {open && <nav className="lp-menu" aria-label="Menu">
      {LINKS.map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
      <a href={LOGIN_URL}>Log in</a>
    </nav>}
  </header>;
}
