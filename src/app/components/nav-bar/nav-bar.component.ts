import { AuthenticationService } from './../../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private auth: AuthenticationService) {
   }

  private loggedIn: boolean = false;

  ngOnInit() {
    this.isLoggedIn();
  }

  isLoggedIn() {
    this.auth.loggedInStatus()
    .subscribe((auth) => {
      this.loggedIn = auth.loggedIn;
    }, (err) => {
      this.loggedIn = false;
    })
  }

  logout() {
    this.auth.logout();
  }

}
