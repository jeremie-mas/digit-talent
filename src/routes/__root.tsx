import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
// LIGNE SUPPRIMÉE : import { reportdigit_talentError } from "../lib/digit_talent-error-reporting";
import { LanguageProvider } from "@/i18n/LanguageProvider";

const SITE_URL = "https://www.digit-talent.com";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

// Données structurées (JSON-LD) pour le référencement local
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DIGIT & TALENT",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  image: OG_IMAGE,
  description:
    "Consulting firm based in Lomé, Togo: digital transformation, PMP/CAPM training, Prosci ADKAR change management and cybersecurity.",
  foundingDate: "2012-10-04",
  email: "contact@digit-talent.com",
  telephone: "+228 91 98 20 23",
  address: {
    "@type": "PostalAddress",
    streetAddress: "96, Rue Gbotobare, Quartier Todman Casablanca",
    addressLocality: "Lomé",
    addressCountry: "TG",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "07:30",
    closes: "18:00",
  },
  areaServed: "Africa",
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  // SECTION COMMENTÉE : useEffect pour reportdigit_talentError
  // useEffect(() => {
  //   reportdigit_talentError(error, { boundary: "tanstack_root_error_component" });
  // }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Cette page n'a pas pu se charger</h1>
        <p className="mt-2 text-sm text-muted-foreground">Une erreur est survenue. Réessayez ou retournez à l'accueil.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
          >
            Réessayer
          </button>
          <a href="/" className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold">Accueil</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: ({ matches }) => {
    const pathname = matches[matches.length - 1]?.pathname ?? "/";
    const canonical = `${SITE_URL}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#0A2540" },
        { title: "DIGIT & TALENT — Digital Transformation & Talent Consulting" },
        { name: "description", content: "Consulting firm based in Lomé, Togo: digital transformation, cybersecurity, organizational transformation, change management and PMP/CAPM training." },
        { name: "author", content: "DIGIT & TALENT" },
        { property: "og:title", content: "DIGIT & TALENT" },
        { property: "og:description", content: "The convergence of digital and talent at the service of your growth." },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "DIGIT & TALENT" },
        { property: "og:locale", content: "en_US" },
        { property: "og:locale:alternate", content: "fr_FR" },
        { property: "og:url", content: canonical },
        { property: "og:image", content: OG_IMAGE },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: OG_IMAGE },
      ],
      links: [
        { rel: "canonical", href: canonical },
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "apple-touch-icon", href: "/favicon.png" },
        ...(matches.some((match) => match.routeId.startsWith("/admin"))
          ? [{ rel: "manifest" as const, href: "/admin/manifest.webmanifest" }]
          : []),
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" },
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(organizationJsonLd) },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch((error) => {
        console.error("Impossible d'enregistrer le service worker :", error);
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Outlet />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
