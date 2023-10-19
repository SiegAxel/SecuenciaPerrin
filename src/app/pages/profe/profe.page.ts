import { Component, OnInit } from '@angular/core';
import { AsignaturaStorageService } from 'src/app/services/asignatura-storage.service';
import { HomePage } from '../home/home.page';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ClaseStorageService } from 'src/app/services/clase-storage.service';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';

@Component({
  selector: 'app-profe',
  templateUrl: './profe.page.html',
  styleUrls: ['./profe.page.scss'],
})
export class ProfePage implements OnInit {

  registroClase = new FormGroup({
    id: new FormControl('', Validators.required),
    asignatura: new FormControl('', Validators.required),
    profesor: new FormControl('', Validators.required),
    hora: new FormControl('', Validators.required)
  })

  KEYC: string = 'clases'

  KEYA: string = 'asignaturas';

  KEY: string = 'usuarios';

  isModalOpen = false;

  agreOpen = false;

  asignaturas: any[] = [];

  usuarios: any[] = [];

  clases: any[] = [];

  rut_profesor: string = '';

  dato: string = 'https://www.google.cl';

  constructor(private aService: AsignaturaStorageService, private cService: ClaseStorageService, private toastController: ToastController, private uService: UsuarioStorageService) { }

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

  async setOpen(isOpen: boolean) {
    this.agreOpen = isOpen;
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
    this.listarAsig().then(() => {
      this.listarUsuarios();
      this.listarClase();
      this.filtrarAsignaturas();
      this.filtrarProfes();
      console.log(this.rut_profesor);
      console.log(this.asignaturas);
    });
  }

}