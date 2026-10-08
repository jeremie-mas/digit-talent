import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSupabaseServerClient } from "../supabase.server";
import { verifySignedToken } from "./admin.auth.functions";

function assertAuth(token: string) {
  const verified = verifySignedToken(token);
  if (!verified.valid) {
    throw new Error("Non autorisé. Session expirée ou invalide.");
  }
}

// ==============================================================================
// 1. STATISTIQUES & VÉRIFICATION SUPABASE
// ==============================================================================

export const getAdminStats = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();

    if (!supabase) {
      return {
        configured: false,
        stats: {
          articlesCount: 2,
          teamCount: 1,
          servicesCount: 5,
          projectsCount: 5,
          contactsCount: 0,
          unreadContactsCount: 0,
          trainingsCount: 0,
          newTrainingsCount: 0,
          bannersCount: 3,
        },
        recentContacts: [],
        recentTrainings: [],
      };
    }

    const safeCount = async (
      table: string,
      filter?: (query: any) => any,
      fallback = 0
    ): Promise<number> => {
      try {
        let q: any = supabase.from(table).select("id", { count: "exact", head: true });
        if (filter) q = filter(q);
        const res = await q;
        if (res.error) return fallback;
        if (res.count === null || res.count === undefined) return fallback;
        return res.count === 0 && fallback > 0 ? fallback : res.count;
      } catch {
        return fallback;
      }
    };

    const safeList = async (table: string, limit = 5): Promise<any[]> => {
      try {
        const { data: rows, error } = await supabase
          .from(table)
          .select("*")
          .order("created_at", { ascending: false })
          .limit(limit);
        if (error || !rows) return [];
        return rows;
      } catch {
        return [];
      }
    };

    const [
      articlesCount,
      teamCount,
      servicesCount,
      projectsCount,
      contactsCount,
      unreadContactsCount,
      trainingsCount,
      newTrainingsCount,
      bannersCount,
      recentContacts,
      recentTrainings,
    ] = await Promise.all([
      safeCount("articles", undefined, 2),
      safeCount("team_members", undefined, 1),
      safeCount("services", undefined, 5),
      safeCount("projects", undefined, 5),
      safeCount("contact_submissions", undefined, 0),
      safeCount("contact_submissions", (q) => q.eq("read", false), 0),
      safeCount("training_registrations", undefined, 0),
      safeCount("training_registrations", (q) => q.eq("status", "nouveau"), 0),
      safeCount("promotional_banners", undefined, 3),
      safeList("contact_submissions", 5),
      safeList("training_registrations", 5),
    ]);

    return {
      configured: true,
      stats: {
        articlesCount,
        teamCount,
        servicesCount,
        projectsCount,
        contactsCount,
        unreadContactsCount,
        trainingsCount,
        newTrainingsCount,
        bannersCount,
      },
      recentContacts,
      recentTrainings,
    };
  });

// ==============================================================================
// 2. ARTICLES / BLOG
// ==============================================================================


// ==============================================================================
// CONTENUS EXISTANTS PAR DEFAUT DU SITE DIGIT & TALENT (Pour initialisation)
// ==============================================================================
export const DEFAULT_SERVICES = [
  {
    title: "Conseil en Transformation Digitale",
    slug: "transformation-digitale",
    description: "Élaboration de feuille de route technologique, diagnostic de maturité digitale, automatisation des processus métiers et intégration de l'intelligence artificielle.",
    icon: "Cpu",
    sort_order: 1,
    published: true,
  },
  {
    title: "Formations Certifiantes en Management de Projet (PMP® & CAPM®)",
    slug: "formations-certifiantes",
    description: "Préparation intensive aux certifications internationales PMI® (PMP, CAPM) avec simulateurs d'examens, cas pratiques et coaching d'éligibilité.",
    icon: "GraduationCap",
    sort_order: 2,
    published: true,
  },
  {
    title: "Transformation Organisationnelle & Stratégique",
    slug: "transformation-organisationnelle",
    description: "Refonte des processus d'entreprise, alignement des équipes, optimisation des structures opérationnelles et gouvernance de la performance.",
    icon: "Workflow",
    sort_order: 3,
    published: true,
  },
  {
    title: "Conduite du Changement (PROSCI ADKAR)",
    slug: "change-management",
    description: "Accompagnement humain des transitions organisationnelles selon la méthodologie mondiale Prosci, plans de communication, de formation et d'adhésion.",
    icon: "Users",
    sort_order: 4,
    published: true,
  },
  {
    title: "Cybersécurité & Audit des Systèmes d'Information",
    slug: "cybersecurite",
    description: "Diagnostic de vulnérabilités, mise en conformité de sécurité, gouvernance des données et sensibilisation des collaborateurs aux cybermenaces.",
    icon: "ShieldCheck",
    sort_order: 5,
    published: true,
  },
];

