import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private usuarioService: UsuarioService,
    private toastController: ToastController,
    private router: Router,
  ) { }

  usuario = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}\\.[0-9]{3}\\.[0-9]{3}-[0-9kK]{1}'), validarRutChileno]),
    nombre: new FormControl('', [Validators.required,
    Validators.minLength(3)]),
    email: new FormControl('', [Validators.email,
    Validators.required, Validators.pattern("^(.+)@(duocuc\\.cl|profesor\\.duoc\\.cl|duoc\\.cl)$")],
    ),
    fechanac: new FormControl('', Validators.required),
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

  ngOnInit() {
    this.usuarios = this.listar_usuarios();
  }


  async redireccionar() {
    await new Promise(f => setTimeout(f, 1000));
    this.router.navigate(['/login'])
  }



  public registrar() {
    var respuesta: boolean = this.usuarioService.agregar(this.usuario.value);
    const fechaNacimiento = this.usuario.get('fechanac')?.value;
    let res = 0;

    // Dividir la cadena de fecha en partes
    const partesFecha = fechaNacimiento?.split('-');
  
    if (partesFecha?.length === 3) {
      // Obtener el año como la primera parte de la cadena dividida
      const añoNacimiento = parseInt(partesFecha[0], 10); // Convertir a número
  
      // Obtener el año actual
      const añoActual = new Date().getFullYear();
  
      // Realizar el calculo
      res = añoActual - añoNacimiento;
      console.log(res);
    }

    if (respuesta && res >= 17) {
      this.mostrarToast("top", "Usuario Registrado!", 1000);
      console.log('Fecha de Nacimiento:', fechaNacimiento);
      this.usuario.reset();
      this.listar_usuarios();
      this.redireccionar();
    } else if (res < 17) {
      this.mostrarToast("middle", "El usuario debe ser mayor de 17 años.", 3000);
    } else {
      this.mostrarToast("top", "Error al registrar.", 1000);
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


