import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecconPageRoutingModule } from './reccon-routing.module';

import { RecconPage } from './reccon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecconPageRoutingModule
  ],
  declarations: [RecconPage]
})
export class RecconPageModule {}
