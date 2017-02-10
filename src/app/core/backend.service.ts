import { Marker } from './models/marker';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class BackendService {

  private baseUrl: string = this.matchBackendFromUrl();
  private headers: Headers = new Headers(); 

  constructor(private http: Http) { 
    this.headers.append("Content-Type", 'application/json');
    this.headers.append("Accept", 'application/json');
  }


  get(url: string) {
    return this.http.get(this.baseUrl + url)
    .map((res) => {
      if (res) {
        return res.json();
      }
    });
}

  post(url: string, marker: Marker) {
    marker.author = this.getAccountName();
    return this.http.post(this.baseUrl + url, marker, {headers: this.headers})
    .map((res: Response) => {
      console.log(res);
    });
  }

  put(url: string, marker: Marker) {
    return this.http.put(this.baseUrl + url, marker, {headers: this.headers})
    .map((res: Response) => {
      console.log(res);
    });
  }

  delete(url: string, marker: Marker) {
    marker.deleted = true;
    return this.http.put(this.baseUrl + url, marker, {headers: this.headers})
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
}
