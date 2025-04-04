import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    RouterLink,
    RouterOutlet,
  ],
  template: `
    <main>
      <a [routerLink]="['/']">
        <header class="brand-name">
          <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
        </header>
      </a>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit  {
  ngOnInit(): void {
    var textArray = [
      'test user',
      'test user1',
      'test user2',
      'test user3',
      'test user4'
    ];
  var randomNumber = Math.floor(Math.random()*textArray.length);
  sessionStorage.setItem("id", uuidv4());
  sessionStorage.setItem("usrId", textArray[randomNumber]);
  }
  title = 'homes';
}
