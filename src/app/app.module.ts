import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// IMPORT STORAGE //
import { IonicStorageModule } from '@ionic/storage-angular';

// IMPORT MODULO DE PETICIONES HTTP: Permite realizar peticiones API rest(JSON-XML) //
import { HttpClientModule } from '@angular/common/http';

// IMPORT QR //
import { QRCodeModule } from 'angularx-qrcode'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), HttpClientModule, AppRoutingModule, IonicStorageModule.forRoot(), QRCodeModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
