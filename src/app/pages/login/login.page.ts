import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

  usuario = new FormGroup({
      correo: new FormControl([Validators.required,
                               Validators.email]),
      contraseña: new FormControl([Validators.required,
                                  Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')])
  })

  ngOnInit() {
  }

}
