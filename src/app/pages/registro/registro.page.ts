import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(
    private toastController: ToastController,
    private router: Router,
    private uService : UsuarioStorageService,
    private fireService: FirebaseService
  ) {}

  usuario = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}\\.[0-9]{3}\\.[0-9]{3}-[0-9kK]{1}'), validarRutChileno]),
    nombre: new FormControl('', [Validators.required,
    Validators.minLength(3)]),
    email: new FormControl('', [Validators.email,
    Validators.required, Validators.pattern("^(.+)@(duocuc\\.cl)$")],
    ),
    fechanac: new FormControl('', Validators.required),
    perfil: new FormControl('alumno', Validators.required),
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

  KEY: string = 'usuarios';

   async ngOnInit() {
    this.cargarUsuarios();
    console.log(this.usuarios);
  }

  async redireccionar() {
    await new Promise(f => setTimeout(f, 1000));
    this.router.navigate(['/login'])
  }

  async registrar() {
    const fechaNacimiento = this.usuario.controls.fechanac.value || '';
    const today = new Date();
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const age = today.getFullYear() - fechaNacimientoDate.getFullYear();
  
    if (age < 17) {
      this.mostrarToast("middle", "Debe ser igual a o mayor de 17 años para registrarse.", 3000);
    } else {
      console.log('Valor del formulario:', this.usuario.controls.nombre.value);
      const respuesta: any= this.usuarios.find(user => user.nombre === this.usuario.controls.nombre.value);
      console.log(respuesta);
      
      if (respuesta == undefined) {
        this.mostrarToast("top", "Usuario Registrado!", 1000);
        this.fireService.agregar('usuarios', this.usuario.value);
        this.usuario.reset();
        this.redireccionar();
      } else {
        this.mostrarToast("top", "Error al registrar.", 3000);
      }
    }
  }

  cargarUsuarios() {
    this.fireService.getDatos('usuarios')?.subscribe((data:any) => {
      
      this.usuarios = [];
      for (let usuario of data) {
        //console.log(usuario.payload.doc.data());
        let usu: any = usuario.payload.doc.data();
        usu['codigo_firebase'] = usuario.payload.doc.id;
        this.usuarios.push(usu);
      }
      console.log(this.usuarios);
    });
  }

  async listar_usuarios() {
    return this.uService.listar(this.KEY);
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

function validarRut(rut: string): boolean {
  // Limpia el RUT de puntos y guión
  rut = rut.replace(/\./g, '').replace(/-/g, '').trim();

  // Extrae el dígito verificador
  const dv = rut.slice(-1).toUpperCase();
  let rutNumerico = parseInt(rut.slice(0, -1), 10);

  // Calcula el dígito verificador esperado
  let suma = 0;
  let multiplicador = 2;

  while (rutNumerico > 0) {
    suma += (rutNumerico % 10) * multiplicador;
    rutNumerico = Math.floor(rutNumerico / 10);
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const dvEsperado = 11 - (suma % 11);
  const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

  return dv === dvCalculado;
}

function validarRutChileno(control: FormControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  const esValido = validarRut(control.value);

  return esValido ? null : { rutInvalido: true };
}


