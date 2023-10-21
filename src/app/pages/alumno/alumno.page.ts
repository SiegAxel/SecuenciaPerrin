import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ClaseStorageService } from 'src/app/services/clase-storage.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {


  constructor(private apiService: ApiService,private cService: ClaseStorageService, private toastController: ToastController, private aRoute: ActivatedRoute, private router: Router) { }

  nombre_alumno: string = '';
  ClassCode: string = '';
  KEYC: string = 'clases';
  codigo: string = '';
  clases: any[] = [];
  clasesFiltradas: any[] = [];
  url: string = ''


  registroClase = new FormGroup({
    id: new FormControl('', Validators.required),
    asignatura: new FormControl(''),
    profesor: new FormControl(''),
    hora: new FormControl(''),
    asistencia: new FormControl([]),
  })

  mostrarDatos({ url }: {url: string}) {
    this.url = url;
  }
  
  obtenerDatos(){

    const nasa_key = 'j3raHVSoIBMudrsGNVle6PJXXf0WrJqyVOzw5g7a';
    const ruta = `https://api.nasa.gov/planetary/apod?api_key=${nasa_key}`;

    fetch(ruta)
    .then(respuesta => respuesta.json())
    .then(resultado => this.mostrarDatos(resultado))
  }

  async ngOnInit() {
    this.nombre_alumno = this.aRoute.snapshot.paramMap.get('nombre') || '';
    await this.filtrarClases();
    this.obtenerDatos();
    console.log(this.obtenerDatos())
    console.log(this.clasesFiltradas);
  }

  async filtrarClases() {
    await this.listarClase();
    this.clasesFiltradas = this.clases.filter(clase => {
      return Array.isArray(clase.asistencia) && clase.asistencia.includes(this.nombre_alumno);
    });
  }

  async listarClase() {
    this.clases = await this.cService.listar(this.KEYC);
  }

  async marcarAsistencia() {
    this.codigo = await this.cService.buscarClase(this.ClassCode, this.KEYC);

    if (this.codigo === null) {
      this.mostrarToast("top", "Código no encontrado.", 3000);
    } else {
      const claseEncontrada: any = this.codigo;

      // Esto verifica si el nombre del alumno ya está en la lista de asistencia que es lo que nos faltaba
      if (claseEncontrada.asistencia.includes(this.nombre_alumno)) {
        this.mostrarToast("middle", "Ya se ha registrado la asistencia.", 2500);
      } else {
        claseEncontrada.asistencia.push(this.nombre_alumno);
        await this.cService.actualizarClase(claseEncontrada, this.KEYC);
        this.mostrarToast("top", "Asistencia marcada.", 3000);
        console.log(this.cService.listar(this.KEYC))
        this.filtrarClases();
      }
    }
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

  back() {
    this.router.navigate(['/login']);
  }




}
