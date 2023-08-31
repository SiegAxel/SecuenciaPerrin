import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private loaderService: LoaderService, private router: Router) { }

  async login() {
    try {
      await this.loaderService.presentLoader();
      await this.simulateLogin();
    } finally {
      await this.loaderService.hideLoader();
    }
  }

  usuario = new FormGroup({
    email: new FormControl('', [Validators.email,
    Validators.required]),
    pass: new FormControl('', [Validators.required,
    Validators.minLength(6),
    Validators.maxLength(20),
    Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')])
  })

  async recoverPassword() {
    try {
      await this.loaderService.presentLoader();
    } finally {
      await this.loaderService.hideLoader();
      this.router.navigate(['/restcon'])
    }
  }

  async register() {
    try {
      await this.loaderService.presentLoader();
    } finally {
      await this.loaderService.hideLoader();
      this.router.navigate(['/registro'])
    }
  }

  ngOnInit() {
  }



  //Simulaciones

  private simulateLogin() {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  }

}
