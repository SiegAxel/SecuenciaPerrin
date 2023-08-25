import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  usuario = new FormGroup({
      correo: new FormControl([Validators.required,
                               Validators.email]),
      contraseña: new FormControl([Validators.required,
                                  Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')])
  })

  ngOnInit() {
  }


  redireccionar(){
    this.router.navigate(['/registro'])
  }
}
