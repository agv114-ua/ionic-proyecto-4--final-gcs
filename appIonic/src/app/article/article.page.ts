import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { WikiService } from '../services/wiki.service';
import { StorageService } from '../services/storage.service';

import { People } from '../models/people';
import { Planet } from '../models/planet';
import { Species } from '../models/species';
import { Starship } from '../models/starship';

// Página Article (Taller 3, Parte 1, p.9-12 + Taller 4, p.12-16 del PDF)
@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

  // Propiedades obtenidas de la URL (p.9 del PDF, Taller 3)
  public title: string = '';
  public id: string = '';
  public category: string = '';

  // Una instancia de cada modelo. Sólo se rellenará la correspondiente a la categoría
  // del artículo (p.9 del PDF, Taller 3)
  public people: People = new People();
  public planet: Planet = new Planet();
  public species: Species = new Species();
  public starship: Starship = new Starship();

  // Taller 4, p.12 del PDF:
  // 'isFavorite' indica si el artículo actual está marcado como favorito.
  // 'favorites' contiene el array de favoritos recuperado del LocalStorage.
  public isFavorite: boolean = false;
  private favorites: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private srv: WikiService,
    private storageSrv: StorageService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // Recuperamos los parámetros 'cat' e 'id' de la URL (p.9 del PDF, Taller 3)
    this.category = this.route.snapshot.paramMap.get('cat') ?? '';
    this.id = this.route.snapshot.paramMap.get('id') ?? '';

    // Taller 4, p.12 del PDF: cargar la lista de favoritos y comprobar si este
    // artículo ya estaba marcado.
    this.storageSrv.get('favorites').then((data: any[]) => {
      this.favorites = data ?? [];
      const aux = this.favorites.find(
        (f) => f.id == this.id && f.category == this.category
      );
      if (aux != null) {
        this.isFavorite = true;
      }
    });

    // Pedimos el detalle al servicio. La categoría debe ir en minúsculas porque
    // SWAPI expone los endpoints en lowercase (people, planets, species, starships).
    // Para el switch comparamos contra la variante capitalizada que viene en la ruta.
    this.srv.getArticle(this.category.toLowerCase(), this.id).subscribe(
      (result: any) => {
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
      }
    );
  }

  // Taller 4, p.14 del PDF: alterna el estado de favorito.
  // - Si ya era favorito: lo elimina del array y persiste.
  // - Si no lo era: añade un objeto {category, id, name} y persiste.
  // Al final muestra un toast con el resultado.
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
        case 'People':
          theName = this.people.name;
          break;
        case 'Planets':
          theName = this.planet.name;
          break;
        case 'Species':
          theName = this.species.name;
          break;
        case 'Starships':
          theName = this.starship.name;
          break;
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

  // Toast genérico (Taller 4, p.15 del PDF)
  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
    });
    await toast.present();
  }
}
