import { imagery } from "@/assets/imagery";
import { useT } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";

export const DEFAULT_CLIENTS = [
  { img: imagery.worldBank, alt: "The World Bank – Projet FSRP" },
  { img: imagery.sitelso, alt: "SITELSO" },
  { img: imagery.ministereAgriculture, alt: "Ministère de l'Agriculture" },
  { img: imagery.ueWbPage, alt: "UE-WB – Projet PAGE" },
  { img: imagery.planInternational, alt: "Plan International" },
];

/** Références clients : bande de logos qui défile en continu (pause au survol). */
export function ClientLogos({ clients = DEFAULT_CLIENTS }: { clients?: { img: string; alt: string }[] }) {
  const { t } = useT();
  // Assez de logos pour remplir la largeur, puis doublés pour une boucle sans couture
  const row = clients.length < 8 ? [...clients, ...clients] : clients;

  return (
    <section className="py-20">
      <div className="container-site">
        <SectionHeading align="center" eyebrow={t("home.clients.eyebrow")} title={t("home.clients.title")} />
      </div>
      <div className="group mt-12 overflow-hidden border-y border-border [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
              {row.map((c, i) => (
                <li
                  key={`${c.alt}-${i}`}
                  className="flex h-32 w-56 shrink-0 items-center justify-center border-r border-border px-8"
                  title={c.alt}
                >
                  <img
                    src={c.img}
                    alt={copy === 1 ? "" : c.alt}
                    decoding="async"
                    className="max-h-16 w-auto max-w-[140px] object-contain opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
