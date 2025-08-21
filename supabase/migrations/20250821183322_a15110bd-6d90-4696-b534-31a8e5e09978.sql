
-- 1) Create a SECURITY DEFINER function that returns only public-safe fields
--    and counts only published properties. No RLS/policy changes.
create or replace function public.get_member_directory(
  limit_count integer default 50,
  offset_value integer default 0,
  city_filter text default null
)
returns table (
  id uuid,
  full_name text,
  company_name text,
  city text,
  bio text,
  avatar_url text,
  rating numeric,
  areas text[],
  member_since timestamptz,
  properties_count bigint
)
language sql
stable
security definer
set search_path = public
as $$
  select
    p.id,
    p.full_name,
    p.company_name,
    p.city,
    p.bio,
    p.avatar_url,
    coalesce(p.rating, 0) as rating,
    p.areas::text[] as areas,
    p.member_since,
    coalesce(pc.properties_count, 0) as properties_count
  from public.profiles p
  left join (
    select user_id, count(*)::bigint as properties_count
    from public.properties
    where publish > 0
    group by user_id
  ) pc on pc.user_id = p.id
  where p.role = 'user'
    and p.full_name is not null
    and (city_filter is null or p.city = city_filter)
  order by p.rating desc nulls last, p.full_name asc
  limit limit_count
  offset offset_value;
$$;

-- 2) Lock down default PUBLIC access and only allow anon/authenticated to execute
revoke all on function public.get_member_directory(integer, integer, text) from public;
grant execute on function public.get_member_directory(integer, integer, text) to anon, authenticated;

-- 3) Optional: add a helpful comment
comment on function public.get_member_directory(integer, integer, text)
is 'Read-only member directory for the /members page. Returns public-safe profile fields and count of published properties. SECURITY DEFINER; does not modify table RLS.';
