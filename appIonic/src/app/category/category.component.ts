import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../models/category';
import { WikiService } from '../services/wiki.service';

// Componente CategoryComponent (Taller 2, Parte 1, p.10-13 del PDF)
// Comando origen: ionic g component Category
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  // Propiedad de entrada con la categoría a mostrar (p.10 y p.13 del PDF)
  @Input() theCategory: Category = new Category();

  // Propiedad de entrada para saber si la categoría está seleccionada (p.13 del PDF)
  @Input() selected: boolean = false;

  // Evento de salida para notificar al padre 'wiki' el click sobre el botón (p.13 del PDF)
  @Output() clicked = new EventEmitter<string>();

  // Array para almacenar los artículos recuperados por el servicio (Parte 2, p.23 del PDF)
  articles: any[] = [];

  // Inyección del servicio WikiService en el constructor (Parte 2, p.23 del PDF)
  constructor(private wikiSrv: WikiService) {}

  ngOnInit() {}

  // Manejador del click sobre el botón 'ojo' (p.13 + p.23 del PDF):
  // 1) emite el evento clicked al componente padre con el nombre de la categoría
  // 2) recupera los artículos de la API a través del servicio
  click() {
    this.clicked.emit(this.theCategory.name);
    console.log('clicked on ' + this.theCategory.name);

    // SWAPI requiere los recursos en minúscula: /people/, /planets/, etc.
    // El PDF p.23 escribe: this.getArticles(this.theCategory.name);
    // pero theCategory.name viene capitalizado ('People') y devuelve 404.
    // Aplicamos .toLowerCase() para que coincida con los endpoints reales.
    this.getArticles(this.theCategory.name.toLowerCase());
  }

  // Suscripción al Observable devuelto por getAllArticles del servicio (p.23 del PDF)
  getArticles(category: string) {
    this.wikiSrv.getAllArticles(category).subscribe(
      (result: any) => {
        this.articles = result.results;
      }
    );
  }
}
