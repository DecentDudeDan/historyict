import { Message } from 'primeng/primeng';
import { UserService } from './../../core/services/user.service';
import { User, AuthEvent, PermissionType } from './../../core/models';
import { AuthenticationService } from './../../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthenticationService, private userService: UserService) {
   }

  msgs: Message[] = [];
  newUser: User = new User();
  showUser: User = new User();
  inCreate: boolean = false;
  showInfo: boolean = false;
  showCreateButton: boolean = true;
  loggedIn: boolean;

  ngOnInit() {
    this.isLoggedIn();
  }

  onEnter(username: string, password: string): void {
    this.auth.login(username, password)
    .subscribe((bool) => {
      this.showCreateButton = !bool;
      this.loggedIn = bool;
    });
  }

  onCreate(): void {
    if (this.auth.permissionLevel === PermissionType.ADMIN || this.newUser.permissionLevel === PermissionType.USER) {
      this.newUser.approved = new Date();
    }
    
    this.userService.post(this.newUser)
    .subscribe((res) => {
      console.log(res);
      this.inCreate = false;
      this.showCreateButton = false;
      this.msgs = [];
      this.msgs.push({severity: 'success', summary: 'Creation success!', detail: 'New user was successfully created, please log in now.'});
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

}
