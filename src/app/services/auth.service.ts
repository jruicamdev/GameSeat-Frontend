import { Injectable, inject } from '@angular/core';
import { AuthError, AuthProvider, UserCredential, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Auth, authState } from '@angular/fire/auth';


export interface UserDto {
  username: string;
  email: string;
  password: string;
}
export interface Credential {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);

  constructor() { }

  readonly authState$ = authState(this.auth);

  async signUpWithEmailAndPassword(credential: Credential): Promise<UserCredential | unknown> {
    try {
      return await createUserWithEmailAndPassword(
        this.auth,
        credential.email,
        credential.password
      );
    } catch (error) {
      const firebaseError = error as AuthError;
      // Return a structured error message
      return 'auth/invalid-email: ' + firebaseError;
    };

  }

  async logInWithEmailAndPassword(credential: Credential) : Promise<UserCredential| unknown>{
    try {
      return await signInWithEmailAndPassword(
        this.auth,
        credential.email,
        credential.password
      );
    } catch (error) {
      return await error;
    }
  }

  getAuth() {
    return getAuth();
  }

  logOut(): Promise<void> {
    return this.auth.signOut();
  }

  async callPopUp(provider: AuthProvider): Promise<UserCredential> {
    try {
      const result = await signInWithPopup(this.auth, provider);

      return result;
    } catch (error: any) {
      return error;
    }
  }

}
