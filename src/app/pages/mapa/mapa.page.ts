import { Component, OnInit } from '@angular/core';

//1 LLamar a don google, se summonea:

declare var google: any; 

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  //Variables locales
  map: any;
  marker: any;

  constructor() { }

  async ngOnInit() {
    await this.cargarMapa();
    this.autoCompletarInput(this.map, this.marker);
  }

  //Metodos

  async cargarMapa(){
    const mapa: any = document.getElementById("map");
    this.map = new google.maps.Map(mapa, {
      center: {lat: -33.598595309477396, lng: -70.57906106437217},
      zoom: 18
    });

    this.marker = new google.maps.Marker({
      position: {lat: -33.598595309477396, lng: -70.57906106437217},
      map: this.map,
      title: '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧Ubicación Σ(°△°|||)  ᕕ( ᐛ )ᕗ    ┬┴┬┴┬┴┬┴┤( ͡° ͜ʖ├┬┴┬┴   (งಠ_ಠ)ง　σ( •̀ ω •́ σ)  (つ◕౪◕)つ━☆ﾟ.*･｡ﾟ'
    });
    
  }

  autoCompletarInput(mapaLocal: any, marcadorLocal: any){
    var autocomplete: any = document.getElementById("autocomplete");
    const search = new google.maps.Autocomplete(autocomplete); //( ಥ ʖ̯ ಥ)
    search.bindTo('bounds', this.map); //( ಠ ʖ̯ ಠ)
    
    search.addListener('place_changed', function(){
      var place = search.getPlace().geometry.location;
      mapaLocal.setCenter(place);
      mapaLocal.setZoom(14);

      marcadorLocal.setPosition(place);
      marcadorLocal.setMap(mapaLocal);
    });                      
  }

}
