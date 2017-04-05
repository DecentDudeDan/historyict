import { AuthEvent } from './../models/authEvent';
import { ReplaySubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { User } from './../models/user';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class BackendService {

  private baseUrl: string = this.matchBackendFromUrl();
  private headers: Headers; 
  private token: string;
  private options: RequestOptions
  private loginStatusCache: ReplaySubject<AuthEvent> = new ReplaySubject();

  constructor(private http: Http, private router: Router) { 
    let authToken = localStorage.getItem('authToken');
    this.setToken(JSON.parse(authToken));
    this.options = new RequestOptions({ headers: this.headers });
  }

  setToken(token: string): void {
    if (token) {
      if(this.token == '' || this.token == null) {
        this.token = "Bearer " + token;
        this.updateLoginCache({loggedIn: true});
      } else {
        this.token = null;
        this.updateLoginCache({loggedIn: false});
      }
      this.setHeaders();
    }
  }

  updateLoginCache(auth: AuthEvent) {
    this.loginStatusCache.next(auth);
  }

  getLoginCache(): ReplaySubject<AuthEvent> {
    return this.loginStatusCache;
  }

  setHeaders(): void {
    this.headers = new Headers();
    this.headers.append("Content-Type", 'application/json');
    this.headers.append("Accept", 'application/json');
    this.headers.append("Authorization", this.token);
    console.log('Headers: ', this.headers);
  }

  get(url: string, id?: string) {
    let dataId = id ? id : '';
    return this.http.get(this.baseUrl + url + '/' + dataId, this.options)
    .map((res) => {
      if (res) {
        return res.json();
      }
    });
}

  post(url: string, body: any) {
    console.log('posting with headers', this.headers);
    this.checkLoginStatus();
    return this.handleResponse(this.http.post(this.baseUrl + url, body, this.options));
  }

  put(url: string, body: any) {
    this.checkLoginStatus();
    return this.handleResponse(this.http.put(this.baseUrl + url, body, this.options));
  }

  delete(url: string, body: any) {
    this.checkLoginStatus();
    body.deleted = true;
    return this.handleResponse(this.http.put(this.baseUrl + url, body, this.options))
  }

  handleResponse(res: Observable<Response>): Observable<Response> {
    return res.map((res) => {
      if (res.status == 401) {
        this.clearLoginInfo();
        this.router.navigate(['login']);
      }
      return res;
    });
  }

  matchBackendFromUrl(): string {
    if (document.location.href.indexOf('localhost') !== -1) {
      return 'http://localhost:3000';
    }

    return 'https://histofict-backend.herokuapp.com';
  }

  getAccountName(): string {
    return 'Danny';
  }

  checkLoginStatus(): void {
    if (!this.token){
      this.router.navigate(['login']);
    }
  }

  clearLoginInfo(): void {
    this.setToken(null);
    this.setHeaders();
  }

  logout(): void {
    this.token = null;
    this.updateLoginCache({loggedIn: false});
    localStorage.clear();
    this.setHeaders();
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }
}
