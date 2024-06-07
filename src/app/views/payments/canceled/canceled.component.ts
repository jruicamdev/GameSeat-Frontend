import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToolbarComponent } from 'src/app/shared/toolbar/toolbar.component';

@Component({
  selector: 'app-canceled',
  templateUrl: './canceled.component.html',
  styleUrl : './canceled.component.scss',
  standalone: true,
  imports: [TranslateModule,ToolbarComponent]
})
export class CanceledComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    // Redirige a la ruta específica después de 5 segundos
    setTimeout(() => {
      this.router.navigate(['/reservations']);
    }, 5000);
  }
}
