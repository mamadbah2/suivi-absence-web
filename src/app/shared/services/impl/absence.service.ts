import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AbsenceModels } from '../../models/absence.models';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  // private apiUrl = 'https://api.example.com/absences'; // Pour usage réel

  constructor() { }

  getAbsences(): Observable<AbsenceModels[]> {
    // MOCK : données fictives pour test UI
    return of([
      {
        id: '1', nom: 'Diop', prenom: 'Awa', classe: 'L2GLRS', module: 'Angular', date: new Date('2024-05-01'), heure: '08:00', status: 'Absent', justification: '', justificatif: ''
      },
      {
        id: '2', nom: 'Sow', prenom: 'Moussa', classe: 'L2GLRS', module: 'Angular', date: new Date('2024-05-01'), heure: '08:00', status: 'Justifié', justification: 'Maladie', justificatif: 'https://www.service-public.fr/files/vosdroits/F2350/justificatif-arret-maladie.pdf'
      },
      {
        id: '3', nom: 'Ba', prenom: 'Fatou', classe: 'L2CD', module: 'Java', date: new Date('2024-05-02'), heure: '10:00', status: 'Présent', justification: '', justificatif: ''
      },
      {
        id: '4', nom: 'Ndiaye', prenom: 'Alioune', classe: 'L2CD', module: 'Java', date: new Date('2024-05-02'), heure: '10:00', status: 'Absent', justification: '', justificatif: ''
      }
    ]);
  }

  getAbsencesFilteredByClasse(classe: string): Observable<AbsenceModels[]> {
    // Non utilisé en mock, filtrage côté composant
    return this.getAbsences();
  }

  getAbsencesFilteredByStatut(statut: string): Observable<AbsenceModels[]> {
    // Non utilisé en mock, filtrage côté composant
    return this.getAbsences();
  }

  envoyerJustification(formData: FormData): Observable<any> {
    // Simule un succès immédiat
    return of({ success: true });
  }

  getAbsenceById(id: string): Observable<AbsenceModels | null> {
    return new Observable(observer => {
      this.getAbsences().subscribe(absences => {
        const found = absences.find(a => a.id === id) || null;
        observer.next(found);
        observer.complete();
      });
    });
  }

  validerJustification(id: string): Observable<any> {
    // Simule un succès immédiat
    return of({ success: true });
  }

  refuserAbsence(id: string): Observable<any> {
    // Simule un succès immédiat
    return of({ success: true });
  }
}
