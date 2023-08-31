import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario = new FormGroup({
    rut: new FormControl('', [Validators.required,
    Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nombre: new FormControl('', [Validators.required,
    Validators.minLength(3)]),
    email: new FormControl('', [Validators.email,
    Validators.required]),
    perfil: new FormControl('Alumno', Validators.required),
    pass1: new FormControl('', [Validators.required,
    Validators.minLength(6),
    Validators.maxLength(20),
    Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')]),
    pass2: new FormControl('', [Validators.required,
    Validators.minLength(6),
    Validators.maxLength(20),
    Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')])
  });

  usuarios: any[] = [];

  constructor(private usuarioService: UsuarioService,
    private toastController: ToastController,
    private router: Router) { }

  ngOnInit() {
    this.usuarios = this.listar_usuarios();
  }

  async redireccionar() {
    await new Promise(f => setTimeout(f, 1000));
    this.router.navigate(['/login'])
  }
  

  public registrar() {
    var respuesta: boolean = this.usuarioService.agregar(this.usuario.value);
    if (respuesta) {
      this.mostrarToast("top", "Usuario Registrado!", 1000);
      this.usuario.reset();
      this.listar_usuarios();
      this.redireccionar();
    } else {
      console.log('Error al registrar')
    }

  }

  listar_usuarios() {
    return this.usuarioService.listar();
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
