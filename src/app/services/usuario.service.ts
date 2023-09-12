import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

   //LISTA DE USUARIOS:
   usuarios: any[] = [{
    rut: '11.111.111-1',
    nombre: 'ariel',
    email: 'ariel@duoc.cl',
    fechanac: '2003-05-09',
    perfil: 'admin',
    pass1: 'Judas123',
    pass2: 'Judas123'
  },
  {
    rut: '20.111.111-1',
    nombre: 'felipe',
    email: 'felipe@profesor.duoc.cl',
    fechanac: '1999-03-06',
    perfil: 'Profesor',
    pass1: 'Judas123',
    pass2: 'Judas123'
  },
  {
    rut: '21.111.111-1',
    nombre: 'manuel',
    email: 'manuel@duocuc.cl',
    fechanac: '2000-06-06',
    perfil: 'Alumno',
    pass1: 'Judas123',
    pass2: 'Judas123'
  },
];


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


  correoExiste(email: string): boolean {
    return this.usuarios.some(usuario => usuario.email === email);
  }

}
