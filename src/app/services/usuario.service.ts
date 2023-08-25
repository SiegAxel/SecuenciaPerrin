import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //LISTA DE USUARIOS:
  usuarios: any[] = [];

  constructor() { }

  //SERVICIO DE CONTROL DE INFORMACIÓN:
  //CRUD DE USUARIOS:
  agregar(usuario: any): boolean{
    if( this.buscar(usuario.u) == undefined ){
      this.usuarios.push(usuario);
      return true;
    }
    return false;
  }

  eliminar(u: string){
    this.usuarios.forEach( (usu,index) => {
      if(usu.u == u){
        this.usuarios.splice(index,1);
      }
    });
  }

  listar(){
    return this.usuarios;
  }

  buscar(u: string){
    return this.usuarios.find( usu => usu.u == u );
  }

  modificar(u: string, usuario: any){
    var posicion = this.usuarios.findIndex( usu => usu.u == u );
    this.usuarios[posicion] = usuario;
  }

}