export const DEFAULT_PROJECTS = [
  {
    client_name: "The World Bank – Projet FSRP",
    title: "Transformation digitale des processus et gestion de projet",
    testimonial: "Dans le cadre du Projet FSRP, DIGIT & TALENT nous a accompagnés avec professionnalisme dans la transformation digitale de nos processus. Leur expertise locale fait toute la différence.",
    logo_url: "",
    project_type: "Secteur Public & Développement",
    sort_order: 1,
    published: true,
  },
  {
    client_name: "Plan International Togo",
    title: "Formations certifiantes CAPM/PMP et renforcement de capacités",
    testimonial: "DIGIT & TALENT a transformé notre approche de la gestion de projets. Grâce à leurs formations CAPM/PMP, notre équipe a gagné en rigueur et en efficacité. Un partenaire sérieux, ancré dans les réalités africaines.",
    logo_url: "",
    project_type: "ONG & International",
    sort_order: 2,
    published: true,
  },
  {
    client_name: "SITELSO",
    title: "Conseil en modernisation et infrastructure des systèmes d'information",
    testimonial: "Un accompagnement rigoureux qui a permis d'optimiser nos flux opérationnels et d'accélérer l'adoption de nos nouvelles solutions numériques.",
    logo_url: "",
    project_type: "Télécoms & Tech",
    sort_order: 3,
    published: true,
  },
  {
    client_name: "Ministère de l'Agriculture, de l'Élevage et du Développement Rural",
    title: "Digitalisation des procédures opérationnelles et formation des cadres",
    testimonial: "Une démarche structurée et méthodique pour moderniser les processus administratifs et former nos équipes de coordination.",
    logo_url: "",
    project_type: "Gouvernement & Institutionnel",
    sort_order: 4,
    published: true,
  },
  {
    client_name: "UE-WB – Projet PAGE",
    title: "Assistance technique et pilotage de la gouvernance de projet",
    testimonial: "Expertise de haut niveau dans la mise en place des standards de management de projet internationaux.",
    logo_url: "",
    project_type: "Programme Multilatéral",
    sort_order: 5,
    published: true,
  },
];

export const DEFAULT_TEAM = [
  {
    name: "Constant YEDOU",
    role: "Fondateur & Directeur Conseil",
    bio: "Expert certifié PMP® et PMI-PMOCP®, avec plus de 15 ans d'expérience dans le conseil en transformation digitale et le management stratégique de projets en Afrique.",
    photo_url: "",
    linkedin_url: "https://www.linkedin.com/in/constant-yedou-pmp%C2%AE-pmi-pmocp%C2%AE-03a01740/",
    sort_order: 1,
  },
];

