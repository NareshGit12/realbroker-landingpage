import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { LOGIN_URL, LOGO_URL, REQUEST_INVITE_URL, SOCIAL } from './links';

export default function SiteFooter() {
  return <footer className="lp-foot">
    <div className="lp-wrap">
      <div className="lp-foot-grid">
        <div>
          <img src={LOGO_URL} alt="RealBroker" style={{ height: 28, width: 'auto' }} />
          <p>The private network for Bangalore’s verified brokers. A Propalyst company.</p>
          <div className="lp-soc">
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="RealBroker on LinkedIn"><Linkedin /></a>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="RealBroker on Instagram"><Instagram /></a>
            <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" aria-label="RealBroker on Facebook"><Facebook /></a>
          </div>
        </div>
        <div><h4>Explore</h4><Link to="/members">Members</Link><Link to="/product">Product</Link><Link to="/agreements">Agreements</Link></div>
        <div><h4>Join</h4><a href={REQUEST_INVITE_URL}>Request an invite</a><a href={LOGIN_URL}>Log in</a><Link to="/charter-and-conduct">Charter &amp; code of conduct</Link></div>
        <div><h4>Company</h4><a href="https://propalyst.com" target="_blank" rel="noopener noreferrer">Propalyst.com</a><Link to="/terms-of-use">Terms</Link><Link to="/privacy">Privacy</Link><a href="mailto:support@realbroker.app">support@realbroker.app</a></div>
      </div>
      <div className="lp-foot-bot"><span>© {new Date().getFullYear()} RealBroker · Bangalore</span><span>realbroker.network</span></div>
    </div>
  </footer>;
}
