import { UserService } from './../../core/services/user.service';
import { User } from './../../core/models/user';
import { AuthenticationService } from './../../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthenticationService, private userService: UserService) {
    this.isLoggedIn();
   }

  newUser: User = new User();
  showUser: User;
  inCreate: boolean = false;
  showInfo: boolean = false;
  showCreateButton: boolean = true;
  loggedIn: boolean;

  ngOnInit() {
  }

  onEnter(username: string, password: string): void {
    this.auth.login(username, password)
    .subscribe((bool) => {
      this.showCreateButton = !bool;
      this.loggedIn = bool;
    });
  }

  onCreate(): void {
    this.userService.post(this.newUser)
    .subscribe((res) => {
      console.log(res);
      this.inCreate = false;
      this.showCreateButton = false;
    });
  }

  showCreate(): void {
    this.inCreate = true;
  }
  
  isLoggedIn() {
    this.auth.loggedInStatus()
    .subscribe((auth) => {
      this.showCreateButton = !auth.loggedIn;
      this.loggedIn = auth.loggedIn;
    }, (err) => {
      this.loggedIn = false;
    })
  }

  showUserInfo(): void {
    this.auth.loggedInStatus()
    .subscribe((auth) => {
      this.showInfo = auth.loggedIn;
    })
  }
}
