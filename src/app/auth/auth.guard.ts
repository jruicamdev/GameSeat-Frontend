import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService : AuthService,
    private router : Router,
  private _snackBar : MatSnackBar) {}

  //Comprobar si el usuario esta autenticado para poder entrar en las paginas
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      //Comprobar estado del usuario
      this._authService.getAuth().onAuthStateChanged((user:any) => {
        if (user) {
          // Comprobar que el usuario esta autenticado
          if (state.url === '/login') {
            this.router.navigate(['/reservations']);
            resolve(false);
            this._snackBar.open("Por favor, inicie sesión correctamente");
          } else {
            resolve(true);
          }
        } else {
          // Redirigir a /auth si no esta autenticado
          if (state.url !== '/login') {
            this.router.navigate(['/login']);
            resolve(false);
          } else {
            resolve(true);
          }
        }
      });
    });
  }

}