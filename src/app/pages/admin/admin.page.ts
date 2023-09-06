import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  boton_modificar: boolean = true;

  constructor(private aRoute: ActivatedRoute, private uService: UsuarioService, private menuCtrl: MenuController, private toastController: ToastController) { }

  nombre_usuario: string = "";

  lista_usuario: any[] = [];

  cantidad_usuarios: any = 0

  alumnos: number = 0;

  profesores: number = 0;

  clases: number = 0;

  usuarios: any[] = [];

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
      } else if(usu.perfil == "Profesor") {
        this.profesores++;
      }
  }
}

public eliminar(rut_eliminar: string){
  this.uService.eliminar(rut_eliminar);
  this.mostrarToast('middle',"USUARIO ELIMINADO CON ÉXITO!", 3000);
  this.cantidad_usuarios;
}

public modificar(){
  var rut: string = this.cantidad_usuarios.controls.rut.value || '';
  this.uService.modificar(rut, this.cantidad_usuarios.value);
  this.mostrarToast("bottom", "Usuario modificado!", 3000);
  //vamos a habilitar el rut:
  this.cantidad_usuarios.reset();
  document.getElementById("rut")?.removeAttribute("disabled");
  this.boton_modificar = true;
}

openMenu() {
  // Open the menu by menu-id
  this.menuCtrl.enable(true, 'menu');
  this.menuCtrl.open('menu');
}

async mostrarToast(position: 'top' | 'middle' | 'bottom', 
                      message: string,
                      duration: number) {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
    });

    await toast.present();
  }


}
