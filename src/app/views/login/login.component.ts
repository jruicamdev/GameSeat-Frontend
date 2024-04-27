import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';


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

  login(): void {
    this.authService.login(this.loginData.email, this.loginData.password).subscribe({
      next: (data) => {
        if(data == "password-incorrect"){
          this._snackBar.open("Contraseña Incorrecta" ,"Cerrar");
        }else{
          this.storageService.saveToken(data.token);
          this.storageService.saveUserDetails(data);
          this.router.navigate(["/reservations"]);
        }

      },
      error: (error) => {
        console.error('Login failed:', error);
      }
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
