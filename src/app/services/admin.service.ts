import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  downloadPaymentsPdf(): Observable<Blob> {
    return this.http.get(`${environment.api_url}payments/download`, { responseType: 'blob' }).pipe(
      map((res: Blob) => {
        return new Blob([res], { type: 'application/pdf' });
      })
    );
  }

  updatePriceForDay(dayOfWeek: string, price: number): Observable<void> {
    const url = `${environment.api_url}establishmentHour/update-price`;
    const body = { dayOfWeek, price };
    return this.http.put<void>(url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
