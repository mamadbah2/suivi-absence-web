import { Component, OnInit } from '@angular/core';

interface Absence {
  matricule: string;
  nom: string;
  prenom: string;
  classe: string;
  module: string;
  date: string;
  heure: string;
  status: 'Absent(e)' | 'Retard' | 'Présent(e)';
  action: string;
}
@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
   absences = [
    {
      matricule: 'DK-30254',
      nom: 'Keita',
      prenom: 'Fatima',
      classe: 'CLRS3',
      module: 'Flutter',
      date: '23/04/2025',
      heure: '8h-12h',
      status: 'Absent(e)',
      action: 'Valider Just.'
    },
    {
      matricule: 'DK-31454',
      nom: 'Niang',
      prenom: 'Fabie',
      classe: 'IACE3',
      module: 'Gestion',
      date: '12/01/2025',
      heure: '8h-10h',
      status: 'Retard',
      action: 'Valider Just.'
    },
    {
      matricule: 'DK-59254',
      nom: 'Bah',
      prenom: 'Bobo',
      classe: 'CPD2',
      module: 'CMS',
      date: '27/05/2025',
      heure: '10h-13h',
      status: 'Absent(e)',
      action: 'Valider Just.'
    },
    ];
   
   filteredAbsences: Absence[] = [];
  filters = {
    classe: '',
    status: '',
    date: ''
  };

  ngOnInit() {
    this.filteredAbsences = [...this.absences];
  }

  applyFilters() {
    this.filteredAbsences = this.absences.filter(absence => {
      return (
        (!this.filters.classe || absence.classe.includes(this.filters.classe)) &&
        (!this.filters.status || absence.status === this.filters.status) &&
        (!this.filters.date || absence.date === this.filters.date)
      );
    });
  }

  resetFilters() {
    this.filters = {
      classe: '',
      status: '',
      date: ''
    };
    this.filteredAbsences = [...this.absences];
  }

  validateJustification(matricule: string) {
    // Logique pour valider la justification
    console.log(Justification validée pour ${matricule});
  }
}

