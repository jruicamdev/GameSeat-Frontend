import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Chair } from 'src/app/models/chair';
import { ChairService } from 'src/app/services/chair.service';
import { TablesComponent } from "../../shared/tables/tables.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-reservations',
  standalone: true,
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss',
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterModule, TablesComponent, MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSidenavModule]
})
export class ReservationsComponent {

  chairs: Chair[] = [];
  form!: FormGroup;
  filterForm!: FormGroup;
  chairGroups: any[][] = [];
  selectedChair: Chair | null = null;
  minDate: Date;
  constructor(private chairService: ChairService, private fb: FormBuilder) {
    this.minDate = new Date();
   }

  ngOnInit(): void {
    this.chairService.getChairs().subscribe(data => {
      this.chairs = data; +
        this.createChairGroups();
      console.log(this.chairGroups);
    });
    this.chairService.selectedChair$.subscribe(chair => {
      this.selectedChair = chair;
      this.showChairDetails();
    });
    this.form = this.fb.group({
      date: [new Date()], 
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
    this.filterForm = this.fb.group({
      selectedDate: [new Date(), Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  private createChairGroups() {
    for (let i = 0; i < this.chairs.length; i += 8) {
      this.chairGroups.push(this.chairs.slice(i, i + 8));
    }
  }

  private showChairDetails() {
    console.log('Mostrando detalles de la silla:', this.selectedChair);
  }

  submit() {
    console.log(this.form.value);
  }

  close(){
    this.selectedChair = null;
  }

  applyFilters(){

  }


}
