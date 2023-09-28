import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // VARIABLE AUXILIAR //

  URL: string = 'https://rickandmortyapi.com/api/character';

  // VARIABLE PARA UTILIZAR PETICIONES //

  constructor(private http: HttpClient) { }

  // Metodos para consumir la api:
  
  // 1) Consumir todos los valores de la API:
  
  getDatos(){
    return this.http.get(this.URL);
  }

  // 2) Consumir solamente 1 valor de la API:

  getDato(id: number){
    return this.http.get(this.URL + '/' + id)
  }
  
}
