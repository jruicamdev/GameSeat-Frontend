import { Component, Input, OnInit } from '@angular/core';
import { Chair } from 'src/app/models/chair';
import { ChairComponent } from '../chair/chair.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [ChairComponent, CommonModule],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.scss'
})
export class TablesComponent implements OnInit{
  @Input()chairs!: Chair[];

  leftSideChairs: Chair[] = [];
  rightSideChairs: Chair[] = [];

  ngOnInit(){
    this.divideChairs();
  }

  private divideChairs() {
    this.leftSideChairs = this.chairs.slice(0, 4);
    this.rightSideChairs = this.chairs.length > 4 ? this.chairs.slice(4, 8) : [];
  }

}
