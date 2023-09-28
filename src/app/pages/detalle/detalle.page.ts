import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  // VARIABLES AUXILIARES //
  
  id: number = 0;
  personaje: any;

  constructor(private aRoute: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.id = +(this.aRoute.snapshot.paramMap.get('id') || '');
    this.detalle();
  }

  // METODO QUE ENTREGA TODOS LOS DATOS DE UN PERSONAJE //

  detalle(){
    this.apiService.getDato(this.id).subscribe( (resp: any) => {
      console.log(resp)
      this.personaje = resp;
    } );
  }

}
