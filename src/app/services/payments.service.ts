import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentModel } from '../models/payment';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient) { }

  getStripeURL(totalAmount: number, reservationId: number): Observable<any> {
    return this.http.post(`${environment.api_url}payments/create-payment`, { TotalAmount: totalAmount, reservationId });
  }

}
