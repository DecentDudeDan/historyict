import { AuthenticationService } from './../../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { PermissionType } from '../../core/models';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private auth: AuthenticationService) {
   }

  loggedIn: boolean = false;
  permissionLevel: PermissionType = PermissionType.USER;

  ngOnInit() {
    this.isLoggedIn();
  }

  isLoggedIn() {
    this.auth.loggedInStatus()
    .subscribe((auth) => {
      this.loggedIn = auth.loggedIn;
      this.permissionLevel = auth.permissionLevel;
    }, (err) => {
      this.loggedIn = false;
      this.permissionLevel = PermissionType.USER;
    })
  }

  logout() {
    this.auth.logout();
  }

  hasAdminPermission(): boolean {
    return this.permissionLevel === PermissionType.ADMIN ? true : false;
  }
}
