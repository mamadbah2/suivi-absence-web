import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'suivi-absence-web';
  isLoginPage = false;
  notification: { type: 'success' | 'error', message: string } | null = null;

  constructor(private router: Router) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((event: any) => {
      this.isLoginPage = event.urlAfterRedirects === '/login';
    });
  }

  logout() {
    this.showNotification('success', 'Déconnexion réussie.');
    setTimeout(() => this.router.navigate(['/login']), 1000);
  }

  goToDashboard() {
    this.showNotification('success', 'Tableau de bord (simulation)');
  }

  goToAbsences() {
    this.showNotification('success', 'Absences (simulation)');
  }

  goToUsers() {
    this.showNotification('success', 'Utilisateurs (simulation)');
  }

  showNotification(type: 'success' | 'error', message: string) {
    this.notification = { type, message };
    setTimeout(() => this.notification = null, 2500);
  }
}
