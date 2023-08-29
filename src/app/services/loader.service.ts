import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loader: HTMLIonLoadingElement | null = null;

  constructor(private loadingCtrl: LoadingController) { }
  async presentLoader() {
    this.loader = await this.loadingCtrl.create({
      message: "Espere un momento...",
      spinner: "crescent",
      keyboardClose: true,
      translucent: true
    });
    await this.loader.present();
  }

  async hideLoader(){
    if (this.loader){
      await this.loader.dismiss();

      }
  }

}
