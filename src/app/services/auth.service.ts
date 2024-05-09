import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Observer, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? "" : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(codedUser: string): Observable<any> {
    return this.http.post(`${environment.api_url}users/login`, null, {
      headers: new HttpHeaders({
        Authorization: `Basic ${codedUser}`,
        NO_HTTP_INTERCEPTOR: "true"
      }),
    });
  }

  isValidToken(): Observable<boolean> {
    return this.http.get<boolean>(`${environment.api_url}token/valid`);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(environment.api_url+ "users/register", { username, email, password });
  }

  isAuthenticated(): Observable<boolean> {

    const userString = localStorage.getItem("user");
    const user: Token = userString ? JSON.parse(userString) : "";

    if (user) {
      return new Observable((observer: Observer<boolean>) => {
        this.isValidToken().subscribe({
          next: (isValid: boolean) => {
            if (!isValid) {
              this.logout();
            }
            else {
              observer.next(true);
            }
          },
          error: () => {
            this.logout();
            observer.next(false);
          }
        });
      });
    } else {
      this.logout();
      return of(false);
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
}
