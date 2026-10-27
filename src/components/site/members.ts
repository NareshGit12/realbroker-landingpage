import { useEffect, useState } from 'react';
import { APP_URL } from './links';

export interface Member {
  id: string;
  name: string;
  company: string;
  areas: string[];
  avatar: string | null;
  cover: string | null;
  href: string;
  external: boolean;
  memberSince: string | null;
}

// Only public profile fields; phone and email stay out of the member list.
// Members are users plus admin and ops accounts (they are brokers too).
const COLUMNS = 'id, full_name, company_name, areas, avatar_url, cover_image, static_html_url, vanity_url, member_since';

type Row = { id: string; full_name: string | null; company_name: string | null; areas: string[] | null; avatar_url: string | null; cover_image: string | null; static_html_url: string | null; vanity_url: string | null; member_since: string | null };

// Test accounts never appear on the public site.
export const isTestAccount = (name?: string | null, company?: string | null) => /\b(test\d*|do not use|not ?valid|guest)\b/i.test(`${name || ''} ${company || ''}`);

const toMember = (p: Row): Member | null => {
  if (!p.full_name?.trim() || isTestAccount(p.full_name, p.company_name)) return null;
  const staticUrl = p.static_html_url?.startsWith('/') ? p.static_html_url : null;
  return {
    id: p.id,
    name: p.full_name.trim(),
    company: p.company_name?.trim() || 'Independent broker',
    areas: (p.areas || []).filter(Boolean),
    avatar: p.avatar_url && p.avatar_url.startsWith('http') ? p.avatar_url : null,
    cover: p.cover_image && p.cover_image.startsWith('http') ? p.cover_image : null,
    href: staticUrl || (p.vanity_url ? `${APP_URL}/${p.vanity_url}` : `${APP_URL}/start`),
    external: !staticUrl,
    memberSince: p.member_since,
  };
};

let cache: Promise<Member[]> | null = null;

// Fast path: /members.json is written by the static-pages workflow, with small avatar and cover
// thumbnails, and is served from the CDN. If it's missing, fall back to reading Supabase directly
// (the client library is loaded only in that case).
async function fromSnapshot(): Promise<Member[] | null> {
  try {
    const res = await fetch('/members.json', { cache: 'no-cache' });
    if (!res.ok || !(res.headers.get('content-type') || '').includes('json')) return null;
    const list = (await res.json()) as Member[];
    return Array.isArray(list) && list.length ? list.filter((m) => !isTestAccount(m.name, m.company)) : null;
  } catch { return null; }
}

async function fromDatabase(): Promise<Member[]> {
  const { supabase } = await import('@/integrations/supabase/client');
  const { data, error } = await supabase.from('profiles').select(COLUMNS)
    .or('role.ilike.%user%,role.ilike.%admin%,role.ilike.%ops%')
    .order('member_since', { ascending: false, nullsFirst: false }).limit(1000);
  if (error) throw error;
  return ((data || []) as Row[]).map(toMember).filter((m): m is Member => !!m);
}

export function loadMembers(): Promise<Member[]> {
  if (!cache) {
    cache = fromSnapshot()
      .then((m) => m || fromDatabase())
      .catch((e) => { console.error('Could not load members', e); cache = null; return []; });
  }
  return cache;
}

export function useMembers() {
  const [members, setMembers] = useState<Member[] | null>(null);
  useEffect(() => { let on = true; loadMembers().then((m) => { if (on) setMembers(m); }); return () => { on = false; }; }, []);
  return members;
}

export const initials = (n: string) => n.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

// Fresh on every page load, so the home page shows different members each visit.
const SESSION_SEED = Math.floor(Math.random() * 233280);

/** Shuffle with a per-visit seed: stable while you stay on the page, different on the next visit. */
export function pick<T>(list: T[], count: number, salt = 0): T[] {
  const a = [...list];
  let s = (SESSION_SEED + salt * 7919) % 233280;
  for (let i = a.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor((s / 233280) * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a.slice(0, count);
}
