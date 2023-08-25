import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-restcon',
  templateUrl: './restcon.page.html',
  styleUrls: ['./restcon.page.scss'],
})
export class RestconPage implements OnInit {



  constructor() { }

  ngOnInit() {
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  
}
