import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-exit',
  templateUrl: './exit.page.html',
  styleUrls: ['./exit.page.scss'],
})
export class ExitPage implements OnInit {

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  // Botón YES: muestra un alert informando de la decisión
  // (desde web no se puede cerrar la app realmente)
  async exitApp() {
    const alert = await this.alertController.create({
      header: 'Closing App',
      message: 'The app would close now. (Not available in web mode.)',
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Botón NO: navega de vuelta a la página wiki
  navigateToWiki() {
    this.router.navigateByUrl('/tabs/wiki');
  }
}
