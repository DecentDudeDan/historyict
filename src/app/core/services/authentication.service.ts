import { User } from './../models/user';
import { BackendService } from './backend.service';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    token: string;

    constructor(private backendService: BackendService) {  }

    login(username: string, password: string) {
        let user = new User();
        user.username = username;
        user.password = password;
        return this.backendService.post('/authenticate', user)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                console.log('in auth service, res:', user);
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.backendService.setToken(JSON.stringify(user.token));
                    localStorage.setItem('authToken', JSON.stringify(user.token));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('authToken');
    }

    isLoggedIn(): boolean {
        return this.backendService.isLoggedIn();
    }
}