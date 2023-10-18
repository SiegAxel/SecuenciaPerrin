import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ClaseStorageService {

  clases: any[] = [];



  constructor(private storage: Storage) { 
    storage.create();
  }

  //Buscar:
  async buscarClase(id: string, key: string): Promise<any>{
    this.clases = await this.storage.get(key) || [];
    return this.clases.find(clase => clase.id == id);
  }

   //Agregar: 
   async agregar(clase: any, key: string): Promise<boolean>{
    try {
      this.clases = await this.storage.get(key) || [];
      let claseEncontrada = await this.buscarClase(clase.id, key);
      if (claseEncontrada === undefined) {
        this.clases.push(clase);
        await this.storage.set(key, this.clases);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error en agregar:', error);
      return false;
    }
   }

    //Listar:
    async listar(key: string): Promise<any[]>{
      this.clases = await this.storage.get(key) || [];
      return this.clases;
     }

}
