import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestconPageRoutingModule } from './restcon-routing.module';

import { RestconPage } from './restcon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestconPageRoutingModule
  ],
  declarations: [RestconPage]
})
export class RestconPageModule {}
