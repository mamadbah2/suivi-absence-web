import { Component, OnInit } from '@angular/core';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { login, logout, isAuthenticated, currentUser, checkSession } from '../../shared/store/auth.store';


@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrl: './security.component.css',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterOutlet
  ]
})
export class SecurityComponent implements OnInit {
  username = '';
  password = '';
  loginError = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Vérifier si une session est déjà active
    checkSession();
    if (this.isLoggedIn) {
      // Si l'utilisateur est déjà connecté, le rediriger vers la page admin
      this.router.navigate(['/admin']);
    }
  }

  get isLoggedIn() {
    return isAuthenticated();
  }

  async onLogin() {
    const success = await login(this.username, this.password);
    this.loginError = !success;

    if (success) {
      this.router.navigate(['/admin']);
    }
  }

  onLogout() {
    logout();
    this.router.navigate(['/login']);
  }

  protected readonly currentUser = currentUser;
}
