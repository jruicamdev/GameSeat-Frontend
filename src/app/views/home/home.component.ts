import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { ToolbarComponent } from 'src/app/shared/toolbar/toolbar.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,MatToolbarModule,MatIconModule,MatButtonModule,ToolbarComponent,TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router) {}


  navigateToLogin() {
    this.router.navigate(['/login']);
  }

}
