import React from 'react';
import { Link } from 'react-router-dom';
import SiteLayout from './SiteLayout';

const DOCS = [
  { to: '/charter', label: 'Network charter' },
  { to: '/charter-and-conduct', label: 'Code of conduct' },
  { to: '/terms-of-use', label: 'Terms of use' },
  { to: '/privacy', label: 'Privacy policy' },
];

// Shared reading layout for the charter, code of conduct, terms and privacy pages.
export default function DocLayout({ current, title, meta, intro, children }: { current: string; title: string; meta?: string; intro?: string; children: React.ReactNode }) {
  return <SiteLayout>
    <div className="lp-wrap lp-doc">
      <aside className="lp-doc-side">
        <nav className="lp-card" style={{ padding: 16 }} aria-label="Policies">
          <p className="lp-eyebrow" style={{ color: 'var(--meta)', marginBottom: 8 }}>Policies</p>
          {DOCS.map((d) => <Link key={d.to} to={d.to} aria-current={d.to === current ? 'page' : undefined}>{d.label}</Link>)}
        </nav>
      </aside>
      <article className="lp-card lp-doc-main">
        {meta && <p style={{ fontSize: 13, color: 'var(--meta)', margin: '0 0 8px' }}>{meta}</p>}
        <h1>{title}</h1>
        {intro && <p className="lp-sub" style={{ margin: '12px 0 8px' }}>{intro}</p>}
        <div className="lp-prose" style={{ marginTop: 16 }}>{children}</div>
      </article>
    </div>
  </SiteLayout>;
}

/** "1. Heading\nline\nline 2. Heading…" → headings with bullet lists (the format used in rb_documents). */
export function NumberedText({ text }: { text: string }) {
  const clean = text.trim().replace(/\r\n/g, '\n');
  const parts = clean.split(/(?:^|\n)\s*(\d+)\.\s+/);
  if (parts.length <= 1) return <>{clean.split(/\n{2,}/).map((p, i) => <p key={i}>{p}</p>)}</>;
  const intro = parts[0].trim();
  const items: { n: string; head: string; lines: string[] }[] = [];
  for (let i = 1; i < parts.length; i += 2) {
    const lines = (parts[i + 1] || '').split('\n').map((l) => l.trim()).filter(Boolean);
    items.push({ n: parts[i], head: lines[0] || '', lines: lines.slice(1) });
  }
  return <>
    {intro && <p>{intro}</p>}
    {items.map((it) => <section key={it.n}>
      <h2>{it.n}. {it.head}</h2>
      {it.lines.length > 0 && <ul>{it.lines.map((l, i) => <li key={i}>{l.replace(/^[-•]\s*/, '')}</li>)}</ul>}
    </section>)}
  </>;
}
