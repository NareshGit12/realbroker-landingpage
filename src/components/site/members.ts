import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
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

const toMember = (p: Row): Member | null => {
  if (!p.full_name?.trim()) return null;
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
export function loadMembers(): Promise<Member[]> {
  if (!cache) {
    cache = Promise.resolve(supabase.from('profiles').select(COLUMNS).or('role.ilike.%user%,role.ilike.%admin%,role.ilike.%ops%').order('member_since', { ascending: false, nullsFirst: false }).limit(1000))
      .then(({ data, error }) => {
        if (error) throw error;
        return ((data || []) as Row[]).map(toMember).filter((m): m is Member => !!m);
      })
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

/** A stable shuffle so the same visitor sees the same picks during a visit. */
export function pick<T>(list: T[], count: number, seed = 7): T[] {
  const a = [...list];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor((s / 233280) * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a.slice(0, count);
}
