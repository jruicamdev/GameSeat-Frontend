import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-success',
  template: `<p>Payment Successful! You will be redirected shortly...</p>`,
})
export class SuccessComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

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
