import { Routes } from '@angular/router';
import {AdminComponent} from './page/admin/admin.component';
import {SecurityComponent} from './page/security/security.component';
import {PageNotFoundComponent} from './page/page-not-found/page-not-found.component';
import {JustificatifComponent} from './page/admin/justificatif/justificatif.component';

export const routes: Routes = [
  {
    path:"",
    component:AdminComponent,
    children:[{
      path:"justificatif",
      component:JustificatifComponent
    }]
  },
  {
    path:"login",
    component:SecurityComponent,
  },
  {
    path:"**",
    component:PageNotFoundComponent
  }
];
