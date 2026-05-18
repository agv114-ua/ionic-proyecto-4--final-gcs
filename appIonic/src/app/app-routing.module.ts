import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';

// Taller 3, Parte 2, p.16 del PDF + mejora de calidad:
// - La App arranca en una ruta intermedia que el AuthGuard usa para decidir
//   si redirige a /tabs (auto-login) o a /login.
// - Si entras directamente a /tabs sin estar logueado, el guard te manda a /login.
const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
