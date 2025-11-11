-- Drop the existing trigger
DROP TRIGGER IF EXISTS trigger_queue_broker_html_generation ON public.profiles;

-- Create separate trigger for INSERT - always queue new profiles
CREATE TRIGGER trigger_queue_broker_html_generation_insert
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  WHEN (NEW.full_name IS NOT NULL AND NEW.vanity_url IS NOT NULL)
  EXECUTE FUNCTION public.queue_html_generation();

-- Create trigger for UPDATE - only queue when content fields change
CREATE TRIGGER trigger_queue_broker_html_generation_update
  AFTER UPDATE ON public.profiles
  FOR EACH ROW
  WHEN (
    NEW.full_name IS NOT NULL 
    AND NEW.vanity_url IS NOT NULL
    AND (
      -- Only queue if content fields changed (ignore static_html_url updates)
      OLD.full_name IS DISTINCT FROM NEW.full_name
      OR OLD.company_name IS DISTINCT FROM NEW.company_name
      OR OLD.bio IS DISTINCT FROM NEW.bio
      OR OLD.avatar_url IS DISTINCT FROM NEW.avatar_url
      OR OLD.city IS DISTINCT FROM NEW.city
      OR OLD.areas IS DISTINCT FROM NEW.areas
      OR OLD.rating IS DISTINCT FROM NEW.rating
      OR OLD.vanity_url IS DISTINCT FROM NEW.vanity_url
    )
  )
  EXECUTE FUNCTION public.queue_html_generation();