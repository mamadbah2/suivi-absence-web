import { Routes } from '@angular/router';
import { AdminComponent } from './page/admin/admin.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { SecurityComponent } from './page/security/security.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"login",
    component: SecurityComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
