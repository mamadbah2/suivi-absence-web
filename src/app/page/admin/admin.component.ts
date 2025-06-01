import { Component } from '@angular/core';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { login, logout, isAuthenticated, currentUser } from '../../shared/store/auth.store';

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
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],  // Ajout de cette ligne
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterOutlet
  ]
})
export class AdminComponent {
  username = '';
  password = '';
  loginError = false;

  constructor(private router: Router) {}

  get isLoggedIn() {
    return isAuthenticated();
  }

  onLogin() {
    const success = login(this.username, this.password);
    this.loginError = !success;

    if (success) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  onLogout() {
    logout();
    this.router.navigate(['/admin']);
  }

  protected readonly currentUser = currentUser;
}
