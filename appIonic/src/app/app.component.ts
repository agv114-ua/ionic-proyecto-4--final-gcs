import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

// Taller 4, p.5 del PDF: el AppComponent carga el menú desde un JSON al iniciarse.
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  readonly menuFile: string = './assets/data/menu.json';
  menuOptions: any[] = [];

  constructor(public toastController: ToastController) {}

  ngOnInit() {
    this.getMenu();
  }

  // Carga las opciones de menú desde assets/data/menu.json (p.5 del PDF)
  getMenu() {
    fetch(this.menuFile)
      .then((res) => res.json())
      .then((json) => {
        this.menuOptions = json;
        console.log(this.menuOptions);
      });
  }
}
