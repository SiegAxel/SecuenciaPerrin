import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaStorageService {

  asignaturas: any[] = [];

  constructor(private storage: Storage) {
    storage.create();
  }

  async asignaturasDocente(rut: string, key: string){
    this.asignaturas = await this.storage.get(key) || [];
    this.asignaturas = this.asignaturas.filter(asig => asig.rut == rut)
    return this.asignaturas;
  }

  //Buscar:
  async buscarAsig(codigo: string, key: string): Promise<any>{
    this.asignaturas = await this.storage.get(key) || [];
    return this.asignaturas.find(asig => asig.codigo == codigo);
  }

   //Agregar: 
   async agregar(asignatura: any, key: string): Promise<boolean>{
    try {
      this.asignaturas = await this.storage.get(key) || [];
      let asignaturaEncontrada = await this.buscarAsig(asignatura.codigo, key);
      if (asignaturaEncontrada === undefined) {
        this.asignaturas.push(asignatura);
        await this.storage.set(key, this.asignaturas);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error en agregar:', error);
      return false;
    }
   }

    //Modificar: 
    async modificar(asignatura: any, key: string): Promise<boolean>{
      this.asignaturas = await this.storage.get(key) || [];
      let index = this.asignaturas.findIndex(asig => asig.codigo == asignatura.codigo);
  
      console.log('Índice de asignatura en modificar:', index);
  
      if(index == -1){
          return false;
      }
  
      this.asignaturas[index] = asignatura;
      await this.storage.set(key, this.asignaturas);
  
      console.log('Asignatura modificada:', asignatura);
  
      return true;
  }
  
    

    //Eliminar:
   async eliminar(codigo: string, key: string): Promise<boolean>{
    var resp: boolean = false;
    this.asignaturas = await this.storage.get(key) || [];
    this.asignaturas.forEach((asignatura, index) => {
      if(asignatura.codigo == codigo){
        this.asignaturas.splice(index, 1);
        resp = true;
      }
    });
    await this.storage.set(key, this.asignaturas);
    return resp;
   }

   //Listar:
   async listar(key: string): Promise<any[]>{
    this.asignaturas = await this.storage.get(key) || [];
    return this.asignaturas;
   }
}
