import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfePageRoutingModule } from './profe-routing.module';

import { ProfePage } from './profe.page';
import { QRCodeModule } from 'angularx-qrcode'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfePageRoutingModule,
    QRCodeModule
  ],
  declarations: [ProfePage]
})
export class ProfePageModule {}
