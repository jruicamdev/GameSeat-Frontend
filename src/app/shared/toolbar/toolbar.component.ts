import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatIcon, MatToolbar, RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  constructor(private _router: Router, private translate: TranslateService) { 
    translate.setDefaultLang(this.currentLanguage) 
  }
  currentLanguage = 'es';

  navigateToLogin() {
    this._router.navigateByUrl("/login");
  }
  navigateToHome() {
    this._router.navigateByUrl("/home");
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'en' ? 'es' : 'en';
    this.translate.use(this.currentLanguage);
  }
}
