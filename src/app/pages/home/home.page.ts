import { Component, OnInit } from '@angular/core';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  data: any;
  KEY : string = 'usuarios';

  constructor(private uStorage : UsuarioStorageService, private route: ActivatedRoute, private router: Router) 
  { 
    this.data = router.getCurrentNavigation()?.extras.state;
    console.log(this.data.user)
  }

  usuarios = this.uStorage.listar(this.KEY);


  async ngOnInit() {
  }

}
