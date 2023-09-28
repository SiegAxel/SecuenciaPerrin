import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.page.html',
  styleUrls: ['./api.page.scss'],
})
export class ApiPage implements OnInit {

  //Variables Auxiliares:

  cantidad: number = 0;
  personajes: any[]= [];

  constructor(private apiService : ApiService, private router: Router) { }

  ngOnInit() {
    this.consumirApi();
  }

  //2. Vamos a crear métodos relacionados a la API:

  consumirApi(){
    this.apiService.getDatos().subscribe((resp: any)=>{
      console.log(resp);
      this.cantidad = resp.info.count;
      this.personajes = resp.results;
      console.table(this.personajes);
    });
  }

  descripcion(id: number){
    this.router.navigate(['/detalle', id])
  }

}
