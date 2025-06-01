import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { isAuthenticated } from '../store/auth.store';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return router.createUrlTree(['/admin']);
  }
};
