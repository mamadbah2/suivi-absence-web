import {Observable} from 'rxjs';
import {AbsenceModels} from '../models/absence.models';

export interface IAbsenceService {
  getAbsences():Observable<AbsenceModels[]>
  getAbsencesFilteredByClasse(classe: string):Observable<AbsenceModels[]>
  getAbsencesFilteredByStatut(statut: string):Observable<AbsenceModels[]>
  envoyerJustification(formData: FormData): Observable<any>
}
