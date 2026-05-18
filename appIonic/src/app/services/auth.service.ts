import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { User } from '../models/user';

// Servicio de autenticacion (mejora de calidad GCS).
// - Persistencia: guarda el usuario logueado en Storage bajo la clave 'currentUser'.
// - isLoggedIn(): consulta sincrona apoyada en una bandera y la promesa de carga inicial.
// - logout(): borra el usuario y redirige a /login.
@Injectable({ providedIn: 'root' })
export class AuthService {

  private static readonly STORAGE_KEY = 'currentUser';

  private _currentUser: User | null = null;
  private _ready: Promise<void>;

  constructor(
    private storageSrv: StorageService,
    private router: Router
  ) {
    // Al arrancar la app cargamos el usuario persistido para soportar auto-login.
    this._ready = this.storageSrv.get(AuthService.STORAGE_KEY).then((data: User) => {
      if (data) {
        this._currentUser = data;
      }
    });
  }

  // Espera a que la carga inicial del Storage termine (la usa el AuthGuard).
  public async whenReady(): Promise<void> {
    return this._ready;
  }

  public isLoggedIn(): boolean {
    return this._currentUser != null;
  }

  public getCurrentUser(): User | null {
    return this._currentUser;
  }

  public async setSession(user: User): Promise<void> {
    this._currentUser = user;
    await this.storageSrv.set(AuthService.STORAGE_KEY, user);
  }

  public async logout(): Promise<void> {
    this._currentUser = null;
    await this.storageSrv.set(AuthService.STORAGE_KEY, null);
    this.router.navigateByUrl('/login');
  }
}