export const DEFAULT_ARTICLES = [
  {
    title: "Guide complet : Réussir les certifications PMP® et CAPM® en Afrique de l'Ouest",
    slug: "reussir-certifications-pmp-capm-afrique",
    category: "Formation PMP/CAPM",
    excerpt: "Découvrez la méthode éprouvée par DIGIT & TALENT pour valider votre examen PMI dès la première tentative grâce à un accompagnement d'experts certifiés.",
    content: "## Pourquoi obtenir la certification PMP® ?\n\nLa certification **PMP® (Project Management Professional)** délivrée par le Project Management Institute (PMI) est la référence mondiale absolue en gestion de projet. En Afrique de l'Ouest, les entreprises et organisations internationales recherchent activement des professionnels capables de piloter des projets complexes avec rigueur et agilité.\n\n### Les 3 piliers de la préparation DIGIT & TALENT\n\n1. **La maîtrise du PMBOK® & des approches agiles/hybrides** : Comprendre en profondeur les processus prédictifs, itératifs et adaptatifs.\n2. **Le simulateur d'examen blanc** : S'entraîner sur plus de 1 000 questions types conformes à l'Exam Content Outline (ECO).\n3. **L'accompagnement au dossier d'éligibilité** : Nos consultants vous guident pas à pas dans la formalisation de votre expérience auprès du PMI.\n\n### Les retours d'expérience\nNos candidats enregistrent un taux de réussite exceptionnel dès leur premier passage grâce à nos sessions intensives organisées en présentiel à Lomé et en classe virtuelle interactive.",
    cover_url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    published: true,
  },
  {
    title: "Transformation Digitale RH : Automatiser sans déshumaniser",
    slug: "transformation-digitale-rh-automatiser-sans-deshumaniser",
    category: "Transformation Digitale",
    excerpt: "Comment les directions des ressources humaines peuvent tirer parti des outils digitaux et de l'IA tout en renforçant l'engagement des collaborateurs.",
    content: "## L'avènement du SIRH intelligent\n\nLa transformation digitale des ressources humaines ne se résume pas à l'installation d'un logiciel de gestion de paie. Il s'agit d'une refonte globale de l'expérience collaborateur.\n\n### Les défis majeurs identifiés :\n- **L'automatisation des tâches répétitives** : Décharger les équipes RH de la saisie manuelle pour libérer du temps à forte valeur ajoutée.\n- **La conduite du changement (ADKAR)** : Accompagner les collaborateurs pour vaincre les résistances face aux nouveaux outils.\n- **L'analyse des talents (People Analytics)** : Prédire les besoins en compétences et fidéliser les talents clés.\n\nDIGIT & TALENT accompagne les institutions et entreprises dans cette transition stratégique avec une approche résolument humaine et orientée résultats.",
    cover_url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    published: true,
  },
];

export const DEFAULT_BANNERS = [
  {
    title: "Certifiez-vous PMP® avec DIGIT & TALENT",
    subtitle: "Obtenez la certification internationale et propulsez votre carrière dans la gestion de projet.",
    image_url: "",
    cta_label: "Voir les formations",
    cta_url: "/formation",
    sort_order: 1,
    active: true,
  },
  {
    title: "Transformation Digitale & IA pour Managers",
    subtitle: "Intégrez l'intelligence artificielle dans vos processus. Sessions disponibles en présentiel et en ligne.",
    image_url: "",
    cta_label: "S'inscrire maintenant",
    cta_url: "/formation",
    sort_order: 2,
    active: true,
  },
  {
    title: "Conduite du Changement — Prosci® ADKAR",
    subtitle: "Accompagnez vos équipes dans chaque transformation avec la méthode reconnue mondialement.",
    image_url: "",
    cta_label: "Découvrir",
    cta_url: "/formation",
    sort_order: 3,
    active: true,
  },
];

export const DEFAULT_SESSIONS = [
  {
    course_title: "Certification PMP® (Project Management Professional)",
    session_date: new Date(Date.now() + 14 * 86400000).toISOString(),
    location: "Lomé, Togo & En ligne",
    seats_available: 15,
    active: true,
  },
];

export const getAdminArticles = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) return { configured: false, items: DEFAULT_ARTICLES };

    let { data: items, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("getAdminArticles error:", error.message);
      return { configured: true, items: DEFAULT_ARTICLES };
    }

    if (!items || items.length === 0) {
      try {
        const { data: inserted } = await supabase.from("articles").insert(DEFAULT_ARTICLES).select("*");
        if (inserted && inserted.length > 0) return { configured: true, items: inserted };
      } catch (e) {
        console.warn("Échec auto-seed articles:", e);
      }
      return { configured: true, items: DEFAULT_ARTICLES };
    }

    return { configured: true, items: items ?? [] };
  });

