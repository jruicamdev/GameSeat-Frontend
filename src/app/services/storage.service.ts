// storage.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: Storage;

  constructor() {
    this.storage = sessionStorage;
  }

  public saveToken(token: string): void {
    this.storage.setItem('jwtToken', token);
  }

  public getToken(): string | null {
    return this.storage.getItem('jwtToken');
  }

  public clearToken(): void {
    this.storage.removeItem('jwtToken');
  }

  // Optionally, store other user details
  public saveUserDetails(user: any): void {
    this.storage.setItem('userDetails', JSON.stringify(user));
  }

  public getUserDetails(): any {
    const userDetails = this.storage.getItem('userDetails');
    return userDetails ? JSON.parse(userDetails) : null;
  }

  public clearUserDetails(): void {
    this.storage.removeItem('userDetails');
  }

  public clearAll(): void {
    this.storage.clear();
  }
}
