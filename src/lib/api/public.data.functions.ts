import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSupabaseServerClient } from "../supabase.server";

export interface PublicArticle {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  category: string;
  cover_url?: string;
  created_at: string;
}

export interface PublicTeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photo_url?: string;
  linkedin_url?: string;
  sort_order: number;
}

export interface PublicProject {
  id: string;
  client_name: string;
  title?: string;
  testimonial?: string;
  logo_url?: string;
  project_type?: string;
  sort_order: number;
}

export interface PublicService {
  id: string;
  title: string;
  slug: string;
  description?: string;
  icon: string;
  sort_order: number;
}

// Articles par défaut en cas d'absence dans Supabase
export const FALLBACK_ARTICLES: PublicArticle[] = [
  {
    id: "fallback-pmp-guide",
    title: "Guide complet : Réussir les certifications PMP® et CAPM® en Afrique de l'Ouest",
    slug: "reussir-certifications-pmp-capm-afrique",
    category: "Formation PMP/CAPM",
    excerpt: "Découvrez la méthode éprouvée par DIGIT & TALENT pour valider votre examen PMI dès la première tentative grâce à un accompagnement d'experts certifiés.",
    content: `## Pourquoi obtenir la certification PMP® ?

La certification **PMP® (Project Management Professional)** délivrée par le Project Management Institute (PMI) est la référence mondiale absolue en gestion de projet. En Afrique de l'Ouest, les entreprises et organisations internationales recherchent activement des professionnels capables de piloter des projets complexes avec rigueur et agilité.

### Les 3 piliers de la préparation DIGIT & TALENT

1. **La maîtrise du PMBOK® & des approches agiles/hybrides** : Comprendre en profondeur les processus prédictifs, itératifs et adaptatifs.
2. **Le simulateur d'examen blanc** : S'entraîner sur plus de 1 000 questions types conformes à l'Exam Content Outline (ECO).
3. **L'accompagnement au dossier d'éligibilité** : Nos consultants vous guident pas à pas dans la formalisation de votre expérience auprès du PMI.

### Les retours d'expérience
Nos candidats enregistrent un taux de réussite exceptionnel dès leur premier passage grâce à nos sessions intensives organisées en présentiel à Lomé et en classe virtuelle interactive.`,
    cover_url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    created_at: new Date().toISOString(),
  },
  {
    id: "fallback-rh-digital",
    title: "Transformation Digitale RH : Automatiser sans déshumaniser",
    slug: "transformation-digitale-rh-automatiser-sans-deshumaniser",
    category: "Transformation Digitale",
    excerpt: "Comment les directions des ressources humaines peuvent tirer parti des outils digitaux et de l'IA tout en renforçant l'engagement des collaborateurs.",
    content: `## L'avènement du SIRH intelligent

La transformation digitale des ressources humaines ne se résume pas à l'installation d'un logiciel de gestion de paie. Il s'agit d'une refonte globale de l'expérience collaborateur.

### Les défis majeurs identifiés :
- **L'automatisation des tâches répétitives** : Décharger les équipes RH de la saisie manuelle pour libérer du temps à forte valeur ajoutée.
- **La conduite du changement (ADKAR)** : Accompagner les collaborateurs pour vaincre les résistances face aux nouveaux outils.
- **L'analyse des talents (People Analytics)** : Prédire les besoins en compétences et fidéliser les talents clés.

DIGIT & TALENT accompagne les institutions et entreprises dans cette transition stratégique avec une approche résolument humaine et orientée résultats.`,
    cover_url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
];

// Membres d'équipe par défaut (si la table Supabase est vide)
export const FALLBACK_TEAM: PublicTeamMember[] = [
  {
    id: "fallback-founder",
    name: "Constant YEDOU",
    role: "Fondateur & Directeur Conseil",
    bio: "Expert certifié PMP® et PMI-PMOCP®, avec plus de 15 ans d'expérience dans le conseil en transformation digitale et le management stratégique de projets en Afrique.",
    photo_url: "",
    linkedin_url: "https://www.linkedin.com/in/constant-yedou-pmp%C2%AE-pmi-pmocp%C2%AE-03a01740/",
    sort_order: 1,
  },
];

// ==============================================================================
// 1. ARTICLES PUBLICS
// ==============================================================================

export const getPublicArticles = createServerFn({ method: "GET" })
  .handler(async () => {
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return { items: FALLBACK_ARTICLES, fromFallback: true };
    }

    try {
      const { data, error } = await supabase
        .from("articles")
        .select("id, title, slug, excerpt, content, category, cover_url, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error || !data || data.length === 0) {
        return { items: FALLBACK_ARTICLES, fromFallback: true };
      }

      return { items: data as PublicArticle[], fromFallback: false };
    } catch {
      return { items: FALLBACK_ARTICLES, fromFallback: true };
    }
  });

