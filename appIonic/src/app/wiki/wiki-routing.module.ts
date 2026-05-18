import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WikiPage } from './wiki.page';

// Taller 3, Parte 1, p.4 del PDF:
// La página 'article' se carga como ruta hija de 'wiki' con dos parámetros:
//   article/:cat/:id
// La ruta completa resultante es: /tabs/wiki/article/:cat/:id (p.5)
const routes: Routes = [
  {
    path: '',
    component: WikiPage,
  },
  {
    path: 'article/:cat/:id',
    loadChildren: () =>
      import('../article/article.module').then((m) => m.ArticlePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WikiPageRoutingModule {}
