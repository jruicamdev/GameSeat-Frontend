import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { AuthService, Credential, UserDto } from 'src/app/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ToolbarComponent } from 'src/app/shared/toolbar/toolbar.component';
import { UserService } from 'src/app/services/user.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';

export interface LogInForm {
  email: FormControl<string>;
  password: FormControl<string>;
}
export interface SignUpForm {
  userName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    NgIf,
    MatSnackBarModule,
    ToolbarComponent,
    TranslateModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('flipState', [
      state('default', style({
        transform: 'rotateY(0deg)'
      })),
      state('flipped', style({
        transform: 'rotateY(180deg)'
      })),
      transition('default => flipped', animate('500ms ease-out')),
      transition('flipped => default', animate('500ms ease-in'))
    ])
  ]
})
export class LoginComponent {
  formBuilder = inject(FormBuilder);
  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private translate: TranslateService
  ) { }
  showLogin = true;
  hide = true;

  signUpForm: FormGroup<SignUpForm> = this.formBuilder.group({
    userName: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true,
    }),
  });

  logInForm: FormGroup<LogInForm> = this.formBuilder.group({
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  toggleForm() {
    this.showLogin = !this.showLogin;
  }

  get flipState(): string {
    return this.showLogin ? 'default' : 'flipped';
  }

  async signUp(): Promise<void> {
    if (this.signUpForm.invalid) return;

    const credential: Credential = {
      email: this.signUpForm.value.email || '',
      password: this.signUpForm.value.password || '',
    };

    try {
      await this.authService.signUpWithEmailAndPassword(credential);

      const snackBarRef = this._snackBar.open("");

      const userDto: UserDto = {
        username: this.signUpForm.value.userName!,
        email: this.signUpForm.value.email!,
        password: this.signUpForm.value.password!
      };
      if (userDto.username == undefined || userDto.email == undefined || userDto.password == undefined) {
        return;
      }
      await this.userService.createUserAPI(userDto);
      this.translate.get('SNACKBARS.SIGNUP_SUCCESS').subscribe((translatedMessage: string) => {
        this._snackBar.open(translatedMessage, this.translate.instant('SNACKBARS.CLOSE'), { duration: 3000 });
      });
      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigateByUrl('/reservations');
      });
    } catch (error) {
      this.translate.get('SNACKBARS.INVALID_REGISTRATION').subscribe((translatedMessage: string) => {
        this._snackBar.open(translatedMessage, this.translate.instant('SNACKBARS.CLOSE'), {
          duration: 2500,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      });
    }
  }

  async logIn(): Promise<void> {
    if (this.logInForm.invalid) return;

    const credential: Credential = {
      email: this.logInForm.value.email || '',
      password: this.logInForm.value.password || '',
    };

    try {
      const user = await this.authService.logInWithEmailAndPassword(credential);
      // Verificar si la autenticación fue realmente exitosa y el objeto usuario es válido
      if (user) {
        // Snackbar de éxito
        this.translate.get('SNACKBARS.LOGIN_SUCCESS').subscribe((translatedMessage: string) => {
          this._snackBar.open(translatedMessage, this.translate.instant('SNACKBARS.CLOSE'), {
            duration: 3000
          });
        });

        this.router.navigateByUrl('/reservations');
      } else {
        // Si no hay un objeto de usuario, asumir falla en el inicio de sesión
        this.translate.get('SNACKBARS.LOGIN_FAILED').subscribe((translatedMessage: string) => {
          this._snackBar.open(translatedMessage, this.translate.instant('SNACKBARS.CLOSE'), {
            duration: 3000
          });
        });
      }
    } catch (error) {
      console.error(error);
      // Snackbar de error
      this.translate.get('SNACKBARS.LOGIN_ERROR').subscribe((translatedMessage: string) => {
        this._snackBar.open(translatedMessage, this.translate.instant('SNACKBARS.CLOSE'), {
          duration: 3000
        });
      });
    }
  }

  isEmailValidSignUp(): string | boolean {
    const control = this.signUpForm.get('email');

    const isInvalid = control?.invalid && control.touched;

    if (isInvalid) {
      return control?.hasError('required')
        ? this.translate.instant('SNACKBARS.FIELD_REQUIRED')
        : this.translate.instant('SNACKBARS.ENTER_VALID_EMAIL');
    }

    return false;
  }

  isEmailValidLogIn(): string | boolean {
    const control = this.logInForm.get('email');

    const isInvalid = control?.invalid && control.touched;

    if (isInvalid) {
      return control?.hasError('required')
        ? this.translate.instant('SNACKBARS.FIELD_REQUIRED')
        : this.translate.instant('SNACKBARS.ENTER_VALID_EMAIL');
    }

    return false;
  }
}
