import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule,MatToolbarModule,MatIconModule,MatButtonModule,RouterModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent {

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private _snackBar: MatSnackBar,
    private router : Router
  ) {}
  logout(){
    this.authService.logout();
    this.router.navigate(["/home"]);
  }
}
