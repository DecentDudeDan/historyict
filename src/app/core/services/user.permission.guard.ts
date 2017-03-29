import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';

@Injectable()
export class canLoadWithPermissions implements CanLoad {

  constructor(private authService: AuthenticationService) {}

  canLoad() {
    return this.authService.loggedInStatus();
  }
}