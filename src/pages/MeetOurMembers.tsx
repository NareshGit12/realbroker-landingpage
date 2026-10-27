import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import Seo from '@/components/seo/Seo';
import SiteLayout from '@/components/site/SiteLayout';
import MemberCard from '@/components/site/MemberCard';
import { useMembers } from '@/components/site/members';
import { REQUEST_INVITE_URL, SITE_URL } from '@/components/site/links';

const PAGE = 24;
const norm = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();

export default function MeetOurMembers() {
  const members = useMembers();
  const [query, setQuery] = useState('');
  const [area, setArea] = useState<string | null>(null);
  const [limit, setLimit] = useState(PAGE);

  // The most common areas among members become the quick filters.
  const topAreas = useMemo(() => {
    const counts = new Map<string, { name: string; n: number }>();
    for (const m of members || []) for (const a of m.areas) {
      const k = norm(a);
      const cur = counts.get(k) || { name: a.trim(), n: 0 };
      cur.n += 1;
      counts.set(k, cur);
    }
    return [...counts.values()].sort((a, b) => b.n - a.n).slice(0, 8).map((x) => x.name);
  }, [members]);

  const filtered = useMemo(() => {
    const q = norm(query);
    return (members || []).filter((m) => {
      if (area && !m.areas.some((a) => norm(a) === norm(area))) return false;
      if (!q) return true;
      return norm([m.name, m.company, ...m.areas].join(' ')).includes(q);
    });
  }, [members, query, area]);

  const shown = filtered.slice(0, limit);
  const jsonLd = members && members.length ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'RealBroker members in Bangalore',
    itemListElement: members.filter((m) => !m.external).slice(0, 100).map((m, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}${m.href}`, name: m.name })),
  } : undefined;

  return <>
    <Seo title="Meet our members — verified real estate brokers in Bangalore | RealBroker"
      description="Browse 100+ verified real estate brokers in Bangalore on RealBroker. Find brokers by name, company or area, from Indiranagar and Koramangala to Whitefield."
      path="/members" jsonLd={jsonLd} />
    <SiteLayout>
      <section className="lp-mhead">
        <div className="lp-wrap">
          <p className="lp-crumbs"><Link to="/">Home</Link> › Members</p>
          <h1 className="lp-page-h1">Meet our members</h1>
          <p className="lp-sub" style={{ margin: '8px 0 20px', fontSize: 16 }}>100+ verified brokers across Bangalore. Find the right broker for an area, a property type or a deal.</p>
          <label className="lp-search">
            <Search aria-hidden="true" />
            <span className="sr-only">Search members</span>
            <input type="search" value={query} onChange={(e) => { setQuery(e.target.value); setLimit(PAGE); }} placeholder="Search by name, company or area" />
          </label>
          {topAreas.length > 0 && <div className="lp-chips" role="group" aria-label="Filter by area">
            <button type="button" className="lp-chip" aria-pressed={!area} onClick={() => { setArea(null); setLimit(PAGE); }}>All areas</button>
            {topAreas.map((a) => <button key={a} type="button" className="lp-chip" aria-pressed={area === a} onClick={() => { setArea(area === a ? null : a); setLimit(PAGE); }}>{a}</button>)}
          </div>}
        </div>
      </section>

      <section className="lp-mlist">
        <div className="lp-wrap">
          <p className="lp-mcount" aria-live="polite">{members === null ? 'Loading members…' : <><b>{filtered.length} {filtered.length === 1 ? 'member' : 'members'}</b> · Bangalore</>}</p>
          {members === null
            ? <div className="lp-grid4">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="lp-mskel" />)}</div>
            : filtered.length === 0
              ? <div className="lp-card" style={{ padding: 28, textAlign: 'center' }}>
                <p style={{ margin: '0 0 12px', color: 'var(--label)' }}>No members match “{query || area}”.</p>
                <button type="button" className="lp-btn lp-ghost lp-sm" onClick={() => { setQuery(''); setArea(null); }}>Clear search</button>
              </div>
              : <div className="lp-grid4">{shown.map((m) => <MemberCard key={m.id} m={m} />)}</div>}
          {filtered.length > shown.length && <button type="button" className="lp-btn lp-ghost" style={{ width: '100%', marginTop: 20 }} onClick={() => setLimit((n) => n + PAGE)}>Show more members</button>}

          <div className="lp-card lp-join-card">
            <div><b>Are you a broker in Bangalore?</b><p>Join the network and get your own profile page.</p></div>
            <a href={REQUEST_INVITE_URL} className="lp-btn lp-red">Request an invite</a>
          </div>
          <p className="lp-mfoot">Browse all profiles: <a href="/bangalore/" className="lp-link">brokers in Bangalore</a></p>
        </div>
      </section>
    </SiteLayout>
  </>;
}
