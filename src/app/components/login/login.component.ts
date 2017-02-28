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

  constructor(private auth: AuthenticationService, private userService: UserService) { }

  newUser: User = new User();
  inCreate: boolean = false;
  loggedIn: boolean = false;

  ngOnInit() {
  }

  onEnter(username: string, password: string): void {
    this.auth.login(username, password)
    .subscribe((resp) => {
      console.log(resp);
    }),
    (err) => {
      console.log(err);
    }
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

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  showUserInfo(): void {
    this.userService.getUserInfo()
    .subscribe(() => {
      console.log('getting info');
    })
  }
}
