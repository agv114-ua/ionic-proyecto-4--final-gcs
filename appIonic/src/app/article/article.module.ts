import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { ArticlePageRoutingModule } from './article-routing.module';

import { ArticlePage } from './article.page';

// Taller 3, Parte 1, p.9 del PDF:
// La página 'article' usa el servicio WikiService (que requiere HttpClient).
// El servicio está marcado @Injectable({providedIn:'root'}) así que solo
// hace falta importar HttpClientModule a nivel de módulo.
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ArticlePageRoutingModule,
  ],
  declarations: [ArticlePage],
})
export class ArticlePageModule {}
