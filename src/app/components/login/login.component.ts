import { Message } from 'primeng/primeng';
import { UserService } from './../../core/services/user.service';
import { User, AuthEvent, PermissionType } from './../../core/models';
import { AuthenticationService } from './../../core/services/authentication.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('pass') passwordField;
  @ViewChild('user') usernameField;

  msgs: Message[] = [];
  newUser: User = new User();
  showUser: User = new User();
  inCreate: boolean = false;
  showInfo: boolean = false;
  showCreateButton: boolean = true;
  loggedIn: boolean;
  passwordConfirm: string;

  constructor(private auth: AuthenticationService, private userService: UserService) {
  }

  ngOnInit() {
    this.isLoggedIn();
  }

  onEnter(username: string, password: string): void {
    this.auth.login(username, password)
      .subscribe((object) => {
        this.showCreateButton = !object.success;
        this.loggedIn = object.success;
        if (!object.success) {
          this.msgs.push({ severity: 'error', summary: 'Login Failed!', detail: object.res.message });
          if (object.res.message.indexOf('Authentication failed. Wrong password.') != -1) {
            this.passwordField.nativeElement.value = '';
          } else {
            this.passwordField.nativeElement.value = '';
            this.usernameField.nativeElement.value = '';
          }
        }
      });
  }

  onCreate(): void {
    if (this.newUser.permissionLevel === PermissionType.USER) {
      this.newUser.approved = new Date();
    }

    this.userService.post(this.newUser)
      .subscribe((res) => {
        var body = res.json();
        this.inCreate = false;
        if (body.success == true) {
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Creation success!', detail: 'New user was successfully created, you will be able to login once approved (if User was selected you are automatically approved).' });
        } else {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Creation failed!', detail: body.message });
        }
        this.newUser = new User();
        this.passwordConfirm = null;
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
        this.showUser = this.auth.userInfo;
      }, (err) => {
        this.loggedIn = false;
      })
  }

  capitilise(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  getFormattedDate(): string {
    return new Date(this.showUser.created).toLocaleDateString();
  }

  isPasswordValid() {
    if (this.newUser.password) {
      return this.newUser.password.length >= 8
    } 

    return false;
  }

  isPasswordConfirmed(): boolean {
    return (this.passwordConfirm === this.newUser.password) && this.isPasswordValid();
  }

}
