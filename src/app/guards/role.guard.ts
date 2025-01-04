import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { catchError, map } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
  const roles = route.data['roles'] as string[];
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  return authService.getRole().pipe(
    map((userRole: string) => {
      if (roles.some((role) => userRole === role)) {
        return true;
      } else {
        router.navigate(['/']);
        alert('unauthorized access');
        return false;
      }
    })
  );
};
