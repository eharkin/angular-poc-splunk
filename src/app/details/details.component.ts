import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo"
        alt="Exterior photo of {{housingLocation?.name}}"/>
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{housingLocation?.availableUnits}}</li>
          <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
          <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName">

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName">

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email">
          <button type="submit" (click)=rageClickApply() class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {

  deadClick:number;
  errorClick:number;
  rageClick:number;
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor(private http: HttpClient) {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
    this.deadClick = 0;
    this.errorClick = 0;
    this.rageClick = 0;
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {
       this.deadClick++;
       sessionStorage.setItem("deadClick", this.deadClick.toString());
  }

  rageClickApply() {
    this.rageClick++;
    sessionStorage.setItem("rageClick", this.rageClick.toString());
  }

  callLogApiErrorClick() {    
    this.http.post(
      'http://localhost:8080/api/v1/pad/ui/log',
        {observe: 'response'}
    ).subscribe({
      error: (e) => {
        console.log(e.status);
        this.errorClick++;
        sessionStorage.setItem("errorClick", this.errorClick.toString());
      }
  })
  }

  submitApplication() {
    if(this.rageClick >= 5) {
      this.callLogApiErrorClick();
      if(this.errorClick > 0) {
        this.housingService.submitApplication("submit action", "ERROR");
      }
      this.housingService.submitApplication("submit action", "INFO");
    }
  }

  
  /*submitApplication() {
    this.housingService.submitApplication("submit action", "INFO");
  }*/
}
