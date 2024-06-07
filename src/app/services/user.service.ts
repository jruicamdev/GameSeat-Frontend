import { Injectable, inject } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user';
import { UserDto } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrimaryExpression } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  async createUserAPI(userDto: UserDto) {
    try {
      const result = await this.http.post<any>(`${environment.api_url}users/register`, userDto).toPromise();
      return result;
    } catch (error) {
      throw error;
    }
  }

  getUserProperties() {
    const auth = getAuth();
    const user = auth.currentUser;
    return user;
  }

  async getUserAPI(email: string | null | undefined): Promise<User> {
    try {
      if (email == undefined || email == null) {
        throw 'Error on email finding';
      }
      const user = await this.http.get<any>(`${environment.api_url}users/${email}`).toPromise();
      return user;
    } catch (error) {
      throw error;
    }
  }

  updateUserImage(id: number, imageIndex: number): Observable<any> {
    const url = `${environment.api_url}users/image/${id}`;
    return this.http.put(url, imageIndex);
  }

  async getUserImage() {
    const user = this.getUserProperties();
    const userAPI = await this.getUserAPI(user?.email);
    return this.setImageUrl(userAPI.image);;
  }

  private setImageUrl(imageNumber: number): string {
    const imageUrls = [
      '',
      'assets/img/profile/profile-1.png',
      'assets/img/profile/profile-2.png',
      'assets/img/profile/profile-3.png',
      'assets/img/profile/profile-4.png',
      'assets/img/profile/profile-5.png',
      'assets/img/profile/profile-6.png',
      'assets/img/profile/profile-7.png',
      'assets/img/profile/profile-8.png',
    ];
    if (imageNumber > 0 && imageNumber < imageUrls.length) {
      return imageUrls[imageNumber];
    } else {
      return imageUrls[1];
    }
  }
  private basePath = '/assets/img/profile/';
  private imageNames = [
    'profile-1.png',
    'profile-2.png',
    'profile-3.png',
    'profile-4.png',
    'profile-5.png',
    'profile-6.png',
    'profile-7.png',
    'profile-8.png'
  ];
  getAllProfileImages(): string[] {
    return this.imageNames.map(name => this.basePath + name);
  }

  async isUserAdmin(): Promise<boolean> {
    const user = this.getUserProperties();
    if (user?.email) {
      const headers = new HttpHeaders({
        'email': user.email
      });

      try {
        const isAdmin = await this.http.get<boolean>(`${environment.api_url}users/admin`, { headers }).toPromise();
        return isAdmin!;
      } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
      }
    }
    return false;
  }

}
