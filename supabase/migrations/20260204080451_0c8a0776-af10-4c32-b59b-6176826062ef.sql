-- Add profile_photo_url column to invite_requests table
ALTER TABLE public.invite_requests
ADD COLUMN profile_photo_url TEXT NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.invite_requests.profile_photo_url IS 'URL to the uploaded profile photo from storage';