import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Category } from '../models/category';
import { WikiService } from '../services/wiki.service';

// Componente CategoryComponent (Taller 2, Parte 1, p.10-13 del PDF)
// + Mejora: ion-loading mientras se consulta SWAPI y toast si la API falla.
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  @Input() theCategory: Category = new Category();
  @Input() selected: boolean = false;
  @Output() clicked = new EventEmitter<string>();

  // Articulos recuperados (Taller 2, Parte 2, p.23 del PDF) + filtro de busqueda.
  articles: any[] = [];
  filteredArticles: any[] = [];
  searchTerm: string = '';

  constructor(
    private wikiSrv: WikiService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  click() {
    this.clicked.emit(this.theCategory.name);
    this.getArticles(this.theCategory.name.toLowerCase());
  }

  async getArticles(category: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading ' + category + '...',
      spinner: 'crescent',
    });
    await loading.present();

    this.wikiSrv.getAllArticles(category).subscribe({
      next: async (result: any) => {
        this.articles = result.results ?? [];
        this.applyFilter();
        await loading.dismiss();
      },
      error: async () => {
        await loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Error fetching data from SWAPI. Check your connection.',
          duration: 2500,
          color: 'danger',
        });
        await toast.present();
      },
    });
  }

  // Buscador: filtra la lista de articulos por nombre (mejora UX).
  onSearch(event: any) {
    this.searchTerm = event?.target?.value ?? '';
    this.applyFilter();
  }

  private applyFilter() {
    const q = this.searchTerm.trim().toLowerCase();
    this.filteredArticles = q
      ? this.articles.filter((a) => (a.name ?? '').toLowerCase().includes(q))
      : this.articles;
  }

  generateURL(cat: string, id: string): string {
    return '/tabs/wiki/article/' + cat + '/' + id;
  }
}
