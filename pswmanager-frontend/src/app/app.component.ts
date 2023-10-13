import { Component } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private jwtHelper: JwtHelperService) {
  }
  get isLoggedIn(): boolean {
    const token = localStorage.getItem('jwtToken'); // Retrieve your JWT token
    return !this.jwtHelper.isTokenExpired(token);
  }
}
