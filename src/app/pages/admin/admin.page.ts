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

  ngOnInit() {
    this.nombre_usuario = this.aRoute.snapshot.paramMap.get('nombre') || "";
    this.lista_usuario = this.uService.listar();

  }

  mostrarSidebar(){
    this.showSidebar = !this.showSidebar;
  }

}
