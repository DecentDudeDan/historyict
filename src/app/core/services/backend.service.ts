import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { User } from './../models/user';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class BackendService {

  private baseUrl: string = this.matchBackendFromUrl();
  private headers: Headers = new Headers(); 
  private token: string;
  private options: RequestOptions

  constructor(private http: Http, private router: Router) { 
    let authtoken = localStorage.getItem('authToken');
    this.token = authtoken ? 'Bearer ' + authtoken : null;
    this.headers.append("Content-Type", 'application/json');
    this.headers.append("Accept", 'application/json');
    this.headers.append("Authorization", this.token);
    this.options = new RequestOptions({ headers: this.headers });
  }

  setToken(token: string): void {
    this.token = token;
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
    return this.http.post(this.baseUrl + url, body, this.options)
    .map((res: Response) => {
      return res;
    });
  }

  put(url: string, body: any) {
    this.checkLoginStatus();
    return this.http.put(this.baseUrl + url, body, this.options)
    .map((res: Response) => {
      console.log(res);
    });
  }

  delete(url: string, body: any) {
    this.checkLoginStatus();
    body.deleted = true;
    return this.http.put(this.baseUrl + url, body, this.options)
    .map((res: Response) => {
      console.log(res);
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

  isLoggedIn(): boolean {
    return !!this.token;
  }
}
