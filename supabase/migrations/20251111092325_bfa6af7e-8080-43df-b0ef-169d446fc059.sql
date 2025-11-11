-- Add 'broker' to the html_generation_metadata entity_type check constraint
ALTER TABLE html_generation_metadata 
DROP CONSTRAINT IF EXISTS html_generation_metadata_entity_type_check;

ALTER TABLE html_generation_metadata 
ADD CONSTRAINT html_generation_metadata_entity_type_check 
CHECK (entity_type = ANY (ARRAY['property'::text, 'society'::text, 'area'::text, 'broker'::text]));