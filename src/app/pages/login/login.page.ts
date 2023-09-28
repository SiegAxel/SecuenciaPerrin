import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  usuario = new FormGroup({
    email: new FormControl('', [Validators.email,
    Validators.required, Validators.pattern("^(.+)@(duocuc\\.cl|profesor\\.duoc\\.cl|duoc\\.cl)$")],
    ),
    clave: new FormControl('', [Validators.required,
    Validators.minLength(6),
    Validators.maxLength(20),
    Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')]),
  })

  email: string = "";
  clave: string = "";

  KEY: string = 'usuarios';

  constructor(private loaderService: LoaderService, private router: Router, private uService: UsuarioStorageService, private toastController: ToastController) { }

  async login() {
    var lista_usuario: any[] = await this.uService.listar(this.KEY);
    var usu_encontrado = lista_usuario.find(usu => usu.email == this.email && usu.pass1 == this.clave);

    console.log(usu_encontrado);
    if (usu_encontrado == undefined) {
      this.mostrarToast("top", "Datos Incorrectos", 3000);
    }
    else {
      if (usu_encontrado.perfil == 'admin') {
        try {
          await this.loaderService.presentLoader();
        } finally {
          this.router.navigate(['/admin', usu_encontrado.nombre]);
          await this.loaderService.hideLoader();
          this.clear();
        }
      } else if (usu_encontrado.perfil == 'Profesor') {
        this.router.navigate(['/profe', usu_encontrado.nombre]);
        await this.loaderService.hideLoader();
        this.clear();
      }
      else if (usu_encontrado.perfil == 'Alumno') {
        this.router.navigate(['/alumno', usu_encontrado.nombre]);
        await this.loaderService.hideLoader();
        this.clear();
      } else {
        this.router.navigate(['/error']);
        await this.loaderService.hideLoader();
      }
    }
  }

  clear() {
    this.email = '';
    this.clave = '';
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
