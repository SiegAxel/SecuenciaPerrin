import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //LISTA DE USUARIOS:
  usuarios: any[] = [{
    rut: '11.111.111-1',
    nombre: 'ariel',
    email: 'ariel@gmail.com',
    perfil: 'Alumno',
    pass1: 'Judas123',
    pass2: 'Judas123'
  }];

  constructor() { }

  //SERVICIO DE CONTROL DE INFORMACIÓN:
  //CRUD DE USUARIOS:
  agregar(usuario: any): boolean{
    if( this.buscar(usuario.rut) == undefined ){
      this.usuarios.push(usuario);
      return true;
    }
    return false;
  }

  eliminar(rut: string){
    this.usuarios.forEach( (usu,index) => {
      if(usu.rut == rut){
        this.usuarios.splice(index,1);
      }
    });
  }

  listar(){
    return this.usuarios;
  }

  buscar(rut: string){
    return this.usuarios.find( usu => usu.rut == rut );
  }

  modificar(rut: string, usuario: any){
    var posicion = this.usuarios.findIndex( usu => usu.rut == rut );
    this.usuarios[posicion] = usuario;
  }
}