export const saveAdminArticle = createServerFn({ method: "POST" })
  .validator(
    z.object({
      token: z.string(),
      article: z.object({
        id: z.string().optional(),
        title: z.string().min(1),
        slug: z.string().min(1),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        category: z.string().default("Actualité"),
        cover_url: z.string().optional(),
        published: z.boolean().default(false),
      }),
    })
  )
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) return { success: false, error: "Supabase non configuré." };

    const payload = {
      ...data.article,
      updated_at: new Date().toISOString(),
    };

    if (data.article.id) {
      const { error } = await supabase.from("articles").update(payload).eq("id", data.article.id);
      if (error) return { success: false, error: error.message };
    } else {
      const { id, ...createPayload } = payload;
      const { error } = await supabase.from("articles").insert([createPayload]);
      if (error) return { success: false, error: error.message };
    }

    return { success: true };
  });

export const deleteAdminArticle = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), id: z.string() }))
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) return { success: false, error: "Supabase non configuré." };

    const { error } = await supabase.from("articles").delete().eq("id", data.id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  });

// ==============================================================================
// 3. ÉQUIPE
// ==============================================================================

export const getAdminTeam = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) return { configured: false, items: DEFAULT_TEAM };

    let { data: items, error } = await supabase
      .from("team_members")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.warn("getAdminTeam error:", error.message);
      return { configured: true, items: DEFAULT_TEAM };
    }

    if (!items || items.length === 0) {
      try {
        const { data: inserted } = await supabase.from("team_members").insert(DEFAULT_TEAM).select("*");
        if (inserted && inserted.length > 0) return { configured: true, items: inserted };
      } catch (e) {
        console.warn("Échec auto-seed team:", e);
      }
      return { configured: true, items: DEFAULT_TEAM };
    }

    return { configured: true, items: items ?? [] };
  });

export const saveAdminTeamMember = createServerFn({ method: "POST" })
  .validator(
    z.object({
      token: z.string(),
      member: z.object({
        id: z.string().optional(),
        name: z.string().min(1),
        role: z.string().min(1),
        bio: z.string().optional(),
        photo_url: z.string().optional(),
        linkedin_url: z.string().optional(),
        sort_order: z.number().default(0),
      }),
    })
  )
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) return { success: false, error: "Supabase non configuré." };

    if (data.member.id) {
      const { error } = await supabase.from("team_members").update(data.member).eq("id", data.member.id);
      if (error) return { success: false, error: error.message };
    } else {
      const { id, ...createPayload } = data.member;
      const { error } = await supabase.from("team_members").insert([createPayload]);
      if (error) return { success: false, error: error.message };
    }

    return { success: true };
  });

export const deleteAdminTeamMember = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), id: z.string() }))
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) return { success: false, error: "Supabase non configuré." };

    const { error } = await supabase.from("team_members").delete().eq("id", data.id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  });

// ==============================================================================
// 4. SERVICES
// ==============================================================================

export const getAdminServices = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) return { configured: false, items: DEFAULT_SERVICES };

    let { data: items, error } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.warn("getAdminServices error:", error.message);
      return { configured: true, items: DEFAULT_SERVICES };
    }

    if (!items || items.length === 0) {
      try {
        const { data: inserted } = await supabase.from("services").insert(DEFAULT_SERVICES).select("*");
        if (inserted && inserted.length > 0) return { configured: true, items: inserted };
      } catch (e) {
        console.warn("Échec auto-seed services:", e);
      }
      return { configured: true, items: DEFAULT_SERVICES };
    }

    return { configured: true, items: items ?? [] };
  });

export const saveAdminService = createServerFn({ method: "POST" })
  .validator(
    z.object({
      token: z.string(),
      service: z.object({
        id: z.string().optional(),
        title: z.string().min(1),
        slug: z.string().min(1),
        description: z.string().optional(),
        icon: z.string().default("Cpu"),
        sort_order: z.number().default(0),
        published: z.boolean().default(true),
      }),
    })
  )
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) return { success: false, error: "Supabase non configuré." };

    if (data.service.id) {
      const { error } = await supabase.from("services").update(data.service).eq("id", data.service.id);
      if (error) return { success: false, error: error.message };
    } else {
      const { id, ...createPayload } = data.service;
      const { error } = await supabase.from("services").insert([createPayload]);
      if (error) return { success: false, error: error.message };
    }

    return { success: true };
  });

