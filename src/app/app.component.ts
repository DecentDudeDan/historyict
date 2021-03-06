import { User } from './core/models/user';
import { UserService } from './core/services/user.service';
import { AuthenticationService } from './core/services/authentication.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn: boolean;

  constructor(private auth: AuthenticationService) {
    if (localStorage.getItem('authToken')) {
      this.auth.getLoginInfo();
    }
  }
}
