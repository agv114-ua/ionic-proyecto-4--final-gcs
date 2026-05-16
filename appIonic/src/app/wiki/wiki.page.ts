import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Category } from '../models/category';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.page.html',
  styleUrls: ['./wiki.page.scss'],
})
export class WikiPage implements OnInit {

  // Ruta al mockup JSON (Taller 2, Parte 1, p.8 del PDF)
  readonly categoriesMockup: string = './assets/data/categories.json';

  // Vector de categorías tipado como Category[] (p.8 del PDF)
  categories: Category[] = [];

  // Categoría seleccionada en la lista (Taller 2, Parte 1, p.15 del PDF)
  selectedCategory: string = '';

  constructor(private toastController: ToastController) {}

  async ngOnInit() {
    // Carga del mockup JSON al iniciar la página (p.8 del PDF)
    this.getData();
    // Tarea extra del Taller 1: toast de bienvenida
    await this.presentWelcomeToast();
  }

  // Cargamos los datos del fichero JSON usando fetch (p.8 del PDF)
  getData() {
    fetch(this.categoriesMockup)
      .then((res) => res.json())
      .then((json) => {
        this.categories = json;
      });
  }

  // Manejador del evento (clicked) emitido por <app-category> (p.15 del PDF)
  selectCategory(name: string) {
    this.selectedCategory = name;
  }

  async presentWelcomeToast() {
    const toast = await this.toastController.create({
      message: 'Welcome to the Star Wars Wiki App!',
      duration: 2500,
      position: 'bottom',
      color: 'primary',
    });
    await toast.present();
  }
}
