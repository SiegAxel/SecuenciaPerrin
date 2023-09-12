import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
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
  constructor( private uService: UsuarioService, private toastController: ToastController) { }

  ngOnInit() {
  }


  async recuperarContrasena() {
    const correo = this.usuario.get('email')?.value; 
    if (correo != null) {
      if (this.uService.correoExiste(correo)) {
        this.mostrarToast("top", "Recuperacion enviada al correo", 3000);
        this.setOpen(false);
      } else {
        this.mostrarToast("middle", "Correo vacio o no existe en la lista de usuarios", 3000);
      }
    }
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {

    this.isModalOpen = isOpen;
  }

  async mostrarToast(position: 'top' | 'middle' | 'bottom',
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
  
}
