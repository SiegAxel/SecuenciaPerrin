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
    u: new FormControl('', [Validators.required, Validators.minLength(3),
    Validators.maxLength(20)]),
    nombre: new FormControl('', [Validators.required,
    Validators.minLength(3)]),
    email: new FormControl('', [Validators.email,
    Validators.required]),
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

  redireccionar() {
    this.router.navigate(['/login'])
  }

  public registrar() {
    var respuesta: boolean = this.usuarioService.agregar(this.usuario.value);
    if (respuesta) {
      this.mostrarToast("top", "Usuario Registrado!", 3000);
      this.usuario.reset();
    }
    console.table(this.usuarioService.listar());
  }

  listar_usuarios() {
   return this.usuarioService.listar();
  }

  public eliminar(u_eliminar: string){
    
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
