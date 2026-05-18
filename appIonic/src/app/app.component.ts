import { Component, OnInit } from '@angular/core';
import { ToastController, MenuController } from '@ionic/angular';
import { AuthService } from './services/auth.service';

// Taller 4, p.5 del PDF: el AppComponent carga el menu desde un JSON al iniciarse.
// Mejora: anadimos opcion 'Logout' que limpia la sesion del Storage.
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  readonly menuFile: string = './assets/data/menu.json';
  menuOptions: any[] = [];

  constructor(
    public toastController: ToastController,
    private menuCtrl: MenuController,
    private authSrv: AuthService
  ) {}

  ngOnInit() {
    this.getMenu();
  }

  getMenu() {
    fetch(this.menuFile)
      .then((res) => res.json())
      .then((json) => {
        this.menuOptions = json;
      });
  }

  // Cierra el menu y limpia la sesion (vuelve a /login).
  async logout() {
    await this.menuCtrl.close('principal');
    await this.authSrv.logout();
  }
}
