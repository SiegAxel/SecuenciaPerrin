import { Component, OnInit } from '@angular/core';
import { AsignaturaStorageService } from 'src/app/services/asignatura-storage.service';

@Component({
  selector: 'app-profe',
  templateUrl: './profe.page.html',
  styleUrls: ['./profe.page.scss'],
})
export class ProfePage implements OnInit {

  dato: string = 'https://www.google.cl';
  
  constructor(private aService : AsignaturaStorageService) { }

  usuarios: any[] = [];

  KEYA = 'asignaturas'

  async filtrarAsignaturas(rut: string){
    const lista = this.aService.asignaturasDocente(rut, this.KEYA)
    return lista;
  }

  ngOnInit() {
    
  }

}