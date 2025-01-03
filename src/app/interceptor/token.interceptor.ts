import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (authService.getToken()) {
    const cloned = req.clone({
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${authService.getToken()}`
      ),
    });
    return next(cloned);
  }

  return next(req);
};
