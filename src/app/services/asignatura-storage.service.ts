import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaStorageService {

  asignaturas: any[] = [];

  constructor() { }
}
