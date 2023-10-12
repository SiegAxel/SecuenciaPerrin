import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

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
  constructor( private uService: UsuarioService, private toastController: ToastController, private uStorage: UsuarioStorageService, private router: Router) { }

  ngOnInit() {
  }

  KEY: string = 'usuarios';

  async recuperarContrasena() {
    const correo = this.usuario.get('email')?.value; 
    if (correo != null) {
      if (await this.uStorage.correoExiste(correo, this.KEY) == true) {
        this.usuario.reset();
        this.toastValid("middle", "Recuperacion enviada al correo", 3000);
        this.setOpen(false);
      } else {
        this.toastInvalid("middle", "Correo vacio o no existe en la lista de usuarios", 3000);
      }
    }
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {

    this.isModalOpen = isOpen;
  }

  async toastValid(position: 'top' | 'middle' | 'bottom',
    message: string,
    duration: number) {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
      color: 'success',
    })
    await toast.present();
  };

  async toastInvalid(position: 'top' | 'middle' | 'bottom',
  message: string,
  duration: number) {
  const toast = await this.toastController.create({
    message,
    duration,
    position,
    color: 'danger',
  })
  await toast.present();
};

back() {
  this.router.navigate(['/login'])
}
  
}