export const deleteAdminService = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), id: z.string() }))
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) return { success: false, error: "Supabase non configuré." };

    const { error } = await supabase.from("services").delete().eq("id", data.id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  });

// ==============================================================================
// 5. PROJETS / RÉFÉRENCES
// ==============================================================================

export const getAdminProjects = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) return { configured: false, items: DEFAULT_PROJECTS };

    let { data: items, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.warn("getAdminProjects error:", error.message);
      return { configured: true, items: DEFAULT_PROJECTS };
    }

    if (!items || items.length === 0) {
      try {
        const { data: inserted } = await supabase.from("projects").insert(DEFAULT_PROJECTS).select("*");
        if (inserted && inserted.length > 0) return { configured: true, items: inserted };
      } catch (e) {
        console.warn("Échec auto-seed projects:", e);
      }
      return { configured: true, items: DEFAULT_PROJECTS };
    }

    return { configured: true, items: items ?? [] };
  });

export const saveAdminProject = createServerFn({ method: "POST" })
  .validator(
    z.object({
      token: z.string(),
      project: z.object({
        id: z.string().optional(),
        client_name: z.string().min(1),
        title: z.string().optional(),
        testimonial: z.string().optional(),
        logo_url: z.string().optional(),
        project_type: z.string().optional(),
        sort_order: z.number().default(0),
        published: z.boolean().default(true),
      }),
    })
  )
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) return { success: false, error: "Supabase non configuré." };

    if (data.project.id) {
      const { error } = await supabase.from("projects").update(data.project).eq("id", data.project.id);
      if (error) return { success: false, error: error.message };
    } else {
      const { id, ...createPayload } = data.project;
      const { error } = await supabase.from("projects").insert([createPayload]);
      if (error) return { success: false, error: error.message };
    }

    return { success: true };
  });

export const deleteAdminProject = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), id: z.string() }))
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) return { success: false, error: "Supabase non configuré." };

    const { error } = await supabase.from("projects").delete().eq("id", data.id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  });

// ==============================================================================
// 6. MESSAGES DE CONTACT
// ==============================================================================

export const getAdminContactSubmissions = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) return { configured: false, items: [] };

    const { data: items, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return { configured: true, items: items ?? [] };
  });

export const markContactSubmissionRead = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), id: z.string(), read: z.boolean() }))
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) return { success: false, error: "Supabase non configuré." };

    const { error } = await supabase
      .from("contact_submissions")
      .update({ read: data.read })
      .eq("id", data.id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  });

export const deleteContactSubmission = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), id: z.string() }))
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) return { success: false, error: "Supabase non configuré." };

    const { error } = await supabase.from("contact_submissions").delete().eq("id", data.id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  });

// ==============================================================================
// 7. INSCRIPTIONS AUX FORMATIONS
// ==============================================================================

export const getAdminTrainingRegistrations = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) return { configured: false, items: [] };

    const { data: items, error } = await supabase
      .from("training_registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return { configured: true, items: items ?? [] };
  });

export const updateTrainingRegistrationStatus = createServerFn({ method: "POST" })
  .validator(
    z.object({
      token: z.string(),
      id: z.string(),
      status: z.enum(["nouveau", "contacte", "confirme", "annule"]),
    })
  )
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) return { success: false, error: "Supabase non configuré." };

    const { error } = await supabase
      .from("training_registrations")
      .update({ status: data.status })
      .eq("id", data.id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  });

export const deleteTrainingRegistration = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), id: z.string() }))
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) return { success: false, error: "Supabase non configuré." };

    const { error } = await supabase.from("training_registrations").delete().eq("id", data.id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  });

// ==============================================================================
// BANNIÈRES PUBLICITAIRES (admin CRUD)
// ==============================================================================
export const getAdminBanners = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) return { banners: DEFAULT_BANNERS };
    let { data: rows, error } = await supabase
      .from("promotional_banners")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.warn("getAdminBanners error:", error.message);
      return { banners: DEFAULT_BANNERS };
    }

    if (!rows || rows.length === 0) {
      try {
        const { data: inserted } = await supabase.from("promotional_banners").insert(DEFAULT_BANNERS).select("*");
        if (inserted && inserted.length > 0) return { banners: inserted };
      } catch (e) {
        console.warn("Échec auto-seed banners:", e);
      }
      return { banners: DEFAULT_BANNERS };
    }

    return { banners: rows || [] };
  });

