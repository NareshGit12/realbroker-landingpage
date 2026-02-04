-- Create storage bucket for invite request photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('invite-photos', 'invite-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload photos (since users are not logged in when requesting access)
CREATE POLICY "Anyone can upload invite photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'invite-photos');

-- Allow public read access to photos
CREATE POLICY "Public read access for invite photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'invite-photos');