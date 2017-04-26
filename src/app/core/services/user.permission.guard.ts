import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { PermissionType } from './../models'

@Injectable()
export class permissionGuard implements CanActivate {

  constructor(private authService: AuthenticationService) { }

  canActivate(): boolean {
    return this.authService.isAdmin();
  }
}