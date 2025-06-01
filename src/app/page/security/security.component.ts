import { Component } from '@angular/core';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { login, logout, isAuthenticated, currentUser } from '../../shared/store/auth.store';


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
export class SecurityComponent {
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
      this.router.navigate(['/admin']);
    }
  }

  onLogout() {
    logout();
    this.router.navigate(['/login']);
  }

  protected readonly currentUser = currentUser;
}
