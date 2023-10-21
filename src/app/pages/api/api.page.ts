import { HttpClient } from '@angular/common/http';
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
  gatos: any[] = [];
  catImageUrl: string = "";

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {

  }

  //2. Vamos a crear métodos relacionados a la API:



}
