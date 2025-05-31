import { Routes } from '@angular/router';
import { AdminComponent } from './page/admin/admin.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin'
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
