import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

// Página Favorites (Taller 4, p.17-18 del PDF)
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  // Array de favoritos recuperados del LocalStorage (p.17 del PDF)
  public favorites: any[] = [];

  constructor(private storageSrv: StorageService) {}

  // Cargamos los favoritos cada vez que se entra a la pestaña, no solo en ngOnInit,
  // para que la lista quede sincronizada cuando se vuelve desde 'article'.
  ionViewWillEnter() {
    this.loadFavorites();
  }

  ngOnInit() {
    this.loadFavorites();
  }

  private loadFavorites() {
    this.storageSrv.get('favorites').then((data: any[]) => {
      this.favorites = data ?? [];
    });
  }

  // Genera el enlace al detalle del artículo (p.17 del PDF):
  //   /tabs/wiki/article/<categoria>/<id>
  generateURL(cat: string, id: string): string {
    return '/tabs/wiki/article/' + cat + '/' + id;
  }
}
