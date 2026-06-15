
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company text,
  service text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert (public contact form)
CREATE POLICY "allow_anonymous_insert" ON contact_submissions
  FOR INSERT TO anon WITH CHECK (true);

-- Only authenticated users (admins) can read submissions
CREATE POLICY "allow_authenticated_select" ON contact_submissions
  FOR SELECT TO authenticated USING (true);
