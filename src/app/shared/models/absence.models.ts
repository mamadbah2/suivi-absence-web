export interface AbsenceModels {
  id:string;
  nom:string;
  prenom:string;
  matricule:string;
  classe:string;
  module:string;
  date:Date;
  heure:string;
  status:string;
  justification:string;
  justificatifs?: string[]; // Pour la rétrocompatibilité
  justificatifsUrls: string[]; // Correspond au format de l'API
}
