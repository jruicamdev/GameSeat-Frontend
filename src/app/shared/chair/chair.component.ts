import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Chair } from 'src/app/models/chair';
import { ChairService } from 'src/app/services/chair.service';

@Component({
  selector: 'app-chair',
  standalone: true,
  imports: [CommonModule, MatButton],
  templateUrl: './chair.component.html',
  styleUrl: './chair.component.scss'
})
export class ChairComponent {
  @Input() chair!: Chair;
  @Input() rotate!: boolean;
  @Input() isActive!: string;

  constructor(private chairService: ChairService,private _snackBar: MatSnackBar) { }

  selectChair() {
    if (this.chair.status == 'maintenance') {
      this._snackBar.open("Lo sentimos, silla en mantenimiento", "Cerrar");
    } else {
      this.chairService.selectChair(this.chair);
    }
    console.log(this.chair);
  }
}
