import { PageNotFoundComponent } from './../../components/page-not-found/page-not-found.component';
import { UserService } from './user.service';
import { User, PermissionType } from './../models';
import { AuthEvent } from './../models/authEvent';
import { BackendService } from './backend.service';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

    private _permissionLevel: PermissionType;
    private currentUser: User;

    constructor(private backendService: BackendService) { }

    login(username: string, password: string): Observable<any> {
        let user = new User();
        user.username = username;
        user.password = password;
        return this.backendService.handleResponse(this.backendService.post('/authenticate', user))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let res = response.json();
                if (res && res.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    console.log('in auth service with token: ', res);
                    localStorage.setItem('authToken', JSON.stringify(res.token));
                    this.backendService.setToken(res.token);
                    this.getLoginInfo();
                    return {
                        success: true,
                        res: res
                    };
                } else {
                    console.log('in auth service w/o token: ', res);
                    return {
                        success: false,
                        res: res
                    };
                }
            });
    }

    logout() {
        this._permissionLevel = PermissionType.USER;
        this.backendService.logout();
    }

    loggedInStatus(): ReplaySubject<AuthEvent> {
        return this.backendService.getLoginCache();
    }

    getLoginInfo() {
        let body = { includePermission: true };
        this.backendService.post('/users/info', body)
            .subscribe((res) => {
                this.updateLoginCache(res);
            }, (err) => {
                console.log('Error in getLoginInfo: ', err);
                this.logout()
            });
    }

    updateLoginCache(res) {
        let body = JSON.parse(res._body);
        this.currentUser = body;

        if ((body.id !== '' || body.id !== null) && body.deleted !== true) {
            this._permissionLevel = body.permissionLevel;
            this.backendService.updateLoginCache({ loggedIn: true, permissionLevel: body.permissionLevel });
        } else {
            this._permissionLevel = PermissionType.USER;
            this.backendService.updateLoginCache({ loggedIn: false, permissionLevel: PermissionType.USER });
        }
    }

    get userInfo(): User {
        return this.currentUser ? this.currentUser : null;
    }

    isAdmin(): boolean {
        return this._permissionLevel ? this._permissionLevel === PermissionType.ADMIN : false;
    }

    isEditor(): boolean {
        return this._permissionLevel ? this._permissionLevel === PermissionType.EDITOR : false;
    }

    isUser(): boolean {
        return !this.isAdmin() && !this.isEditor();
    }

    getFullName(): string {
        if (this.currentUser) {
            let first = this.currentUser.firstName ? this.currentUser.firstName : null;
            let last = this.currentUser.lastName ? this.currentUser.lastName : null;

            return first + ' ' + last;
        }

        return null;
    }
}