export const upsertAdminBanner = createServerFn({ method: "POST" })
  .validator(z.object({
    token: z.string(),
    banner: z.object({
      id: z.string().optional(),
      title: z.string().min(1),
      subtitle: z.string().optional(),
      image_url: z.string().optional(),
      cta_label: z.string().optional(),
      cta_url: z.string().optional(),
      sort_order: z.number().default(0),
      active: z.boolean().default(true),
    }),
  }))
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) throw new Error("Supabase non configuré");
    const { id, ...rest } = data.banner;
    if (id) {
      const { error } = await supabase.from("promotional_banners").update(rest).eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase.from("promotional_banners").insert(rest);
      if (error) throw new Error(error.message);
    }
    return { success: true };
  });

export const deleteAdminBanner = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), id: z.string() }))
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) throw new Error("Supabase non configuré");
    const { error } = await supabase.from("promotional_banners").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { success: true };
  });

// ==============================================================================
// SESSIONS DE FORMATION PLANIFIÉES (admin CRUD)
// ==============================================================================
export const getAdminSessions = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) return { sessions: DEFAULT_SESSIONS };
    let { data: rows, error } = await supabase
      .from("training_sessions")
      .select("*")
      .order("session_date", { ascending: true });

    if (error) {
      console.warn("getAdminSessions error:", error.message);
      return { sessions: DEFAULT_SESSIONS };
    }

    if (!rows || rows.length === 0) {
      try {
        const { data: inserted } = await supabase.from("training_sessions").insert(DEFAULT_SESSIONS).select("*");
        if (inserted && inserted.length > 0) return { sessions: inserted };
      } catch (e) {
        console.warn("Échec auto-seed sessions:", e);
      }
      return { sessions: DEFAULT_SESSIONS };
    }

    return { sessions: rows || [] };
  });

export const upsertAdminSession = createServerFn({ method: "POST" })
  .validator(z.object({
    token: z.string(),
    session: z.object({
      id: z.string().optional(),
      course_title: z.string().min(1),
      session_date: z.string().min(1),
      location: z.string().default("Lomé, Togo"),
      seats_available: z.number().default(20),
      active: z.boolean().default(true),
    }),
  }))
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) throw new Error("Supabase non configuré");
    const { id, ...rest } = data.session;
    if (id) {
      const { error } = await supabase.from("training_sessions").update(rest).eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase.from("training_sessions").insert(rest);
      if (error) throw new Error(error.message);
    }
    return { success: true };
  });

export const deleteAdminSession = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), id: z.string() }))
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) throw new Error("Supabase non configuré");
    const { error } = await supabase.from("training_sessions").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { success: true };
  });

