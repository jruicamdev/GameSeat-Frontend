import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { Chair } from 'src/app/models/chair';
import { ChairService } from 'src/app/services/chair.service';
import { TablesComponent } from "../../shared/tables/tables.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/models/reservation';
import { User } from 'src/app/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-reservations',
  standalone: true,
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss',
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterModule, TablesComponent, MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSidenavModule,
    ConfirmationDialogComponent,
    TranslateModule
  ],
})
export class ReservationsComponent {

  chairs: Chair[] = [];
  isAdmin: boolean | undefined;
  form!: FormGroup;
  filterForm!: FormGroup;
  chairGroups: any[][] = [];
  selectedChair: Chair | null = null;
  minDate: Date;
  profileImage: string = '';
  currentLanguage = 'es';


  constructor(private chairService: ChairService, private _snackBar: MatSnackBar,
     private reservationService: ReservationService, private fb: FormBuilder, 
     private authService: AuthService, private translateService : TranslateService, 
     private userService: UserService, private router: Router,) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    translateService.setDefaultLang(this.currentLanguage) 
  }

  ngOnInit(): void {
    this.getImage();
    this.isUserAdmin();
    this.chairService.getChairs().subscribe(data => {
      this.chairs = data.map(chair => ({
        ...chair,
        reserved: chair.reserved !== undefined ? chair.reserved : true // Usa el valor existente o asigna true si está indefinido
      }));
      this.createChairGroups();
    });
    this.chairService.selectedChair$.subscribe(chair => {
      this.selectedChair = chair;
    });
    this.form = this.fb.group({
      date: [new Date()],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
    this.filterForm = this.fb.group({
      selectedDate: [new Date(), Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  private async getImage() {
    this.profileImage = await this.userService.getUserImage();
  }

  private async isUserAdmin() {
    this.isAdmin = await this.userService.isUserAdmin();
  }
  private createChairGroups() {
    for (let i = 0; i < this.chairs.length; i += 8) {
      this.chairGroups.push(this.chairs.slice(i, i + 8));
    }
  }

  submit() {
    const formValues = this.filterForm.value;
    this.reservationService.getReservationsByDate(formValues.selectedDate, formValues.startTime, formValues.endTime)
      .subscribe(reservations => {
        this.updateChairStatus(reservations);
        console.log(reservations);
      }, error => {
        console.error('Error: ' + error);
      });
  }

  private updateChairStatus(reservations: Reservation[]) {
    const reservedChairIds = reservations.map(res => res.chairId);
    this.chairs = this.chairs.map(chair => ({
      ...chair,
      reserved: !reservedChairIds.includes(chair.id) // Actualiza según la disponibilidad
    }));
    // Reinicia los grupos para forzar un re-render
    this.chairGroups = [];
    this.createChairGroups();
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'en' ? 'es' : 'en';
    this.translateService.use(this.currentLanguage);
  }

  close() {
    this.selectedChair = null;
  }

  async submitReserve() {
    if (this.form.valid) {
      if (this.form.value.startTime !== this.form.value.endTime) {
        const userEmail = this.userService.getUserProperties()?.email;
        const user: User = await this.userService.getUserAPI(userEmail);
        const date = new Date(this.form.value.date); // Asegúrate de que this.form.value.date es una fecha válida

        // Formatear startTime y endTime como cadenas "HH:mm"
        const formattedStartTime = `${this.form.value.startTime}:00`; // Asegúrate de que el formato sea "HH:mm:ss"
        const formattedEndTime = `${this.form.value.endTime}:00`; // Asegúrate de que el formato sea "HH:mm:ss"
        const offset = date.getTimezoneOffset() * 60000; // offset en milisegundos
        const localISOTime = (new Date(date.getTime() - offset)).toISOString().split('T')[0];

        const reservationData: Reservation = {
          id: 0,
          userId: user.id,
          chairId: this.selectedChair?.id || 0,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          date: localISOTime,
          status: 'Pending'
        };
        console.log(reservationData);
        this.reservationService.createReservation(reservationData).subscribe({
          next: (response) => {
            this._snackBar.open('Reservation created successfully', "Cerrar", { duration: 3000 });
          },
          error: (error) => {
            console.log(error);
            if (error.error && typeof error.error === 'string' && error.error.includes('chair.reserved')) {
              this._snackBar.open('Esta silla ya esta reservada a esta hora', "Cerrar", { duration: 3000 });
            } else {
              this._snackBar.open('Error creating reservation', "Cerrar", { duration: 3000 });
            }
          }
        });
      } else {
        this._snackBar.open("La hora de comienzo y final no pueden ser iguales", "Cerrar", { duration: 3000 })
      }
    } else {
      this._snackBar.open('Formulario no valido', "Cerrar", { duration: 3000 });
    }
  }

  logout() {
    this.authService.logOut();
  }
  navigateToProfile() {
    this.router.navigate(['/profile']);
  }
  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }

}
