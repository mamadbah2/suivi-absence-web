import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AbsenceModels } from '../../models/absence.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  private apiUrl = 'http://localhost:8081/app/absences/list'; // Replace with your actual API URL
  private updateUrl = 'http://localhost:8081/app/absences/update/justification'; // Endpoint pour mise à jour des justifications

  constructor(private http: HttpClient) { }

  getAbsences(page: number = 0, size: number = 10): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const params = { page: page.toString(), size: size.toString() };

    return this.http.get<any>(this.apiUrl, { headers, params });
  }

  getAbsencesFilteredByClasse(classe: string): Observable<AbsenceModels[]> {
    // Non utilisé en mock, filtrage côté composant
    return this.getAbsences();
  }

  getAbsencesFilteredByStatut(statut: string): Observable<AbsenceModels[]> {
    // Non utilisé en mock, filtrage côté composant
    return this.getAbsences();
  }

  validateJustification(absence: AbsenceModels): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // Préparation du corps de la requête pour l'acceptation
    const requestBody = {
      id: absence.id,
      status: 'JUSTIFIE', // Statut pour absence justifiée et acceptée
      justification: absence.justification // Conserver la justification existante
    };

    return this.http.put<any>(this.updateUrl, requestBody, { headers });
  }

  rejectJustification(absence: AbsenceModels): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // Préparation du corps de la requête pour le rejet
    const requestBody = {
      id: absence.id,
      status: 'JUSTIFIE_REFUSEE', // Statut pour justification refusée
      justification: absence.justification // On peut ajouter un commentaire de refus ici si nécessaire
    };

    return this.http.put<any>(this.updateUrl, requestBody, { headers });
  }
  
  envoyerJustification(formData: FormData): Observable<any> {
    // Simule un succès immédiat
    return of({ success: true });
  }
}
