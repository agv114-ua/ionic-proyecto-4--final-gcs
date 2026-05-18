import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

// Pagina Favorites (Taller 4, p.17-18 del PDF)
// + Mejoras: swipe-to-delete (ion-item-sliding), pull-to-refresh y toast informativo.
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  public favorites: any[] = [];

  constructor(
    private storageSrv: StorageService,
    private toastCtrl: ToastController
  ) {}

  ionViewWillEnter() {
    this.loadFavorites();
  }

  ngOnInit() {
    this.loadFavorites();
  }

  private async loadFavorites() {
    const data = await this.storageSrv.get('favorites');
    this.favorites = data ?? [];
  }

  generateURL(cat: string, id: string): string {
    return '/tabs/wiki/article/' + cat + '/' + id;
  }

  // Pull-to-refresh: recarga la lista del Storage.
  async handleRefresh(event: any) {
    await this.loadFavorites();
    event?.target?.complete();
  }

  // Swipe-to-delete: elimina un favorito por indice y persiste el cambio.
  async removeFavorite(index: number) {
    if (index < 0 || index >= this.favorites.length) return;
    const removed = this.favorites[index];
    this.favorites.splice(index, 1);
    await this.storageSrv.set('favorites', this.favorites);
    const toast = await this.toastCtrl.create({
      message: removed.name + ' removed from favorites',
      duration: 1800,
    });
    await toast.present();
  }
}
