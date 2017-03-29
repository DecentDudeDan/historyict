import { PageNotFoundComponent } from './../../components/page-not-found/page-not-found.component';
import { UserService } from './user.service';
import { User } from './../models/user';
import { AuthEvent } from './../models/authEvent';
import { BackendService } from './backend.service';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

    constructor(private backendService: BackendService) {}

    login(username: string, password: string): Observable<boolean> {
        let user = new User();
        user.username = username;
        user.password = password;
        return this.backendService.post('/authenticate', user)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let res = response.json();
                console.log('in auth service, res:', res);
                if (res && res.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    let auth: AuthEvent = {
                        loggedIn: true
                    };
                    this.backendService.updateLoginCache(auth);
                    localStorage.setItem('authToken', JSON.stringify(res.token));
                    this.backendService.setToken(res.token);
                    return true;
                } else {
                    return false;
                }
            });
    }

    clearLoginInfo() {
        let logoutAuth: AuthEvent = {
            loggedIn: false
        }
        this.backendService.updateLoginCache(logoutAuth);
        this.backendService.clearLoginInfo();
    }

    logout() {
        this.backendService.logout();
    }

    loggedInStatus(): ReplaySubject<AuthEvent> {
        return this.backendService.getLoginCache();
    }

    getLoginInfo() {
        let body = { includePermission: true };
        return this.backendService.post('/users' + '/info', body);
    }

    updateLoginCache(body) {
        if (body) {
            if ((body.id != '' || body.id != null) && body.deleted != false) {
                this.backendService.updateLoginCache({loggedIn: true});
            }
        } else {
            this.backendService.updateLoginCache({loggedIn: false});
        }
    }
}