import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

import { WikiService } from '../services/wiki.service';
import { StorageService } from '../services/storage.service';

import { People } from '../models/people';
import { Planet } from '../models/planet';
import { Species } from '../models/species';
import { Starship } from '../models/starship';

// Pagina Article (Taller 3, Parte 1, p.9-12 + Taller 4, p.12-16 del PDF)
// + Mejoras: ion-loading mientras se descarga el detalle y toast en caso de error.
@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

  public title: string = '';
  public id: string = '';
  public category: string = '';

  public people: People = new People();
  public planet: Planet = new Planet();
  public species: Species = new Species();
  public starship: Starship = new Starship();

  public isFavorite: boolean = false;
  private favorites: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private srv: WikiService,
    private storageSrv: StorageService,
    private toastController: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('cat') ?? '';
    this.id = this.route.snapshot.paramMap.get('id') ?? '';

    // Carga de favoritos (Taller 4, p.12 del PDF)
    this.storageSrv.get('favorites').then((data: any[]) => {
      this.favorites = data ?? [];
      const aux = this.favorites.find(
        (f) => f.id == this.id && f.category == this.category
      );
      if (aux != null) {
        this.isFavorite = true;
      }
    });

    // Loading + manejo de error en la llamada a SWAPI (mejora UX/robustez).
    const loading = await this.loadingCtrl.create({
      message: 'Loading article...',
      spinner: 'crescent',
    });
    await loading.present();

    this.srv.getArticle(this.category.toLowerCase(), this.id).subscribe({
      next: async (result: any) => {
        switch (this.category) {
          case 'People':
            this.people = result.result.properties;
            this.title = this.people.name;
            break;
          case 'Planets':
            this.planet = result.result.properties;
            this.title = this.planet.name;
            break;
          case 'Species':
            this.species = result.result.properties;
            this.title = this.species.name;
            break;
          case 'Starships':
            this.starship = result.result.properties;
            this.title = this.starship.name;
            break;
        }
        await loading.dismiss();
      },
      error: async () => {
        await loading.dismiss();
        this.title = 'Not found';
        await this.presentToast('Error fetching article from SWAPI.');
      },
    });
  }

  // Taller 4, p.14 del PDF
  toggleFavorite() {
    let theName: string = '';
    if (this.isFavorite == true) {
      this.isFavorite = false;
      const aux = this.favorites.findIndex(
        (f) => f.id == this.id && f.category == this.category
      );
      if (aux >= 0) {
        this.favorites.splice(aux, 1);
      }
      this.storageSrv.set('favorites', this.favorites);
      this.presentToast('Article removed from favorites successfully');
    } else {
      this.isFavorite = true;
      switch (this.category) {
        case 'People':   theName = this.people.name; break;
        case 'Planets':  theName = this.planet.name; break;
        case 'Species':  theName = this.species.name; break;
        case 'Starships':theName = this.starship.name; break;
      }
      this.favorites.push({
        category: this.category,
        id: this.id,
        name: theName,
      });
      this.storageSrv.set('favorites', this.favorites);
      this.presentToast('Article stored as favorite successfully');
    }
  }

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
    });
    await toast.present();
  }
}
