import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profe',
  templateUrl: './profe.page.html',
  styleUrls: ['./profe.page.scss'],
})
export class ProfePage implements OnInit {

  data: string = 'https://www.google.cl';

  constructor() { }

  ngOnInit() {
  }

}
