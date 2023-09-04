import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  showSidebar = true;

  constructor(private aRoute: ActivatedRoute, private uService: UsuarioService) { }

  nombre_usuario: string = "";

  lista_usuario: any[] = [];

  cantidad_usuarios: any = 0

  alumnos: number = 0;

  profesores: number = 0;

  ngOnInit() {
    this.nombre_usuario = this.aRoute.snapshot.paramMap.get('nombre') || "";
    this.lista_usuario = this.uService.listar();
    this.cantidad_usuarios = this.lista_usuario.length;
    this.buscar();
  }

  buscar(){
      for(let usu of this.lista_usuario){
        if(usu.perfil == "Alumno"){
          this.alumnos++;
        } else {
          this.profesores++;
        }
    }
    
  }

  mostrarSidebar(){
    this.showSidebar = !this.showSidebar;
  }

}
