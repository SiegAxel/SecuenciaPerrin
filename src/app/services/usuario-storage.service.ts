import { Injectable } from '@angular/core';

// IMPORTAR STORAGE //

import { Storage } from '@ionic/storage-angular';
import { promises } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class UsuarioStorageService {

  // VARIABLE AUXILIAR //

    usuarios: any[] = [];
  
  // CREAR VARIABLE DE STORAGE EN CONSTRUCTOR //
  constructor(private storage : Storage) { 
    storage.create();
  }

  // CRUD //
  
  /* 
     storage.create(): Crea o permite utilizar el storage.
     storage.get(KEY): Obtener la información del storage. (select...)
     storage.set(KEY, VALOR): Modificar o entregar valor al storage.
     storage.clear(): Limpia el storage.
     storage.keys(): Entrega el nombre de las llaves que tiene el storage.
     storage.lenght(): Entrega el tamaño del storage.
  */


  //Buscar: Que buscar y donde buscarlo.
 async buscar(rut: string, key: string): Promise<any>{
    this.usuarios = await this.storage.get(key) || [];
    return this.usuarios.find(usuario => usuario.rut == rut);
  }

  //Agregar: Que agregar y donde agregarlo.
  async agregar(usuario: any, key: string): Promise<boolean>{
    this.usuarios = await this.storage.get(key) || [];
    let usuarioEncontrado = await this.buscar(usuario.rut, key);

    if(usuarioEncontrado == undefined){
      this.usuarios.push(usuario);
      await this.storage.set(key, this.usuarios);
      return true;
    }
    return false;
  }

  //Modificar: 
  async modificar(usuario: any, key: string): Promise<boolean>{
    this.usuarios = await this.storage.get(key) || [];
    let index = this.usuarios.findIndex(usu => usu.rut == usuario.rut);
    
    if(index == -1){
      return false;
    }
    
    this.usuarios[index] = usuario;
    await this.storage.set(key, this.usuarios);
    return true;
  }
}
