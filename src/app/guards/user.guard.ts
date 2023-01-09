import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanLoad {

  constructor(private userService: UsuarioService){


  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean{
    return this.userService.checkToken();
        return false;
  }
}
