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
  async buscarClase(id: string, key: string): Promise<any> {
    this.clases = await this.storage.get(key) || [];
    return this.clases.find(clase => clase.id == id);
  }

  async buscarNombres(nom: string, key: string): Promise<boolean> {
    this.clases = await this.storage.get(key) || [];
    var resp: boolean = this.clases.find(usuario => usuario.nombre == nom);

    if (resp) {
      return true;
    }
    return false;

  }

  //Actualizar:

  async actualizarClase(clase: any, key: string): Promise<boolean> {
    try {
      this.clases = await this.storage.get(key) || [];
      const index = this.clases.findIndex((c) => c.id === clase.id);
      if (index !== -1) {
        this.clases[index] = clase;
        await this.storage.set(key, this.clases);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error en actualizarClase:', error);
      return false;
    }
  }


  //Agregar: 
  async agregar(clase: any, key: string): Promise<boolean> {
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
  async listar(key: string): Promise<any[]> {
    this.clases = await this.storage.get(key) || [];
    return this.clases;
  }


  //Eliminar:
  async eliminar(id: string, key: string): Promise<boolean> {
    var resp: boolean = false;
    this.clases = await this.storage.get(key) || [];
    this.clases.forEach((clase, index) => {
      if (clase.id == id) {
        this.clases.splice(index, 1);
        resp = true;
      }
    });
    await this.storage.set(key, this.clases);
    return resp;
  }

}
