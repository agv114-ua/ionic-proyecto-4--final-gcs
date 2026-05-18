import { Injectable } from '@angular/core';
import { User } from '../models/user';

// Servicio UserService (Taller 3, Parte 2, p.16 del PDF)
// Comando origen: ionic g service services/user
@Injectable({
  providedIn: 'root',
})
export class UserService {

  // Ruta al mockup de usuarios (p.15 del PDF)
  readonly usersMockup: string = './assets/data/users.json';

  users: User[] = [];

  constructor() {
    // Cargamos los usuarios en el constructor del servicio (p.16 del PDF)
    fetch(this.usersMockup)
      .then((res) => res.json())
      .then((json) => {
        this.users = json;
      });
  }

  // Busca el usuario por email + password.
  // Devuelve el User si lo encuentra, o null si las credenciales no coinciden.
  public login(email: string, password: string): User | null {
    let aux: User | null = null;
    for (const u of this.users) {
      if (u.email == email && u.password == password) {
        aux = u;
        break;
      }
    }
    return aux;
  }
}
