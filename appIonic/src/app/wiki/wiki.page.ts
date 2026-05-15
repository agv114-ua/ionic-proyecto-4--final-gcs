import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.page.html',
  styleUrls: ['./wiki.page.scss'],
})
export class WikiPage implements OnInit {

  // Array de categorías definido según el taller (taller 1, paso 5)
  readonly categories: string[] = ['People', 'Planets', 'Species', 'Starships'];

  constructor(private toastController: ToastController) {}

  async ngOnInit() {
    // Tarea extra: toast de bienvenida al cargar la App
    await this.presentWelcomeToast();
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
