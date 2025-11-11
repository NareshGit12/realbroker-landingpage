-- Drop and recreate get_member_directory function to include vanity_url and static_html_url
DROP FUNCTION IF EXISTS public.get_member_directory(integer, integer, text);

CREATE FUNCTION public.get_member_directory(
  limit_count integer DEFAULT 50, 
  offset_value integer DEFAULT 0, 
  city_filter text DEFAULT NULL
)
RETURNS TABLE(
  id uuid, 
  full_name text, 
  company_name text, 
  city text, 
  bio text, 
  avatar_url text, 
  rating numeric, 
  areas text[], 
  member_since timestamp with time zone, 
  properties_count bigint,
  vanity_url text,
  static_html_url text
)
LANGUAGE sql
STABLE 
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
    coalesce(pc.properties_count, 0) as properties_count,
    p.vanity_url,
    p.static_html_url
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
$function$;