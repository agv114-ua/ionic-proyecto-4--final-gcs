import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

// Taller 4, p.8 del PDF:
// Al entrar en 'tabs' habilitamos el menú lateral (lo deshabilitábamos en login).
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {

  constructor(private menuCtrl: MenuController) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(true, 'principal');
  }
}
