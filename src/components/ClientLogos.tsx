import { imagery } from "@/assets/imagery";
import { useT } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";

export const DEFAULT_CLIENTS = [
  { img: imagery.worldBank, alt: "The World Bank (Projet FSRP)" },
  { img: imagery.sitelso, alt: "SITELSO" },
  { img: imagery.ministereAgriculture, alt: "Ministère de l'Agriculture" },
  { img: imagery.ueWbPage, alt: "UE-WB (Projet PAGE)" },
  { img: imagery.planInternational, alt: "Plan International" },
];

/** Références clients : logos en grille, en niveaux de gris (couleur au survol). */
export function ClientLogos({ clients = DEFAULT_CLIENTS }: { clients?: { img: string; alt: string }[] }) {
  const { t } = useT();
  return (
    <section className="py-20">
      <div className="container-site">
        <SectionHeading align="center" title={t("home.clients.title")} />
        <ul className="mt-12 grid grid-cols-2 border-l border-t border-border sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((c, i) => (
            <li key={`${c.alt}-${i}`} className="flex h-32 items-center justify-center border-b border-r border-border bg-white p-6" title={c.alt}>
              <img
                src={c.img}
                alt={c.alt}
                decoding="async"
                className="max-h-16 w-auto max-w-[130px] object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
