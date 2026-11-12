import amadouMaiga from "@/assets/certifies/amadou-maiga.webp";
import amyNabiliou from "@/assets/certifies/amy-nabiliou.webp";

/**
 * Professionnels certifiés après une formation DIGIT & TALENT (page /certifies).
 * Les plus récents en premier : les premiers avec un visuel sont mis en avant sur l'accueil.
 *
 * Pour ajouter une personne : ajouter une entrée en haut du tableau.
 * - `poster` : visuel « Félicitations » (déposer le fichier dans src/assets/certifies/ et l'importer ici)
 * - `photo` : portrait carré facultatif ; sans photo, les initiales s'affichent
 * N'ajoutez que des personnes ayant donné leur accord.
 */
export type Certification = "PMP" | "CAPM" | "Prosci" | "PMI-ACP" | "PMI-PMOCP";

export interface CertifiedPerson {
  name: string;
  certification: Certification;
  year?: number;
  organization?: string;
  role?: string;
  photo?: string;
  /** Visuel de félicitations (format portrait 4:5) */
  poster?: string;
  linkedin?: string;
}

export const CERTIFIED: CertifiedPerson[] = [
  { name: "Amadou H. MAIGA", certification: "PMP", poster: amadouMaiga },
  { name: "Dr Amy NABILIOU", certification: "PMP", poster: amyNabiliou },
];
