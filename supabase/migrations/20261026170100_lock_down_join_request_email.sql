-- Join request form hardening.
-- 1. send-notification-email now only sends the fixed "request received" emails for a row in
--    invite_requests, once. This column records that it was sent.
-- 2. invite-photos (anonymous uploads from the form): images only, at most 5 MB.

alter table public.invite_requests
  add column if not exists confirmation_sent_at timestamptz;

update storage.buckets
set file_size_limit = 5242880,
    allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
where id = 'invite-photos';
