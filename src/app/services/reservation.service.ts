import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { environment } from 'src/environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';
import { user } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  getAllReservation(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${environment.api_url}reservations`);
  }

  getReservationsByDate(date: Date, startTime: string, endTime: string): Observable<Reservation[]> {
    if (!date) {
      throw new Error('Invalid date provided');
    }
    const localDate = date.getFullYear() + '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
      ('0' + date.getDate()).slice(-2);
    const params = new HttpParams()
      .set('date', localDate) // YYYY-MM-DD
      .set('startTime', startTime)
      .set('endTime', endTime);


    return this.http.get<Reservation[]>(`${environment.api_url}reservations/date/`, { params }).pipe(
      catchError(error => {
        if (error.includes('chair.reserved')) {
          return throwError(() => new Error('chair.reserved'));
        } else {
          return throwError(() => new Error('An unexpected error occurred'));
        }
      })
    );
  }

  createReservation(reservation: Reservation): Observable<any> {
    return this.http.post(`${environment.api_url}reservations`, reservation);
  }

  getReservationByUserId(userId: number): Observable<any> {
    return this.http.get(`${environment.api_url}reservations/by/${userId}`);
  }

  cancelReservation(reservationId: number, status: number): Observable<any> {
    return this.http.post<any>(`${environment.api_url}reservations/cancel-or-confirm/${reservationId}`, status, { observe: 'body' });
  }
}
