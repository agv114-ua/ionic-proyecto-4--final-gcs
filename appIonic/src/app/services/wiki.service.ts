import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Servicio WikiService (Taller 2, Parte 2, p.20-21 del PDF)
// Comando origen: ionic g service services/wiki
@Injectable({
  providedIn: 'root',
})
export class WikiService {

  // URL base de la API SWAPI (Star Wars API), p.18-19 y p.21 del PDF.
  // Es de acceso público, no requiere registro ni APIKEY.
  private readonly API_URL = 'https://swapi.tech/api/';

  // Inyección del HttpClient en el constructor (p.21 del PDF)
  constructor(private http: HttpClient) {}

  // Devuelve un Observable<any> con todos los artículos de una categoría (p.21 del PDF).
  // 'category' debe ser uno de los recursos de SWAPI: people, planets, species, starships, etc.
  public getAllArticles(category: string): Observable<any> {
    return this.http.get<any>(this.API_URL + category + '/');
  }

  // Devuelve un Observable<any> con el detalle de un artículo concreto.
  // (Taller 3, Parte 1, p.8 del PDF)
  // 'category' debe estar en minúsculas (people, planets, species, starships)
  // 'id' es el uid del item devuelto por la API.
  public getArticle(category: string, id: string): Observable<any> {
    return this.http.get<any>(this.API_URL + category + '/' + id);
  }
}
