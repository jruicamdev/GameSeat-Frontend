import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToolbarComponent } from 'src/app/shared/toolbar/toolbar.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
  standalone: true,
  imports: [TranslateModule,ToolbarComponent,MatSnackBarModule]
  }
)
export class SuccessComponent implements OnInit {
  constructor(private route: ActivatedRoute, private _snackBar : MatSnackBar,private translate : TranslateService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');

    // Llama a tu API para verificar el estado del pago
    this.http.post(`${environment.api_url}payments/verify-payment`, { sessionId }).subscribe
    (response => {
      setTimeout(() => {
        this.router.navigate(['/reservations']);
      }, 5000);
    }, error => {
      console.error('Error verifying payment:', error);
      // Manejar el error y mostrar un mensaje de error si es necesario
    });
  }
}
