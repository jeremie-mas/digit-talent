import { imagery } from "@/assets/imagery";

/**
 * Photos des cohortes formées, affichées en carrousel sur la page Formations.
 *
 * Pour ajouter une cohorte : déposer la photo dans src/assets/cohortes/,
 * l'importer ici, puis ajouter une entrée au tableau (la plus récente en premier).
 *
 * ⚠️ Les entrées ci-dessous utilisent des photos d'illustration provisoires :
 * à remplacer par les vraies photos de vos cohortes avant la mise en ligne.
 */
export interface Cohort {
  image: string;
  /** Intitulé de la formation, ex. « Certification PMP® » */
  title: string;
  /** Période ou date de la session, ex. « Mars 2026 » */
  period?: string;
  /** Lieu ou format, ex. « Lomé · Présentiel » */
  place?: string;
}

export const COHORTS: Cohort[] = [
  { image: imagery.leaderPitch, title: "Certification PMP®", place: "Lomé" },
  { image: imagery.coworkersAi, title: "Certification CAPM®", place: "Lomé" },
  { image: imagery.teamLaughing, title: "Conduite du changement : Prosci®", place: "Lomé" },
  { image: imagery.management, title: "Transformation digitale & IA", place: "Lomé · En ligne" },
];
