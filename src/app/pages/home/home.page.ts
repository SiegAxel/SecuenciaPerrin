import { Component, OnInit } from '@angular/core';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignaturaStorageService } from 'src/app/services/asignatura-storage.service';

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
  }

  usuarios = this.uStorage.listar(this.KEY);


  async ngOnInit() {
  }

}
