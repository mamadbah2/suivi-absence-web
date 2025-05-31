import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { currentUser, logout } from '../../shared/store/auth.store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #8B4513 100%);
      padding: 2rem;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .dashboard-header {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .dashboard-header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 2rem;
      font-weight: 600;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .username {
      color: #D4AF37;
      font-weight: 500;
    }

    .logout-button {
      padding: 0.8rem 1.5rem;
      background: linear-gradient(45deg, #D4AF37, #FFD700);
      border: none;
      border-radius: 8px;
      color: #8B4513;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .logout-button:hover {
      background: linear-gradient(45deg, #FFD700, #FFA500);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(212, 175, 55, 0.4);
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .dashboard-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      padding: 2rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .dashboard-card h2 {
      color: #D4AF37;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1.5rem;
    }

    .stat-item {
      text-align: center;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      transition: transform 0.3s ease;
    }

    .stat-item:hover {
      transform: translateY(-5px);
    }

    .stat-value {
      display: block;
      font-size: 2rem;
      font-weight: bold;
      color: #D4AF37;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: #ffffff;
      font-size: 0.9rem;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .action-button {
      padding: 1rem;
      background: rgba(212, 175, 55, 0.1);
      border: 2px solid #D4AF37;
      border-radius: 10px;
      color: #D4AF37;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .action-button:hover {
      background: #D4AF37;
      color: #8B4513;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 1rem;
      }

      .dashboard-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }

      .stats-grid,
      .actions-grid {
        grid-template-columns: 1fr;
      }

      .dashboard-card {
        padding: 1.5rem;
      }
    }
  `],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <h1>Bienvenue sur le Tableau de Bord</h1>
        <div class="user-info">
          <span class="username">{{ currentUser()?.username }}</span>
          <button class="logout-button" (click)="onLogout()">
            <i class="fas fa-sign-out-alt"></i> Déconnexion
          </button>
        </div>
      </header>

      <div class="dashboard-grid">
        <section class="dashboard-card stats-card">
          <h2><i class="fas fa-chart-bar"></i> Statistiques</h2>
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-value">128</span>
              <span class="stat-label">Étudiants</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">95</span>
              <span class="stat-label">Présences aujourd'hui</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">6</span>
              <span class="stat-label">Cours prévus</span>
            </div>
          </div>
        </section>

        <section class="dashboard-card actions-card">
          <h2><i class="fas fa-cog"></i> Actions rapides</h2>
          <div class="actions-grid">
            <button class="action-button">
              <i class="fas fa-plus"></i>
              Ajouter un cours
            </button>
            <button class="action-button">
              <i class="fas fa-users"></i>
              Gérer les étudiants
            </button>
          </div>
        </section>
      </div>
    </div>
  `
})
export class DashboardComponent {
  protected readonly currentUser = currentUser;

  constructor(private router: Router) {}

  onLogout() {
    logout();
    this.router.navigate(['/admin']);
  }
}
