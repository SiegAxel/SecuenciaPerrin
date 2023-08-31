import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  showSidebar = true;

  constructor() { }

  ngOnInit() {
  }


  mostrarSidebar(){
    this.showSidebar = !this.showSidebar;
  }

}
