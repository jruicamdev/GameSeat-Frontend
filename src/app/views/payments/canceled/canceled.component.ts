import { Component } from '@angular/core';
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
export class CanceledComponent {
  constructor(private router: Router) {}
  navigateToReservations() {
    this.router.navigate(['/reservations']);
  }
}
