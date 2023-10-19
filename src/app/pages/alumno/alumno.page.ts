import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ClaseStorageService } from 'src/app/services/clase-storage.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  constructor(private cService: ClaseStorageService, private toastController: ToastController, private aRoute: ActivatedRoute, private router: Router) { }

  nombre_alumno: string = '';
  ClassCode: string = '';
  KEYC: string = 'clases';
  codigo: string = '';

  registroClase = new FormGroup({
    id: new FormControl('', Validators.required),
    asignatura: new FormControl(''),
    profesor: new FormControl(''),
    hora: new FormControl(''),
    asistencia: new FormControl([]),
  })

  ngOnInit() {
    this.nombre_alumno = this.aRoute.snapshot.paramMap.get('nombre') || '';
  }

  async marcarAsistencia(){
    this.codigo = await this.cService.buscarClase(this.ClassCode,this.KEYC);
    if (this.codigo === null){
      this.mostrarToast("top", "Código no encontrado.", 3000);
    }else { 
      if(await this.cService.buscarNombres(this.nombre_alumno, this.KEYC)){
        const claseEncontrada: any =  this.codigo;
        claseEncontrada.asistencia.push(this.nombre_alumno);
        await this.cService.actualizarClase(claseEncontrada, this.KEYC);
        this.mostrarToast("top", "Asistencia marcada.", 3000);
        console.log(this.cService.listar(this.KEYC))
      }
      this.mostrarToast("top", "Alumno ya presente en la clase.", 2000);
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

  back(){
    this.router.navigate(['/login']);
  }




}
