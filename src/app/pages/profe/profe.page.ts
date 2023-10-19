import { Component, OnInit } from '@angular/core';
import { AsignaturaStorageService } from 'src/app/services/asignatura-storage.service';
import { HomePage } from '../home/home.page';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ClaseStorageService } from 'src/app/services/clase-storage.service';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profe',
  templateUrl: './profe.page.html',
  styleUrls: ['./profe.page.scss'],
})
export class ProfePage implements OnInit {

  KEYC: string = 'clases'

  KEYA: string = 'asignaturas';

  KEY: string = 'usuarios';

  isModalOpen = false;

  agreOpen = false;

  asignaturas: any[] = [];

  usuarios: any[] = [];

  clases: any[] = [];

  rut_profesor: string = '';

  nombre_profesor: string = '';

  dato: string = '';

  dateTime = new Date()
  hora = this.dateTime.getHours();
  minutos = this.dateTime.getMinutes();
  time = '';

  randomPassword: string = '';

  registroClase = new FormGroup({
    id: new FormControl('', Validators.required),
    asignatura: new FormControl(''),
    profesor: new FormControl(''),
    hora: new FormControl(this.time)
  })

  constructor(private aService: AsignaturaStorageService, private cService: ClaseStorageService, private toastController: ToastController, private uService: UsuarioStorageService, private aRoute: ActivatedRoute) { }
  
  generarID() {
    const passwordInput = document.querySelector('#password');
    this.randomPassword = Math.random().toString(36).slice(-8);
    console.log(this.randomPassword);
    this.dato = this.randomPassword;
    this.registroClase.controls.id.setValue(this.randomPassword);
    this.time = this.hora+":"+this.minutos;
    this.registroClase.controls.hora.setValue(this.time);
    this.registroClase.controls.profesor.setValue(this.nombre_profesor);
  }

  filtrarAsignaturas() {
    this.asignaturas = this.asignaturas.filter(asig => asig.rut_profesor === this.rut_profesor);
    return this.asignaturas;
  }

  filtrarProfes(){
    const profesores = this.usuarios.filter(usuario => usuario.perfil === 'profesor');
    return profesores;
  }

  async listarAsig() {
    this.asignaturas = await this.aService.listar(this.KEYA);
  }

  async listarClase() {
    this.clases = await this.cService.listar(this.KEYC);
  }

  async listarUsuarios(){
    this.usuarios = await this.uService.listar(this.KEY);
  }

  async guardarClase() {
    console.log(this.registroClase.value)
    var resp: boolean = await this.cService.agregar(this.registroClase.value, this.KEYC);

    if (resp) {
      this.mostrarToast('middle', 'Clase creada!', 3000);
      this.registroClase.reset();
      await this.listarClase();
      this.agreOpen = false;
    } else {
      this.mostrarToast('middle', 'Error al crear clase.', 3000);
    }
  }

  async setOpen(isOpen: boolean, nombreAsig: string) {
    this.agreOpen = isOpen;
    this.registroClase.controls.asignatura.setValue(nombreAsig);
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

  ngOnInit() {
    this.rut_profesor = this.aService.getRutProfesor();
    this.nombre_profesor = this.aRoute.snapshot.paramMap.get('nombre')||'';
    this.listarAsig().then(() => {
      this.listarUsuarios();
      this.listarClase();
      this.filtrarAsignaturas();
      this.filtrarProfes();
      console.log(this.rut_profesor);
      console.log(this.nombre_profesor);
      console.log(this.asignaturas);
      console.log(this.time)
      
    });
  }

}