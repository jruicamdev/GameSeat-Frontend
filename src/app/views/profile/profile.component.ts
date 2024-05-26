import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription, interval } from 'rxjs';
import { PaymentsService } from 'src/app/services/payments.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatIcon, MatButton, NgFor, MatExpansionModule, NgIf, MatPaginator, DatePipe, CommonModule, MatButtonModule,TranslateModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentLanguage = 'es';
  reservations: Reservation[] = [];
  dataSource = new MatTableDataSource<Reservation>();
  panelOpenState = false;
  images: string[] = [];
  imageSrc: string = '';
  selectedImage: string | null = null;
  countdowns: { [key: number]: number } = {};
  countdownSubscriptions: { [key: number]: Subscription } = {};

  constructor(
    private _router: Router,
    private userService: UserService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private reservationService: ReservationService,
    private paymentService: PaymentsService,
    private translate : TranslateService
  ) { 
    this.translate.setDefaultLang(this.currentLanguage);
  }

  ngOnInit(): void {
    this.getUserProfileImage();
    this.getAllProfileImages();
    this.getReservationForUser();
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'en' ? 'es' : 'en';
    this.translate.use(this.currentLanguage);
  }

  ngOnDestroy(): void {
    // Limpiar suscripciones al destruir el componente
    for (let sub of Object.values(this.countdownSubscriptions)) {
      sub.unsubscribe();
    }
  }

  goBack() {
    this._router.navigate(['/reservations']);
  }

  async getUserProfileImage() {
    console.log('Antes');
    this.imageSrc = await this.userService.getUserImage();
    console.log(this.imageSrc + 'Despues');
  }

  getAllProfileImages() {
    this.images = this.userService.getAllProfileImages();
  }

  selectImage(image: string) {
    this.selectedImage = image;
    console.log('Selected Image:', this.selectedImage);
  }

  sendSelectedImage() {
    if (this.selectedImage) {
      console.log('Imagen seleccionada:', this.selectedImage);
      this.openConfirmationDialog();
    } else {
      console.log('No se ha seleccionado ninguna imagen');
    }
  }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmSendSelectedImage();
      }
    });
  }

  async confirmSendSelectedImage() {
    if (this.selectedImage) {
      console.log('Imagen seleccionada:', this.selectedImage);

      const user = this.userService.getUserProperties();
      const userApi = await this.userService.getUserAPI(user?.email);

      // Extraer el índice de la imagen de la ruta
      const imageIndex = this.extractImageIndex(this.selectedImage);

      if (imageIndex !== -1) {
        console.log(imageIndex);
        this.updateImage(userApi.id, imageIndex);
      } else {
        console.error('Índice de imagen no válido');
      }
    } else {
      console.log('No se ha seleccionado ninguna imagen');
    }
  }

  private extractImageIndex(image: string): number {
    const regex = /profile-(\d+)\.png/;
    const match = image.match(regex);
    return match ? parseInt(match[1], 10) : -1;
  }

  private updateImage(userId: number, image: number): void {
    console.log('Private' + image);
    this.userService.updateUserImage(userId, image).subscribe(
      response => {
        this.getUserProfileImage();
        this._snackBar.open('Imagen Actualizada', 'Cerrar', { duration: 3000 });
      },
      error => {
        console.log(image);
        console.error('Error updating image', error);
      }
    );
  }

  // GetReservationsByUser
  async getReservationForUser() {
    const firebaseUser = this.userService.getUserProperties();
    const user = await this.userService.getUserAPI(firebaseUser?.email);
    this.reservationService.getReservationByUserId(user.id).subscribe(
      data => {
        this.reservations = data;
        this.dataSource.data = this.reservations;
        console.log('Reservations loaded:', this.reservations);
      },
      error => {
        console.error('Error al obtener las reservas', error);
      }
    );
  }

  getStripeURL(totalAmount: number | undefined, reservationId : number) {
    if (totalAmount == undefined) {
      throw console.error("totalAmount.empty");
    }
    this.paymentService.getStripeURL(totalAmount,reservationId ).subscribe(response => {
      console.log(response)
      if (response && response.url) {
        window.open(response.url); // Abre la URL de Stripe en una nueva pestaña
      } else {
        console.error('No se pudo obtener la URL de pago.');
      }
    }, error => {
      console.error('Error al crear la sesión de pago:', error);
    });
  }
}
