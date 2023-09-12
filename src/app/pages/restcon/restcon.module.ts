import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestconPageRoutingModule } from './restcon-routing.module';

import { RestconPage } from './restcon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestconPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RestconPage]
})
export class RestconPageModule {}
