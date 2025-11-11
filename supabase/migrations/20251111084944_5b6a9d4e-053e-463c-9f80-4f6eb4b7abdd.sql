-- Add static_html_url column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS static_html_url TEXT;

-- Update queue_html_generation() function to handle broker profiles
CREATE OR REPLACE FUNCTION public.queue_html_generation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- For properties
  IF TG_TABLE_NAME = 'properties' THEN
    INSERT INTO public.html_generation_queue (entity_type, entity_id, priority)
    VALUES ('property', NEW.id::text, 5)
    ON CONFLICT DO NOTHING;
    
    UPDATE public.html_generation_metadata
    SET needs_regeneration = true, updated_at = NOW()
    WHERE entity_type = 'property' AND entity_id = NEW.id::text;
  END IF;
  
  -- For societies
  IF TG_TABLE_NAME = 'society' THEN
    INSERT INTO public.html_generation_queue (entity_type, entity_id, priority)
    VALUES ('society', NEW.id::text, 5)
    ON CONFLICT DO NOTHING;
    
    UPDATE public.html_generation_metadata
    SET needs_regeneration = true, updated_at = NOW()
    WHERE entity_type = 'society' AND entity_id = NEW.id::text;
  END IF;
  
  -- For local areas
  IF TG_TABLE_NAME = 'local_areas' THEN
    INSERT INTO public.html_generation_queue (entity_type, entity_id, priority)
    VALUES ('area', NEW.id::text, 5)
    ON CONFLICT DO NOTHING;
    
    UPDATE public.html_generation_metadata
    SET needs_regeneration = true, updated_at = NOW()
    WHERE entity_type = 'area' AND entity_id = NEW.id::text;
  END IF;
  
  -- For broker profiles
  IF TG_TABLE_NAME = 'profiles' THEN
    INSERT INTO public.html_generation_queue (entity_type, entity_id, priority)
    VALUES ('broker', NEW.id::text, 5)
    ON CONFLICT DO NOTHING;
    
    UPDATE public.html_generation_metadata
    SET needs_regeneration = true, updated_at = NOW()
    WHERE entity_type = 'broker' AND entity_id = NEW.id::text;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Create trigger on profiles table for HTML generation
DROP TRIGGER IF EXISTS trigger_queue_broker_html_generation ON public.profiles;

CREATE TRIGGER trigger_queue_broker_html_generation
  AFTER INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  WHEN (NEW.full_name IS NOT NULL AND NEW.vanity_url IS NOT NULL)
  EXECUTE FUNCTION public.queue_html_generation();