import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToolbarComponent } from 'src/app/shared/toolbar/toolbar.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-canceled',
  templateUrl: './canceled.component.html',
  styleUrl : './canceled.component.scss',
  standalone: true,
  imports: [TranslateModule,ToolbarComponent]
})
export class CanceledComponent implements OnInit {
  constructor(private router: Router,private route: ActivatedRoute, private _snackBar : MatSnackBar
    ,private translate : TranslateService, private http: HttpClient) {}
  ngOnInit() {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');

    // Llama a tu API para verificar el estado del pago
    this.http.post(`${environment.api_url}payments/verify-payment`, { sessionId }).subscribe
    (response => {
      this.translate.get('SNACKBARS.PAYMENT-FAILED').subscribe((translatedMessage: string) => {
        this._snackBar.open(translatedMessage, this.translate.instant('PAYMENT.SUCCESS.BUTTON'), { duration: 3000 });
      });
      setTimeout(() => {
        this.router.navigate(['/reservations']);
      }, 5000);
    }, error => {
      console.error('Error verifying payment:', error);
      // Manejar el error y mostrar un mensaje de error si es necesario
    });
  }
}
