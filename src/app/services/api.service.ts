import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // VARIABLE AUXILIAR //

  URL: string = 'https://api.nasa.gov/planetary/apod';

  // VARIABLE PARA UTILIZAR PETICIONES //

  constructor(private http: HttpClient) { }

  // Metodos para consumir la api:
  

  // 2) Consumir solamente 1 valor de la API:

  getDato(){
    return this.http.get(this.URL)
  }
  
}
