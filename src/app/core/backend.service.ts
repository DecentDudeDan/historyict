import { Marker } from './models/marker';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class BackendService {

  private baseUrl: string = 'http://histofict-backend.herokuapp.com';
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
    return this.http.post(this.baseUrl + url, marker, {headers: this.headers})
    .map((res: Response) => {
      console.log(res);
    });
  }

  put(url: string, marker: Marker) {
    let markerToEdit = JSON.stringify(marker);

    return this.http.put(this.baseUrl + url, marker, {headers: this.headers})
    .map((res: Response) => {
      console.log(res);
    });
  }

  delete(url: string, marker: Marker) {

    let deletemarker = JSON.stringify({
      "Title": marker.title,
      "Id": marker.id
    });
    console.log('in delete');
    return this.http.delete(this.baseUrl + url, new RequestOptions({
      headers: this.headers,
      body: deletemarker
    }))
    .map((res: Response) => {
      console.log(res);
    });
  }
}
