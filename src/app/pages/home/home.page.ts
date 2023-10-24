import { Component, OnInit } from '@angular/core';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignaturaStorageService } from 'src/app/services/asignatura-storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  data: any;
  KEY : string = 'usuarios';
  rut_profesor: string = '';

  constructor(private uStorage : UsuarioStorageService, private route: ActivatedRoute, private router: Router, private aService: AsignaturaStorageService) 
  { 
    this.data = router.getCurrentNavigation()?.extras.state;
    console.log(this.data.user)
    this.rut_profesor = this.data.user.rut;
    console.log(this.rut_profesor);
    this.aService.setRutProfesor(this.rut_profesor);
    if (this.data.user.perfil === 'alumno') {
      this.uStorage.setRut(this.data.user.rut);
    }
  }

  usuarios = this.uStorage.listar(this.KEY);

  async ngOnInit() {
  }

  async logout() {
    this.uStorage.logout();
  }

}
