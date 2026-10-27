import React, { useState } from 'react';
import { initials, type Member } from './members';

const AV_BG = ['#C9D6E3', '#E3D7C9', '#D6E3D2', '#E2D3DE', '#D8DBEE', '#EADFC8', '#D2E0E3', '#E6CFCF'];
const bg = (id: string) => AV_BG[id.charCodeAt(0) % AV_BG.length];

export function MemberAvatar({ m, className }: { m: Member; className: string }) {
  const [broken, setBroken] = useState(false);
  return <span className={className} style={{ background: bg(m.id) }}>
    {m.avatar && !broken ? <img src={m.avatar} alt="" loading="lazy" onError={() => setBroken(true)} /> : initials(m.name)}
  </span>;
}

// Same anatomy as the rb9 Network "Discover RB members" card, with View profile instead of Connect.
export default function MemberCard({ m }: { m: Member }) {
  return <a className="lp-mcard" href={m.href} {...(m.external ? { target: '_blank', rel: 'noopener' } : {})} aria-label={`${m.name}, ${m.company}`}>
    <div className="lp-mcover" style={m.cover ? { backgroundImage: `url("${m.cover}")` } : undefined} />
    <MemberAvatar m={m} className="lp-mav" />
    <div className="lp-mbody">
      <div className="lp-mname">{m.name}</div>
      <div className="lp-mco">{m.company}</div>
      <div className="lp-mareas">{m.areas.slice(0, 3).join(', ')}</div>
      <div style={{ flex: 1 }} />
      <span className="lp-mbtn">View profile</span>
    </div>
  </a>;
}
