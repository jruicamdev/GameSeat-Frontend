import { NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [NgIf],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom

})
export class SpinnerComponent {
  loading: boolean = false;

  constructor(public loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.loading$.subscribe(isLoading => {
      this.loading = isLoading;
    });
  }
}
