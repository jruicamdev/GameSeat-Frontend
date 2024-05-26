import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TranslateModule } from '@ngx-translate/core';
import { ToolbarComponent } from 'src/app/shared/toolbar/toolbar.component';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
  standalone: true,
  imports: [TranslateModule,ToolbarComponent]
  }
)
export class SuccessComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');
    console.log(sessionId);

    // Llama a tu API para verificar el estado del pago
    this.http.post(`${environment.api_url}payments/verify-payment`, { sessionId }).subscribe(response => {
      // Manejar la respuesta y redirigir si es necesario
      console.log('Payment verification response:', response);
      // Redirigir a la página principal o mostrar un mensaje de éxito
    }, error => {
      console.error('Error verifying payment:', error);
      // Manejar el error y mostrar un mensaje de error si es necesario
    });
  }
}