export const getPublicArticleBySlug = createServerFn({ method: "POST" })
  .validator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      const found = FALLBACK_ARTICLES.find((a) => a.slug === data.slug);
      return { article: found || null };
    }

    try {
      const { data: article, error } = await supabase
        .from("articles")
        .select("id, title, slug, excerpt, content, category, cover_url, created_at")
        .eq("slug", data.slug)
        .eq("published", true)
        .single();

      if (error || !article) {
        const found = FALLBACK_ARTICLES.find((a) => a.slug === data.slug);
        return { article: found || null };
      }

      return { article: article as PublicArticle };
    } catch {
      const found = FALLBACK_ARTICLES.find((a) => a.slug === data.slug);
      return { article: found || null };
    }
  });

// ==============================================================================
// 2. ÉQUIPE PUBLIQUE
// ==============================================================================

export const getPublicTeam = createServerFn({ method: "GET" })
  .handler(async () => {
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return { items: FALLBACK_TEAM, fromFallback: true };
    }

    try {
      const { data, error } = await supabase
        .from("team_members")
        .select("id, name, role, bio, photo_url, linkedin_url, sort_order")
        .order("sort_order", { ascending: true });

      if (error || !data || data.length === 0) {
        return { items: FALLBACK_TEAM, fromFallback: true };
      }

      return { items: data as PublicTeamMember[], fromFallback: false };
    } catch {
      return { items: FALLBACK_TEAM, fromFallback: true };
    }
  });

// ==============================================================================
// 3. PROJETS & CLIENTS PUBLICS
// ==============================================================================

export const getPublicProjects = createServerFn({ method: "GET" })
  .handler(async () => {
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return { items: [], fromFallback: true };
    }

    try {
      const { data, error } = await supabase
        .from("projects")
        .select("id, client_name, title, testimonial, logo_url, project_type, sort_order")
        .eq("published", true)
        .order("sort_order", { ascending: true });

      if (error || !data) {
        return { items: [], fromFallback: true };
      }

      return { items: data as PublicProject[], fromFallback: false };
    } catch {
      return { items: [], fromFallback: true };
    }
  });

// ==============================================================================
// 4. SERVICES PUBLICS DYNAMIQUES
// ==============================================================================

export const getPublicServices = createServerFn({ method: "GET" })
  .handler(async () => {
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return { items: [], fromFallback: true };
    }

    try {
      const { data, error } = await supabase
        .from("services")
        .select("id, title, slug, description, icon, sort_order")
        .eq("published", true)
        .order("sort_order", { ascending: true });

      if (error || !data) {
        return { items: [], fromFallback: true };
      }

      return { items: data as PublicService[], fromFallback: false };
    } catch {
      return { items: [], fromFallback: true };
    }
  });

// ==============================================================================
// BANNIÈRES PUBLICITAIRES (public)
// ==============================================================================
export interface PublicBanner {
  id: string;
  title: string;
  subtitle?: string;
  image_url?: string;
  cta_label?: string;
  cta_url?: string;
  sort_order: number;
  active: boolean;
}

export const getPublicBanners = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseServerClient();
  if (!supabase) return { banners: [] as PublicBanner[] };
  try {
    const { data } = await supabase
      .from("promotional_banners")
      .select("id, title, subtitle, image_url, cta_label, cta_url, sort_order, active")
      .eq("active", true)
      .order("sort_order", { ascending: true });
    return { banners: (data || []) as PublicBanner[] };
  } catch {
    return { banners: [] as PublicBanner[] };
  }
});

// ==============================================================================
// SESSIONS DE FORMATION PLANIFIÉES (public)
// ==============================================================================
export interface PublicTrainingSession {
  id: string;
  course_title: string;
  session_date: string;
  location?: string;
  seats_available?: number;
  active: boolean;
}

export const getPublicTrainingSessions = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseServerClient();
  if (!supabase) return { sessions: [] as PublicTrainingSession[] };
  try {
    const now = new Date().toISOString();
    const { data } = await supabase
      .from("training_sessions")
      .select("id, course_title, session_date, location, seats_available, active")
      .eq("active", true)
      .gt("session_date", now)
      .order("session_date", { ascending: true });
    return { sessions: (data || []) as PublicTrainingSession[] };
  } catch {
    return { sessions: [] as PublicTrainingSession[] };
  }
});
