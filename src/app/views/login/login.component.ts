import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Token } from 'src/app/models/token';
import { Observable, Observer } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private _snackBar: MatSnackBar,
    private router : Router
  ) {}
  showLogin = true;

  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    username: '',
    email: '',
    password: ''
  };

  toggleForm() {
    this.showLogin = !this.showLogin;
  }

  login(user: { email: string; password: string }): Observable<Token>  {
    return new Observable((observer: Observer<Token | any>) => {

      let credentials = `${user.email}:${user.password}`;

      this.authService.login((credentials)).subscribe({
        next: (user: Token) => {
          this.storageService.saveToken(user.accessToken);
          this.storageService.saveUserDetails(user);
          this.router.navigate(["/reservations"]);
          observer.next(user);
        },
        error: () => {
          observer.next(null);
        }
      });
    });
  }

  register(): void {
    this.authService.register(this.registerData.username, this.registerData.email, this.registerData.password).subscribe({
      next: (data) => {
        this.storageService.saveToken(data.token);
        this.storageService.saveUserDetails(data);
        this._snackBar.open("Registro Completado" ,"Cerrar");
        this.toggleForm();
      },
      error: (error) => {
        this._snackBar.open("Error en el registro:" + error,"Cerrar");
      }
    });
  }
}
