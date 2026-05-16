import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { WikiPageRoutingModule } from './wiki-routing.module';
import { WikiPage } from './wiki.page';

// Imports del Taller 2:
// - CategoryComponent: registrado en declarations (Parte 1, p.11 del PDF)
// - WikiService + HttpClientModule: providers e imports (Parte 2, p.22 del PDF)
import { CategoryComponent } from '../category/category.component';
import { WikiService } from '../services/wiki.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WikiPageRoutingModule,
    HttpClientModule, // p.22 del PDF
  ],
  providers: [
    WikiService, // p.22 del PDF
  ],
  declarations: [
    WikiPage,
    CategoryComponent, // p.11 del PDF
  ],
})
export class WikiPageModule {}
