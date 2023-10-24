import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioStorageService } from './usuario-storage.service';


@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

constructor(private uStorage: UsuarioStorageService, private router: Router){
 
}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(this.uStorage.getEstadoLogin() == true){
        return true;  
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}
