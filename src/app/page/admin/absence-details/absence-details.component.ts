import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AbsenceService } from '../../../shared/services/impl/absence.service';
import { AbsenceModels } from '../../../shared/models/absence.models';

@Component({
  selector: 'app-absence-details',
  templateUrl: './absence-details.component.html',
  styleUrl: './absence-details.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class AbsenceDetailsComponent implements OnInit {
  absence: AbsenceModels | null = null;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private absenceService: AbsenceService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadAbsenceDetails(id);
    } else {
      this.error = true;
      this.loading = false;
    }
  }

  loadAbsenceDetails(id: string) {
    this.absenceService.getAbsenceById(id).subscribe({
      next: (absence) => {
        this.absence = absence;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  validerJustification() {
    if (this.absence) {
      this.absenceService.validerJustification(this.absence.id).subscribe({
        next: () => {
          this.router.navigate(['/admin']);
        },
        error: () => {
          this.error = true;
        }
      });
    }
  }

  refuserAbsence() {
    if (this.absence) {
      this.absenceService.refuserAbsence(this.absence.id).subscribe({
        next: () => {
          this.router.navigate(['/admin']);
        },
        error: () => {
          this.error = true;
        }
      });
    }
  }

  retour() {
    this.router.navigate(['/admin']);
  }
}
