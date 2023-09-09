import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  usuario = new FormGroup({
    rut: new FormControl('', [Validators.required,
    Validators.pattern('[0-9]{1,2}\\.[0-9]{3}\\.[0-9]{3}-[0-9kK]{1}'),validarRutChileno]),
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



  constructor(private aRoute: ActivatedRoute, private uService: UsuarioService, private menuCtrl: MenuController, private toastController: ToastController, private modalCtrl: ModalController) { }

  boton_modificar: boolean = true;

  nombre_usuario: string = "";

  rut_usuario: string = "";

  lista_usuario: any[] = [];

  cantidad_usuarios: any = 0

  alumnos: number = 0;

  profesores: number = 0;

  clases: number = 0;

  usuarios: any[] = [];

  isModalOpen = false;

  agreOpen = false;

  ngOnInit() {
    this.rut_usuario = this.aRoute.snapshot.paramMap.get('rut') || "";
    this.nombre_usuario = this.aRoute.snapshot.paramMap.get('nombre') || "";
    this.lista_usuario = this.uService.listar();
    this.cantidad_usuarios = this.lista_usuario.length;
    this.usuarios = this.lista_usuario;
    this.contar();
  }

  public modificar() {
    var rut: string = this.usuario.controls.rut.value || '';
    this.uService.modificar(rut, this.usuario.value);
    this.mostrarToast("bottom", "Usuario modificado!", 3000);
    //vamos a habilitar el rut:
    this.usuario.reset();
    document.getElementById("rut")?.removeAttribute("disabled");
    this.boton_modificar = true;
    this.isModalOpen = false;
  }


  public registrar() {
    var respuesta: boolean = this.uService.agregar(this.usuario.value);
    if (respuesta) {
      this.mostrarToast("top", "Usuario Registrado!", 1000);
      this.usuario.reset();
      this.usuarios;
      this.agreOpen = false;
    } else {
      this.mostrarToast("bottom", "Error al registrar.", 3000);
    }

  }


  public buscar(rut_buscar: string) {
    //console.log(this.usuarioService.buscar(rut_buscar));
    var usuario_encontrado: any = this.uService.buscar(rut_buscar);
    this.usuario.setValue(usuario_encontrado);
    this.boton_modificar = false;
    //vamos a bloquear el rut
    document.getElementById("rut")?.setAttribute("disabled", "true");
  }

  setOpen(isOpen: boolean, rut_modificar: string) {
    if (rut_modificar == '') {
      this.agreOpen = isOpen;
    } else {
      this.isModalOpen = isOpen;
      this.buscar(rut_modificar);
    }
  }



  contar() {
    for (let usu of this.lista_usuario) {
      if (usu.perfil == "Alumno") {
        this.alumnos++;
      } else if (usu.perfil == "Profesor") {
        this.profesores++;
      }
    }
  }

  public eliminar(rut_eliminar: string) {
    this.uService.eliminar(rut_eliminar);
    this.mostrarToast('middle', "USUARIO ELIMINADO CON ÉXITO!", 3000);
    this.usuarios;
  }

  openMenu() {
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

