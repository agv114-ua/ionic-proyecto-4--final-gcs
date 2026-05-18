import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

// Servicio Storage (Taller 4, p.10-11 del PDF)
// Comando origen: ionic g service services/storage
// Funciones expuestas:
//   - init: inicializa el almacenamiento (await this.storage.create())
//   - set:  guarda un valor por clave
//   - get:  recupera un valor por clave
@Injectable({
  providedIn: 'root',
})
export class StorageService {

  // Indica si el storage está inicializado. Las llamadas a get/set esperarán
  // a la creación antes de operar (útil porque ngOnInit puede ejecutarse antes
  // de que termine el await this.storage.create()).
  private _readyPromise: Promise<Storage>;

  constructor(private storage: Storage) {
    this._readyPromise = this.init();
  }

  // Inicializa el almacenamiento. p.11 del PDF.
  async init(): Promise<Storage> {
    return await this.storage.create();
  }

  // Guarda un valor por clave. p.11 del PDF.
  public async set(key: string, value: any) {
    await this._readyPromise;
    return this.storage.set(key, value);
  }

  // Recupera un valor por clave. p.11 del PDF.
  public async get(key: string) {
    await this._readyPromise;
    return this.storage.get(key);
  }
}
