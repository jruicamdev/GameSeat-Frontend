import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? "" : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(environment.api_url + "users/login", { username, password })
      .pipe(map(response => {
        const token  = response.tokenString;
        if(token == ""){
          return "password-incorrect";
        }else{
          localStorage.setItem('currentUser', JSON.stringify(token));
          this.currentUserSubject.next(token);
          return token;
        }
      }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(environment.api_url+ "users/register", { username, email, password });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
