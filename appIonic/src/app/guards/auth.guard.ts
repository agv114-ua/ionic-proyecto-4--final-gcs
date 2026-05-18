import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Guard funcional (Angular 17 style) que protege las rutas /tabs.
// Espera a que el AuthService termine de leer Storage (auto-login) antes de decidir.
export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  await auth.whenReady();

  if (auth.isLoggedIn()) {
    return true;
  }

  router.navigateByUrl('/login');
  return false;
};
