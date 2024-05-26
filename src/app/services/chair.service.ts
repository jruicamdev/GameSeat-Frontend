import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Chair } from '../models/chair';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ChairService {

  private selectedChairSource = new BehaviorSubject<Chair | null>(null);
  selectedChair$ = this.selectedChairSource.asObservable();
  constructor(private http: HttpClient) { }

  getChairs(): Observable<Chair[]> {
    return this.http.get<Chair[]>(`${environment.api_url}chairs`); 
  }

  selectChair(chair: Chair) {
    this.selectedChairSource.next(chair);
  }

  getReservedChairs(){
    this.http.get<Chair[]>(`${environment.api_url}`)
  }

  updateChairStatus(id: number, isMaintenance: boolean): Observable<void> {
    const url = `${environment.api_url}chairs/${id}/status`;
    return this.http.put<void>(url, isMaintenance, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
