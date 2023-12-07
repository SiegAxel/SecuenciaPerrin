import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ClaseStorageService } from 'src/app/services/clase-storage.service';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';
import { FirebaseService } from 'src/app/services/firebase.service';

declare var google: any; 

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  map: any;
  marker: any;

  constructor(private apiService: ApiService,private cService: ClaseStorageService,private uService:UsuarioStorageService ,private toastController: ToastController, private aRoute: ActivatedRoute, private router: Router, private fireService: FirebaseService) { }

  nombre_alumno: string = '';
  rut_alumno: string = '';
  ClassCode: string = '';
  KEYC: string = 'clases';
  codigo: any = '';
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

  /* METODOS DE API */

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

  /* FIN DE METODOS API */

  async ngOnInit() {
    this.nombre_alumno = this.aRoute.snapshot.paramMap.get('nombre') || '';
    await this.filtrarClases();
    this.obtenerDatos();
    console.log(this.obtenerDatos())
    console.log(this.clasesFiltradas);
    await this.cargarMapa();
    this.autoCompletarInput(this.map, this.marker);
  }

  async filtrarClases() {
    await this.listarClase();
    this.clasesFiltradas = this.clases.filter(clase => {
      return Array.isArray(clase.asistencia) && clase.asistencia.includes(this.nombre_alumno.charAt(0).toUpperCase()+this.nombre_alumno.slice(1)+' - '+this.uService.getRut());
    });
  }

  async listarClase() {
    this.clases = await this.cService.listar(this.KEYC);
  }

  async marcarAsistencia() {
     
    this.codigo = await this.cService.buscarClase(this.ClassCode, this.KEYC);
    console.log(this.codigo)
    //sacar codigo desde firebase en vez de storage
    var separator = ' - ';
    if (this.codigo === undefined) {
      this.mostrarToast("top", "Código no encontrado.", 3000);
    } else {
      const claseEncontrada: any = this.codigo;
  
      if (claseEncontrada.asistencia.includes(this.nombre_alumno.charAt(0).toUpperCase()+this.nombre_alumno.slice(1)+' - '+this.uService.getRut())) {
        this.mostrarToast("middle", "Ya se ha registrado la asistencia.", 2500);
      } else {
        claseEncontrada.asistencia.push(this.nombre_alumno.charAt(0).toUpperCase()+this.nombre_alumno.slice(1)+' - '+this.uService.getRut());
        await this.cService.actualizarClase(claseEncontrada, this.KEYC);
      
        this.mostrarToast("top", "Asistencia marcada.", 3000);
        console.log(this.cService.listar(this.KEYC));
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

  async cargarMapa(){
    const mapa: any = document.getElementById("map");
    this.map = new google.maps.Map(mapa, {
      center: {lat: -33.598595309477396, lng: -70.57906106437217},
      zoom: 18
    });

    this.marker = new google.maps.Marker({
      position: {lat: -33.598595309477396, lng: -70.57906106437217},
      map: this.map,
      title: '(งಠ_ಠ)ง'
    });
    
  }

  autoCompletarInput(mapaLocal: any, marcadorLocal: any){
    var autocomplete: any = document.getElementById("autocomplete");
    const search = new google.maps.Autocomplete(autocomplete); //( ಥ ʖ̯ ಥ)
    search.bindTo('bounds', this.map); //( ಠ ʖ̯ ಠ)
    
    search.addListener('place_changed', function(){
      var place = search.getPlace().geometry.location;
      mapaLocal.setCenter(place);
      mapaLocal.setZoom(14);

      marcadorLocal.setPosition(place);
      marcadorLocal.setMap(mapaLocal);
    });                      
  }




}
