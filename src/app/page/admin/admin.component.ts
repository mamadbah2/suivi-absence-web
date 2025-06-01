import { Component, OnInit } from '@angular/core';
import { AbsenceService } from '../../shared/services/impl/absence.service';
import { AbsenceModels } from '../../shared/models/absence.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../shared/models/user.model';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AdminComponent implements OnInit {
  absences: AbsenceModels[] = [];
  filteredAbsences: AbsenceModels[] = [];
  paginatedAbsences: AbsenceModels[] = [];
  classes: string[] = [];
  statuts: string[] = ['Présent', 'Absent', 'Justifié'];
  selectedClasse: string = '';
  selectedStatut: string = '';
  user_connect: any;
//pageable: {…}, totalPages: 1, totalElements: 5, last: true, first: true, size: 10, number: 0, sort: {…}, numberOfElements: 5, … }
  
// Pagination
  pageSize = 2;
  currentPage = 1;
  totalPages = 1;

  notification: { type: 'success' | 'error', message: string } | null = null;

  // Ajout pour menu filtres
  isFilterMenuOpen = false;

  // Ajout pour modale détail
  isDetailModalOpen = false;
  selectedAbsence: AbsenceModels | null = null;

  constructor(private absenceService: AbsenceService) { }

  ngOnInit() {
    this.load();
    this.user_connect = JSON.parse(localStorage.getItem('USER_CONMECT') || 'null');
    console.log('Utilisateur connecté:', this.user_connect);
  }

  load(page: number = 0, size: number = 10) {
    this.absenceService.getAbsences(page, size).subscribe(response => {
      console.log('Données reçues de getAbsences:', response);
      this.absences = response.content;
      this.classes = Array.from(new Set(this.absences.map(a => a.classe)));
      this.currentPage = response.number + 1; // Ajuste la page courante pour l'affichage
      this.totalPages = response.totalPages || 1; // Assure que totalPages est au moins 1
      this.applyFilters();
    });
  }



  applyFilters() {
    this.filteredAbsences = this.absences.filter(a =>
      (this.selectedClasse ? a.classe === this.selectedClasse : true) &&
      (this.selectedStatut ? a.status === this.selectedStatut : true)
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredAbsences.length / this.pageSize) || 1;
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedAbsences = this.filteredAbsences.slice(start, end);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  onClasseChange() {
    this.applyFilters();
  }

  onStatutChange() {
    this.applyFilters();
  }

  validerJustification(absence: AbsenceModels) {
    this.absenceService.validateJustification(absence).subscribe({
      next: () => {
        this.showNotification('success', `Justification validée pour ${absence.nom} ${absence.prenom}`);
        this.load(); // Recharge les absences après validation
      },
      error: () => {
        this.showNotification('error', `Erreur lors de la validation de la justification pour ${absence.nom} ${absence.prenom}`);
      }
    });
  }

  refuserAbsence(absence: AbsenceModels) {
    this.showNotification('error', `Absence refusée pour ${absence.nom} ${absence.prenom}`);
  }

  voirDetail(absence: AbsenceModels) {
    this.selectedAbsence = absence;
    this.isDetailModalOpen = true;
    this.closeFilterMenu(); // ferme le menu si ouvert
  }

  closeDetailModal() {
    this.isDetailModalOpen = false;
    this.selectedAbsence = null;
  }

  showNotification(type: 'success' | 'error', message: string) {
    this.notification = { type, message };
    setTimeout(() => this.notification = null, 3000);
  }

  // Gestion ouverture/fermeture menu filtres
  toggleFilterMenu() {
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
  }
  closeFilterMenu() {
    this.isFilterMenuOpen = false;
  }
}
