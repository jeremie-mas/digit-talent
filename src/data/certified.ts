/**
 * Professionnels certifiés après une formation DIGIT & TALENT (page /certifies).
 *
 * Pour ajouter une personne : ajouter une entrée au tableau. La photo est facultative
 * (déposer le fichier dans src/assets/certifies/ et l'importer ici) ; sans photo,
 * les initiales s'affichent. N'ajoutez que des personnes ayant donné leur accord.
 *
 * Exemple :
 *   { name: "Prénom Nom", certification: "PMP", year: 2026, organization: "Entreprise", linkedin: "https://…" },
 */
export type Certification = "PMP" | "CAPM" | "Prosci" | "PMI-ACP" | "PMI-PMOCP";

export interface CertifiedPerson {
  name: string;
  certification: Certification;
  year?: number;
  organization?: string;
  role?: string;
  photo?: string;
  linkedin?: string;
}

export const CERTIFIED: CertifiedPerson[] = [];
