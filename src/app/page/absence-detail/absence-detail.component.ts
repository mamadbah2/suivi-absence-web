import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AbsenceService } from '../../shared/services/impl/absence.service';
import { AbsenceModels } from '../../shared/models/absence.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-absence-detail',
  templateUrl: './absence-detail.component.html',
  styleUrls: ['./absence-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AbsenceDetailComponent implements OnInit {
  absence: AbsenceModels | null = null;
  loading = true;
  error: string | null = null;
  user_connect: any;
  notification: { type: 'success' | 'error', message: string } | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private absenceService: AbsenceService
  ) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.user_connect = JSON.parse(localStorage.getItem('USER_CONMECT') || 'null');

    if (id) {
      this.loadAbsence(id);
    } else {
      this.error = 'ID d\'absence non trouvé';
      this.loading = false;
    }
  }

  loadAbsence(id: string): void {
    this.loading = true;
    this.absenceService.getAbsences().subscribe({
      next: (response: any) => {
        const absences = response.content || [];
        this.absence = absences.find((a: AbsenceModels) => a.id === id) || null;
        
        // Assurer la compatibilité entre justificatifs et justificatifsUrls
        if (this.absence) {
          if (!this.absence.justificatifsUrls && this.absence.justificatifs) {
            this.absence.justificatifsUrls = this.absence.justificatifs;
          } else if (!this.absence.justificatifs && this.absence.justificatifsUrls) {
            this.absence.justificatifs = this.absence.justificatifsUrls;
          }
          
          // Log des URLs d'images récupérées
          console.log('==== URLS des images de justificatifs ====');
          if (this.absence.justificatifsUrls && this.absence.justificatifsUrls.length > 0) {
            console.log(`${this.absence.justificatifsUrls.length} image(s) trouvée(s) pour l'absence ID: ${this.absence.id}`);
            this.absence.justificatifsUrls.forEach((url, index) => {
              console.log(`Image ${index + 1}: ${url}`);
            });
          } else {
            console.log('Aucune image de justificatif disponible pour cette absence');
          }
          console.log('======================================');
        }
        
        this.loading = false;
        if (!this.absence) {
          this.error = 'Absence non trouvée';
        }
      },
      error: (error: any) => {
        this.error = 'Erreur lors du chargement de l\'absence';
        this.loading = false;
        console.error('Erreur:', error);
      }
    });
  }

  approveAbsence(): void {
    if (this.absence) {
      this.absenceService.validateJustification(this.absence).subscribe({
        next: () => {
        this.showNotification('success', `Justification validée pour ${this.absence?.nom} ${this.absence?.prenom}`);
        this.goBack();
        },
        error: (error: any) => {
          this.error = 'Erreur lors de la validation de l\'absence';
          console.error('Erreur:', error);
        }
      });
    }
  }
  showNotification(type: 'success' | 'error', message: string) {
    this.notification = { type, message };
    setTimeout(() => this.notification = null, 3000);
  }

  rejectAbsence(): void {
    if (this.absence) {
      this.absenceService.rejectJustification(this.absence).subscribe({
        next: () => {
        this.showNotification('success', `Justification refusée pour ${this.absence?.nom} ${this.absence?.prenom}`);
        this.goBack();
        },
        error: (error: any) => {
          this.error = 'Erreur lors du refus de la justification';
          console.error('Erreur:', error);
        }
      });
    }
  }

  downloadJustificatif(index: number = 0): void {
    if (this.absence?.justificatifsUrls && this.absence.justificatifsUrls.length > index) {
      window.open(this.absence.justificatifsUrls[index], '_blank');
    }
  }

  openImageInNewTab(index: number = 0): void {
    if (this.absence?.justificatifsUrls && this.absence.justificatifsUrls.length > index) {
      window.open(this.absence.justificatifsUrls[index], '_blank');
    }
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
  
  onLogout(): void {
    this.showNotification('success', 'Déconnexion en cours...');
    
    // Effacer les données de session
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('USER_CONMECT');
    
    // Rediriger vers la page de connexion
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }
}