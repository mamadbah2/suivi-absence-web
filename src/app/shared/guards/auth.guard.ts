import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { isAuthenticated, checkSession } from '../store/auth.store';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Vérifier la session avant de prendre une décision
  checkSession();
  
  if (isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
