import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = "";
  clave: string = "";

  constructor(private loaderService: LoaderService, private router: Router, private uService: UsuarioService,  private toastController: ToastController) { }

  async login() {
    var lista_usuario: any[] = this.uService.listar();
    var usu_encontrado = lista_usuario.find(usu => usu.email == this.email && usu.pass1 == this.clave);
    
    console.log(usu_encontrado);
    if(usu_encontrado == undefined){
      this.mostrarToast("top", "Datos Incorrectos", 3000);
    }else{
      try {
        await this.loaderService.presentLoader();
      } finally {
        this.router.navigate(['/admin', usu_encontrado.nombre]);
        await this.loaderService.hideLoader();
      }
    }


  }

  async recoverPassword() {
    try {
      await this.loaderService.presentLoader();
    } finally {
      this.router.navigate(['/restcon'])
      await this.loaderService.hideLoader();
    }
  }

  async register() {
    try {
      await this.loaderService.presentLoader();
    } finally {
      this.router.navigate(['/registro'])
      await this.loaderService.hideLoader();
    }
  }

  async mostrarToast(position: 'top' | 'middle' | 'bottom',
    message: string,
    duration: number) {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
    }) 
    await toast.present();
  };


  ngOnInit() {
  }



}
