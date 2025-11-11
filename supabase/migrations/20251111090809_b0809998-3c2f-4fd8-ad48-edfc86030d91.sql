-- Add 'broker' to the entity_type check constraint
ALTER TABLE html_generation_queue 
DROP CONSTRAINT html_generation_queue_entity_type_check;

ALTER TABLE html_generation_queue 
ADD CONSTRAINT html_generation_queue_entity_type_check 
CHECK (entity_type = ANY (ARRAY['property'::text, 'society'::text, 'area'::text, 'broker'::text]));