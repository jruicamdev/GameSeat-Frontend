import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { Chair } from 'src/app/models/chair';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { ChairService } from 'src/app/services/chair.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatIcon,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule, MatOption, NgFor, MatFormFieldModule, 
    MatSelectModule,
    MatButtonModule,],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  maintenanceForm: FormGroup;
  availableForm: FormGroup;
  chairs: Chair[] = [];
  filteredChairs: Chair[] = []; // Lista filtrada
  priceForm: FormGroup;
  daysOfWeek: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

  constructor(
    private userService: UserService, private router: Router, private _snackBar: MatSnackBar,
    private authService: AuthService, private adminService: AdminService, private chairService: ChairService,
    private reservationService: ReservationService, private fb: FormBuilder
  ) {
    Chart.register(...registerables);
    this.maintenanceForm = this.fb.group({
      chairName: ['', Validators.required]
    });
    this.availableForm = this.fb.group({
      chairName: ['', Validators.required]
    });
    this.priceForm = this.fb.group({
      dayOfWeek: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }
  ngOnInit() {
    this.getChairs();
    this.isUserAdmin();
    this.createReservationsChart();
  }

  goBack() {
    this.router.navigate(['/reservations']);
  }

  private async isUserAdmin() {
    var isAdmin = await this.userService.isUserAdmin();
    if (!isAdmin) {
      this.router.navigate(['/reservations']);
      this._snackBar.open('No puedes acceder a esta pagina', "Cerrar", { duration: 3000 });
    }
  }

  downloadPdf(): void {
    this.adminService.downloadPaymentsPdf().subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'payments.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }



  createReservationsChart() {
    this.reservationService.getAllReservation().subscribe(data => {
      const ctx = document.getElementById('reservationsChart') as HTMLCanvasElement;

      // Procesar los datos recibidos para agrupar por mes
      const reservationsByMonth = this.groupByMonth(data);

      const labels = Object.keys(reservationsByMonth);
      const counts = Object.values(reservationsByMonth);

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Reservas',
            data: counts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }

  groupByMonth(data: any[]): { [key: string]: number } {
    return data.reduce((acc, reservation) => {
      const date = new Date(reservation.createdAt);
      const month = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month]++;
      return acc;
    }, {});
  }

  logout() {
    this.authService.logOut();
  }

  //Cambia a MAINTENANCE EL ESTADO DE UNA SILLA
  submitMaintenanceForm() {
    if (this.maintenanceForm.valid) {
      const chairName = this.maintenanceForm.get('chairName')!.value;
      const chair = this.chairs.find(c => c.description === chairName);

      if (chair) {
        this.chairService.updateChairStatus(chair.id, true).subscribe(
          () => {
            this._snackBar.open(`Silla ${{ chairName }} puesta en mantenimiento`, "Cerrar", { duration: 3000 });
            // Manejar el éxito de la actualización, como mostrar un mensaje o redirigir
          },
          error => {
            console.error('Error updating chair status', error);
            // Manejar el error, como mostrar un mensaje al usuario
          }
        );
      } else {
        console.error('Chair not found');
        // Manejar el caso cuando la silla no se encuentra
      }
    }
  }

  //Cambia a AVAILABLE EL ESTADO DE UNA SILLA
  submitAvailableForm() {
    if (this.availableForm.valid) {
      const chairName = this.availableForm.get('chairName')!.value;
      const chair = this.chairs.find(c => c.description === chairName);

      if (chair) {
        this.chairService.updateChairStatus(chair.id, false).subscribe(
          () => {
            this._snackBar.open(`Silla ${{ chairName }} disponible`, "Cerrar", { duration: 3000 });
            // Manejar el éxito de la actualización, como mostrar un mensaje o redirigir
          },
          error => {
            console.error('Error updating chair status', error);
            // Manejar el error, como mostrar un mensaje al usuario
          }
        );
      } else {
        console.error('Chair not found');
        // Manejar el caso cuando la silla no se encuentra
      }
    }
  }

  getChairs() {
    this.chairService.getChairs().subscribe((chairs: Chair[]) => {
      this.chairs = chairs;
      this.filteredChairs = chairs; // Inicializar la lista filtrada
    });
  }

  filterMyOptions(event: MatSelectChange) {
    this.maintenanceForm.patchValue({ chairName: event.value });
  }

  submitPriceForm() {
    if (this.priceForm.valid) {
      const dayOfWeek = this.priceForm.get('dayOfWeek')!.value;
      const price = this.priceForm.get('price')!.value;

      this.adminService.updatePriceForDay(dayOfWeek, price).subscribe(
        () => {
          this._snackBar.open('Precio Actualizado', "Cerrar", { duration: 3000 });
          // Manejar el éxito de la actualización, como mostrar un mensaje o redirigir
        },
        error => {
          this._snackBar.open('Error al actualizar el precio', "Cerrar", { duration: 3000 });
          // Manejar el error, como mostrar un mensaje al usuario
        }
      );
    }
  }
}


