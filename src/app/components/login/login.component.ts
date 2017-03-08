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
  inCreate: boolean = false;
  loggedIn: boolean;

  ngOnInit() {
  }

  onEnter(username: string, password: string): void {
    this.auth.login(username, password)
    .subscribe((bool) => {
      this.isLoggedIn();
    });
  }

  onCreate(): void {
    this.userService.post(this.newUser)
    .subscribe((res) => {
      console.log(res);
    });
  }

  showCreate(): void {
    this.inCreate = true;
  }

  isLoggedIn(): void {
    this.auth.loggedInStatus().subscribe((auth) => {
      console.log('setting status', auth);
      this.loggedIn = auth.loggedIn;
    });
  }

  showUserInfo(): void {
    this.auth.getLoginInfo()
    .subscribe((res) => {
      console.log(res);
    })
  }
}
