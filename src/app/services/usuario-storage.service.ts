import { Injectable, booleanAttribute } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

// IMPORTAR STORAGE //

import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class UsuarioStorageService {

  // VARIABLES AUXILIARES //

    usuarios: any[] = [];
    estado_login: boolean = false;
    rut: string = '';
  
  // CREAR VARIABLE DE STORAGE EN CONSTRUCTOR //
  constructor(private alertController: AlertController,private storage : Storage, private router: Router) { 
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

  //Eliminar:
  async eliminar(rut: string, key: string): Promise<boolean>{
    var resp: boolean = false;
    this.usuarios = await this.storage.get(key) || [];
    this.usuarios.forEach((usuario, index) => {
      if(usuario.rut == rut){
        this.usuarios.splice(index, 1);
        resp = true;
      }
    });
    await this.storage.set(key, this.usuarios);
    return resp;
  }

  //Listar:
  async listar(key: string): Promise<any[]>{
    this.usuarios = await this.storage.get(key) || [];
    return this.usuarios;
  }

  //Loguear:
  async login(correo: string, clave: string, key: string){
    this.usuarios = await this.storage.get(key) || [];
    var user: any = this.usuarios.find(usu => usu.correo == correo && usu.clave == clave);
    if(user != undefined){
      this.estado_login = true;
      return user;
    }
    return undefined;
  }

  //Buscar correo:
  async correoExiste(email: string, key: string): Promise<boolean> {
    this.usuarios = await this.storage.get(key) || [];
    var resp: boolean = this.usuarios.some(usuario => usuario.email == email);

    if(resp){
      return true;
    } else {
      return false;
    }
  }

  async logout(){ const alert = await this.alertController.create({
    header: 'Confirmar cierre de sesión',
    message: '¿Estás seguro de que deseas cerrar sesión?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (cancel) => {
          console.log('Operación de cierre de sesión cancelada');
        },
      },
      {
        text: 'Cerrar sesión',
        handler: () => {
          try {
            this.estado_login = false;
            this.router.navigate(['/login']);
          } catch (error) {
            console.error('Error al cerrar sesión:', error);
          }
        },
      },
    ],
  });

  await alert.present();
  }

  setEstadoLogin(){
    this.estado_login = true;
  }


  getEstadoLogin(): boolean{
    return this.estado_login;
  }

  setRut(rut:string){
    this.rut = rut;
  }


  getRut(){
    return this.rut;
  }

}
