import { AuthEvent } from './../models/authEvent';
import { ReplaySubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { User, PermissionType } from './../models';
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
    let cleanedToken = JSON.parse(authToken);
    this.setToken(cleanedToken);
    this.options = new RequestOptions({ headers: this.headers });
  }

  setToken(token: string): void {
      if(token) {
        this.token = "Bearer " + token;
      } else {
        this.token = null;
      }
      this.setHeaders();
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
    this.options = new RequestOptions({ headers: this.headers });
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

  upload(url: string, data: FormData) {
    const uploadHeaders: Headers = new Headers();
    uploadHeaders.append("Authorization", this.token);
    const uploadOptions: RequestOptions = new RequestOptions({headers: uploadHeaders});
    this.checkLoginStatus();
    return this.handleResponse(this.http.post(this.baseUrl + url, data, uploadOptions));
  }

  handleResponse(res: Observable<Response>): Observable<any> {
    return res.map((res) => {
      if (res.status == 401) {
        this.logout();
        this.router.navigate(['account']);
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
      this.router.navigate(['account']);
    }
  }

  logout(): void {
    this.setToken(null);
    localStorage.clear();
    this.updateLoginCache({loggedIn: false, permissionLevel: PermissionType.USER})
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }
}
