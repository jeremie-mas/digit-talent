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

/** Références clients : logos en grille, sobres (niveaux de gris, couleur au survol). */
export function ClientLogos({ clients = DEFAULT_CLIENTS }: { clients?: { img: string; alt: string }[] }) {
  const { t } = useT();
  return (
    <section className="bg-mesh py-20">
      <div className="container-site">
        <SectionHeading align="center" eyebrow={t("home.clients.eyebrow")} title={t("home.clients.title")} />
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((c, i) => (
            <li
              key={`${c.alt}-${i}`}
              className="group card-surface card-interactive flex h-28 items-center justify-center p-5"
              title={c.alt}
            >
              <img
                src={c.img}
                alt={c.alt}
                loading="lazy"
                className="max-h-16 w-auto max-w-[130px] object-contain opacity-70 grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
