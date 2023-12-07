import { Component, OnInit } from '@angular/core';
import { AsignaturaStorageService } from 'src/app/services/asignatura-storage.service';
import { HomePage } from '../home/home.page';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { ClaseStorageService } from 'src/app/services/clase-storage.service';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';
import { ActivatedRoute } from '@angular/router';
import { AnimationBuilder } from '@angular/animations';
import { FirebaseService } from 'src/app/services/firebase.service';

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

  cantidad_clases: any = 0;

  dateTime = new Date()
  hora = this.dateTime.getHours();
  minutos = this.dateTime.getMinutes();
  time = '';

  randomPassword: string = '';

  registroClase = new FormGroup({
    id: new FormControl('', Validators.required),
    asignatura: new FormControl(''),
    profesor: new FormControl(''),
    hora: new FormControl(''),
    asistencia: new FormControl([]),
    codigo_firebase: new FormControl('')
  })

  constructor(private alertController: AlertController, private aService: AsignaturaStorageService, private cService: ClaseStorageService, private toastController: ToastController, private uService: UsuarioStorageService, private aRoute: ActivatedRoute, private cStorage: ClaseStorageService, private fireService: FirebaseService) { }

  generarID() {
    this.randomPassword = Math.random().toString(36).slice(-8);
    console.log(this.randomPassword);
    this.dato = this.randomPassword;
    this.registroClase.controls.id.setValue(this.randomPassword);
    this.time = this.hora + ":" + this.minutos;
    this.registroClase.controls.hora.setValue(this.time);
    this.registroClase.controls.profesor.setValue(this.nombre_profesor);
  }

  verCodigo(id: string) {
    var clase = this.clases.find(clase => clase.id == id);
    if (clase != undefined) {
      this.dato = clase.id;
      console.log(id);
      console.log(this.dato);
      this.cargarClases();
    } else {
      this.mostrarToast('top', 'Clase no encontrada.', 2000);
    }
  }

  filtrarAsignaturas() {
    this.cargarAsignaturas()
    this.asignaturas = this.asignaturas.filter(asig => asig.rut_profesor === this.rut_profesor);
    return this.asignaturas;
  }

  filtrarClases() {
    this.cargarClases()
    this.clases = this.clases.filter(clase => clase.profesor === this.nombre_profesor);
    return this.clases;
  }

  filtrarProfes() {
    const profesores = this.usuarios.filter(usuario => usuario.perfil === 'profesor');
    return profesores;
  }

  async listarClase() {
    this.clases = await this.cService.listar(this.KEYC);
  }

  cargarAsignaturas() {
    this.fireService.getDatos('asignaturas')?.subscribe((data:any) => {
      this.asignaturas = [];
      for (let asignatura of data) {
        //console.log(usuario.payload.doc.data());
        let asig: any = asignatura.payload.doc.data();
        //usu['codigo_firebase'] = usuario.payload.doc.id;
        this.asignaturas.push(asig);
      }
      console.log(this.asignaturas);
    });
  }
  
  cargarClases() {
    this.fireService.getDatos('clases')?.subscribe((data:any) => {
      this.clases = [];
      for (let clase of data) {
        //console.log(usuario.payload.doc.data());
        let cla: any = clase.payload.doc.data();
        cla['codigo_firebase'] = clase.payload.doc.id;
        this.clases.push(cla);
      }
      console.log(this.clases);
      
    });
  }

  cargarUsuarios() {
    this.fireService.getDatos('usuarios')?.subscribe((data:any) => {
      this.usuarios = [];
      for (let usuario of data) {
        //console.log(usuario.payload.doc.data());
        let usu: any = usuario.payload.doc.data();
        //usu['codigo_firebase'] = usuario.payload.doc.id;
        this.usuarios.push(usu);
      }
      console.log(this.usuarios);
    });
  }

  async guardarClase() {
    const nuevaClase = this.registroClase.value;
    nuevaClase.asistencia = []; // Inicializa asistencia como un arreglo vacío
    console.log(nuevaClase);
    const resp: boolean = await this.cService.agregar(nuevaClase, this.KEYC);

    if (resp) {
      this.mostrarToast('middle', 'Clase creada!', 3000);
      this.fireService.agregar('clases', this.registroClase.value); 
      this.registroClase.reset();
      this.filtrarClases();
      this.cargarClases();
      this.agreOpen = false;
    } else {
      this.mostrarToast('middle', 'Error al crear clase.', 3000);
    }
  }

  async eliminarClase(id_eliminar: string, id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta clase?',
      animated: true,
      backdropDismiss: true,
      translucent​:true,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alerta-custom',
          handler: () => {

          }
        },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.cService.eliminar(id_eliminar, this.KEYC);
            this.fireService.eliminar('clases', id);
            this.filtrarClases();
            this.cargarClases();
            this.dato = '';
            this.mostrarToast('middle', 'Clase eliminada!', 3000);
          }
        }
      ]
    });

    await alert.present();
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
    this.nombre_profesor = this.aRoute.snapshot.paramMap.get('nombre') || '';
    this.cargarAsignaturas();
    this.cargarUsuarios();
    this.cargarClases();
    this.filtrarAsignaturas();
    this.filtrarClases();
    this.filtrarProfes();
    console.log(this.rut_profesor);
    console.log(this.nombre_profesor);
    console.log(this.asignaturas);
    console.log(this.time);
    console.log(this.clases);
  }

}