// ==============================================================================
// 9. TELEVERSEMENT DE MEDIAS / IMAGES (Upload API)
// ==============================================================================
export const uploadAdminMedia = createServerFn({ method: "POST" })
  .validator(
    z.object({
      token: z.string(),
      fileName: z.string(),
      fileType: z.string(),
      base64Data: z.string(),
      folder: z.string().default("general"),
    })
  )
  .handler(async ({ data }) => {
    assertAuth(data.token);

    // Nettoyer les donnees base64
    const matches = data.base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const mimeType = matches ? matches[1] : data.fileType;
    const rawBase64 = matches ? matches[2] : data.base64Data;
    const buffer = Buffer.from(rawBase64, "base64");

    // Limite de taille : 10 Mo
    if (buffer.length > 10 * 1024 * 1024) {
      throw new Error("Le fichier est trop volumineux (maximum 10 Mo).");
    }

    const extMatch = data.fileName.split(".").pop();
    const extension = (extMatch ? extMatch.toLowerCase() : "jpg").replace(/[^a-z0-9]/g, "");
    const cleanBaseName =
      data.fileName
        .substring(0, data.fileName.lastIndexOf(".") > 0 ? data.fileName.lastIndexOf(".") : data.fileName.length)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .substring(0, 35) || "image";

    const uniqueFileName = `${data.folder}/${Date.now()}-${cleanBaseName}.${extension}`;

    // 1. Essayer Supabase Storage
    const supabase = getSupabaseServerClient();
    if (supabase) {
      try {
        const bucketName = "dt-media";
        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(uniqueFileName, buffer, {
            contentType: mimeType || "image/jpeg",
            upsert: true,
          });

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(uniqueFileName);

          if (publicUrlData?.publicUrl) {
            return {
              success: true,
              url: publicUrlData.publicUrl,
              storage: "supabase",
            };
          }
        }
      } catch (err) {
        console.warn("Echec upload Supabase Storage, bascule en local:", err);
      }
    }

    // 2. Repli local dans public/uploads/
    try {
      const fs = await import("node:fs/promises");
      const path = await import("node:path");
      const localUploadDir = path.join(process.cwd(), "public", "uploads", data.folder);
      await fs.mkdir(localUploadDir, { recursive: true });

      const localFileName = `${Date.now()}-${cleanBaseName}.${extension}`;
      const localFilePath = path.join(localUploadDir, localFileName);
      await fs.writeFile(localFilePath, buffer);

      return {
        success: true,
        url: `/uploads/${data.folder}/${localFileName}`,
        storage: "local",
      };
    } catch (fsErr: any) {
      console.error("Erreur ecriture fichier local:", fsErr);
      throw new Error("Impossible d'enregistrer l'image : " + (fsErr?.message || "Erreur systeme"));
    }
  });

// ==============================================================================
// 10. SYNCHRONISATION / INITIALISATION COMPLETE DES CONTENUS DU SITE
// ==============================================================================
export const seedDefaultAdminContent = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), force: z.boolean().default(false) }))
  .handler(async ({ data }) => {
    assertAuth(data.token);
    const supabase = getSupabaseServerClient();
    if (!supabase) throw new Error("Supabase n'est pas encore configuré.");

    const results = {
      services: 0,
      projects: 0,
      team: 0,
      articles: 0,
      banners: 0,
      sessions: 0,
    };

    // Services
    const { count: sCount } = await supabase.from("services").select("*", { count: "exact", head: true });
    if (data.force || (sCount ?? 0) === 0) {
      const { data: ins } = await supabase.from("services").insert(DEFAULT_SERVICES).select("id");
      results.services = ins?.length ?? DEFAULT_SERVICES.length;
    }

    // Projets
    const { count: pCount } = await supabase.from("projects").select("*", { count: "exact", head: true });
    if (data.force || (pCount ?? 0) === 0) {
      const { data: ins } = await supabase.from("projects").insert(DEFAULT_PROJECTS).select("id");
      results.projects = ins?.length ?? DEFAULT_PROJECTS.length;
    }

    // Équipe
    const { count: tCount } = await supabase.from("team_members").select("*", { count: "exact", head: true });
    if (data.force || (tCount ?? 0) === 0) {
      const { data: ins } = await supabase.from("team_members").insert(DEFAULT_TEAM).select("id");
      results.team = ins?.length ?? DEFAULT_TEAM.length;
    }

    // Articles
    const { count: aCount } = await supabase.from("articles").select("*", { count: "exact", head: true });
    if (data.force || (aCount ?? 0) === 0) {
      const { data: ins } = await supabase.from("articles").insert(DEFAULT_ARTICLES).select("id");
      results.articles = ins?.length ?? DEFAULT_ARTICLES.length;
    }

    // Bannières
    const { count: bCount } = await supabase.from("promotional_banners").select("*", { count: "exact", head: true });
    if (data.force || (bCount ?? 0) === 0) {
      const { data: ins } = await supabase.from("promotional_banners").insert(DEFAULT_BANNERS).select("id");
      results.banners = ins?.length ?? DEFAULT_BANNERS.length;
    }

    // Sessions
    const { count: sessCount } = await supabase.from("training_sessions").select("*", { count: "exact", head: true });
    if (data.force || (sessCount ?? 0) === 0) {
      const { data: ins } = await supabase.from("training_sessions").insert(DEFAULT_SESSIONS).select("id");
      results.sessions = ins?.length ?? DEFAULT_SESSIONS.length;
    }

    return { success: true, results };
  });
