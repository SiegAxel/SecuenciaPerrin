import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private loaderService: LoaderService, private router: Router, private uService: UsuarioStorageService, private toastController: ToastController) { }

  admin: any = {
    rut: '11.111.111-1',
    nombre: 'ariel',
    email: 'ariel@duoc.cl',
    fechanac: '2003-05-09',
    perfil: 'admin',
    pass1: 'Judas123',
    pass2: 'Judas123'
  }

  profesor: any = {
    rut: '12.111.111-1',
    nombre: 'felipe',
    email: 'felipe@profesor.duoc.cl',
    fechanac: '2003-05-09',
    perfil: 'profesor',
    pass1: 'Judas123',
    pass2: 'Judas123'
  }

  alumno: any = {
    rut: '13.111.111-1',
    nombre: 'manuel',
    email: 'manuel@duocuc.cl',
    fechanac: '2003-05-09',
    perfil: 'alumno',
    pass1: 'Judas123',
    pass2: 'Judas123'
  }

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

  async login() {
    var lista_usuario: any[] = await this.uService.listar(this.KEY);
    var usu_encontrado = lista_usuario.find(usu => usu.email == this.email && usu.pass1 == this.clave);

    console.log(usu_encontrado);

    if (usu_encontrado == undefined) {
      this.mostrarToast("top", "Datos Incorrectos", 3000);
    }
    else {
      if (usu_encontrado != undefined) {
        try {
          await this.loaderService.presentLoader();
        } finally {
          let navigationExtras: NavigationExtras = {
            state: {
              user: usu_encontrado
            }
          };
          this.uService.setEstadoLogin();
          this.router.navigate(['/home'], navigationExtras);
          await this.loaderService.hideLoader();
          this.clear();
          console.log(this.uService.getEstadoLogin())
          return usu_encontrado;
        }
      } else {
        this.router.navigate(['/error']);
        await this.loaderService.hideLoader();
        return undefined;
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

  async ngOnInit() {
    await this.uService.agregar(this.admin, this.KEY);
    await this.uService.agregar(this.profesor, this.KEY);
    await this.uService.agregar(this.alumno, this.KEY);
    console.log(this.admin,this.alumno,this.profesor)
  }



}
