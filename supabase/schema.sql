-- ==============================================================================
-- SCHÉMA DE BASE DE DONNÉES SUPABASE POUR L'ESPACE ADMIN DIGIT & TALENT
-- Exécutez ce script dans l'éditeur SQL de votre projet Supabase (SQL Editor)
-- ==============================================================================

-- 1. Table des articles de blog
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT DEFAULT 'Actualité',
  cover_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Table des membres de l'équipe
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  photo_url TEXT,
  linkedin_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Table des services proposés
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'Cpu',
  sort_order INT DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Table des projets et références clients
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  title TEXT,
  testimonial TEXT,
  logo_url TEXT,
  project_type TEXT,
  published BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Table des formulaires de contact reçus
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  company TEXT,
  phone TEXT,
  subject TEXT,
  message TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Table des inscriptions aux formations
CREATE TABLE IF NOT EXISTS public.training_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  role TEXT,
  training_course TEXT NOT NULL,
  session_preference TEXT,
  message TEXT,
  status TEXT DEFAULT 'nouveau',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Activation de Row Level Security (RLS)
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_registrations ENABLE ROW LEVEL SECURITY;

-- Politiques d'accès complet (pour supporter à la fois la clé service_role et la clé publishable/anon)
DROP POLICY IF EXISTS "Lecture publique articles publiés" ON public.articles;
DROP POLICY IF EXISTS "Gestion complete articles" ON public.articles;
CREATE POLICY "Gestion complete articles" ON public.articles
  FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Lecture publique membres équipe" ON public.team_members;
DROP POLICY IF EXISTS "Gestion complete equipe" ON public.team_members;
CREATE POLICY "Gestion complete equipe" ON public.team_members
  FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Lecture publique services publiés" ON public.services;
DROP POLICY IF EXISTS "Gestion complete services" ON public.services;
CREATE POLICY "Gestion complete services" ON public.services
  FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Lecture publique projets publiés" ON public.projects;
DROP POLICY IF EXISTS "Gestion complete projets" ON public.projects;
CREATE POLICY "Gestion complete projets" ON public.projects
  FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Insertion publique formulaire contact" ON public.contact_submissions;
DROP POLICY IF EXISTS "Gestion complete messages contact" ON public.contact_submissions;
CREATE POLICY "Gestion complete messages contact" ON public.contact_submissions
  FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Insertion publique inscription formation" ON public.training_registrations;
DROP POLICY IF EXISTS "Gestion complete inscriptions formations" ON public.training_registrations;
CREATE POLICY "Gestion complete inscriptions formations" ON public.training_registrations
  FOR ALL USING (true) WITH CHECK (true);


-- ==============================================================================
-- 7. Bannières publicitaires (carousel page d'accueil)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.promotional_banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT,
  cta_label TEXT,
  cta_url TEXT,
  sort_order INT DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 8. Sessions de formation planifiées (compte à rebours page d'accueil)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.training_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_title TEXT NOT NULL,
  session_date TIMESTAMPTZ NOT NULL,
  location TEXT DEFAULT 'Lomé, Togo',
  seats_available INT DEFAULT 20,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS pour les nouvelles tables
ALTER TABLE public.promotional_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Gestion complete bannieres" ON public.promotional_banners;
CREATE POLICY "Gestion complete bannieres" ON public.promotional_banners
  FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Gestion complete sessions formation" ON public.training_sessions;
CREATE POLICY "Gestion complete sessions formation" ON public.training_sessions
  FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- 9. Storage Bucket pour les médias & visuels (dt-media)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('dt-media', 'dt-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Politiques d'acces public en lecture et ecriture pour le bucket dt-media
DROP POLICY IF EXISTS "Public access to dt-media" ON storage.objects;
CREATE POLICY "Public access to dt-media" ON storage.objects
  FOR SELECT USING (bucket_id = 'dt-media');

DROP POLICY IF EXISTS "Upload access to dt-media" ON storage.objects;
CREATE POLICY "Upload access to dt-media" ON storage.objects
  FOR ALL USING (bucket_id = 'dt-media') WITH CHECK (bucket_id = 'dt-media');
