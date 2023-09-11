import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-restcon',
  templateUrl: './restcon.page.html',
  styleUrls: ['./restcon.page.scss'],
})
export class RestconPage implements OnInit {

  usuario = new FormGroup({
    email: new FormControl('', [Validators.email,
    Validators.required, Validators.pattern("^(.+)@(duocuc\\.cl|profesor\\.duoc\\.cl|duoc\\.cl)$")],
    ),
  })
  constructor( private uService: UsuarioService) { }

  ngOnInit() {
  }


  

  isModalOpen = false;

  setOpen(isOpen: boolean) {

    this.isModalOpen = isOpen;
  }
  
}
