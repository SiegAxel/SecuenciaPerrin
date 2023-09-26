import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  registroUsuario = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}\\.[0-9]{3}\\.[0-9]{3}-[0-9kK]{1}'), validarRutChileno]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.email, Validators.required, Validators.pattern("^(.+)@(duocuc\\.cl|profesor\\.duoc\\.cl|duoc\\.cl)$")]),
    fechanac: new FormControl('', Validators.required),
    perfil: new FormControl('Alumno', Validators.required),
    pass1: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')]),
    pass2: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')])
  });

  usuario = new FormGroup({
    rut: new FormControl('', [Validators.required,
    Validators.pattern('[0-9]{1,2}\\.[0-9]{3}\\.[0-9]{3}-[0-9kK]{1}'), validarRutChileno]),
    nombre: new FormControl('', [Validators.required,
    Validators.minLength(3)]),
    email: new FormControl('', [Validators.email,
    Validators.required, Validators.pattern("^(.+)@(duocuc\\.cl|profesor\\.duoc\\.cl|duoc\\.cl)$")],
    ),
    fechanac: new FormControl('', Validators.required),
    perfil: new FormControl('', Validators.required),
    pass1: new FormControl('', [Validators.required,
    Validators.minLength(6),
    Validators.maxLength(20),
    Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')]),
    pass2: new FormControl('', [Validators.required,
    Validators.minLength(6),
    Validators.maxLength(20),
    Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')])
  });

  constructor(private uStorage: UsuarioStorageService, private aRoute: ActivatedRoute,
    private uService: UsuarioService,
    private menuCtrl: MenuController, private toastController: ToastController,
    private modalCtrl: ModalController, private router: Router) { }

  boton_modificar: boolean = true;

  nombre_usuario: string = "";

  nomBuscar: string = "";

  rut_usuario: string = "";

  cantidad_usuarios: any = 0

  alumnos: number = 0;

  lista_usuarios: any[] = [];

  profesores: number = 0;

  clases: number = 0;

  usuarios: any[] = [];

  KEY: string = 'usuarios';

  isModalOpen = false;

  agreOpen = false;

  async ngOnInit() {
    await this.listar();
    this.nombre_usuario = this.aRoute.snapshot.paramMap.get('nombre') || "";
    this.cantidad_usuarios = this.usuarios.length;
    this.lista_usuarios = this.usuarios;
    this.contar();

    const loggedInUser = this.usuarios.find(user => user.nombre === this.nombre_usuario);
    if (loggedInUser) {
      this.rut_usuario = loggedInUser.rut;
      console.log('rut usuario logged-in:', this.rut_usuario);
    } else {
      console.error('Usuario no encontrado con nombre:', this.nombre_usuario);
    }
  }

  // Metodos Unidad 2:

  async listar() {
    this.usuarios = await this.uStorage.listar(this.KEY);
  }

  async guardar() {
    const fechaNacimiento = this.registroUsuario.controls.fechanac.value || '';
    const today = new Date();
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const age = today.getFullYear() - fechaNacimientoDate.getFullYear();

    if (age < 17) {
      this.mostrarToast("bottom", "Debe ser igual a o mayor de 17 años para registrarse.", 3000);
    } else {
      var resp: boolean = await this.uStorage.agregar(this.registroUsuario.value, this.KEY);
      if (resp) {
        this.mostrarToast("middle", "Usuario agregado!", 3000);
        this.registroUsuario.reset();
        await this.listar();
        this.agreOpen = false;
      } else {
        this.mostrarToast("middle", "Error al agregar usuario.", 3000);
      }
    }
  }

  async eliminar(rut_eliminar: string){
    await this.uStorage.eliminar(rut_eliminar, this.KEY);
    await this.listar();
    this.mostrarToast('middle', "USUARIO ELIMINADO CON ÉXITO!", 3000);
  }


  async modificar(){
    var rut: string = this.usuario.controls.rut.value || '';
    var perfil = this.usuario.controls.perfil.value || '';
    var usuName = this.usuario.controls.nombre.value || '';
    var correoNew = "";

    if (perfil == "Alumno") {
      correoNew = usuName + "@duocuc.cl"
      this.usuario.controls.email.setValue(correoNew);
    } else if (perfil == "Profesor") {
      correoNew = usuName + "@profesor.duoc.cl"
      this.usuario.controls.email.setValue(correoNew);
    } else {
      correoNew = usuName + "@duoc.cl";
      this.usuario.controls.email.setValue(correoNew);
    }

    var resp:boolean = await this.uStorage.modificar(this.usuario.value, this.KEY);
    if(resp){
      this.mostrarToast("bottom", "Usuario modificado!", 3000);
      await this.listar();
      document.getElementById("rut")?.removeAttribute("disabled");
      this.boton_modificar = true;
      this.isModalOpen = false;
    }

  }
  

  /////////////////////////////////////////////



  async buscar(rut_modificar:string) {

    var usuario_encontrado: any = await this.uStorage.buscar(rut_modificar, this.KEY)
    this.usuario.setValue(usuario_encontrado);
    this.boton_modificar = false;
    //vamos a bloquear el rut
    document.getElementById("rut")?.setAttribute("disabled", "true");
  }

  async setOpen(isOpen: boolean, rut_modificar: string) {
    if (rut_modificar == '') {
      this.agreOpen = isOpen;
    } else {
      this.isModalOpen = isOpen;
      await this.buscar(rut_modificar);
    }

  }

  back() {
    this.router.navigate(['/login'])
  }

  contar() {
    this.alumnos = this.usuarios.filter(usu => usu.perfil === "Alumno").length;
    this.profesores = this.usuarios.filter(usu => usu.perfil === "Profesor").length;
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


