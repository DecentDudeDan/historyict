import { Marker } from './models/marker';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class BackendService {

  private url: string = 'http://localhost:3000';
  private headers: Headers = new Headers(); 

  constructor(private http: Http) { 
    this.headers.append("Content-Type", 'application/json');
    this.headers.append("Accept", 'application/json');
  }


  get(url: string) {
    return this.http.get(this.url + url)
    .map((res) => {
      if (res) {
        return res.json();
      }
    });
}

  post(url: string, marker: Marker) {
    console.log(marker);
    return this.http.post(this.url + url, marker, {headers: this.headers})
    .map((res: Response) => {
      console.log(res);
    });
  }

  put(url: string, marker: Marker) {
    let markerToEdit = JSON.stringify(marker);

    return this.http.put(this.url + url, marker, {headers: this.headers})
    .map((res: Response) => {
      console.log(res);
    });
  }

  delete(url: string, marker: Marker) {

    let deletemarker = JSON.stringify({
      "Name": marker.Title,
      "Id": marker.Id
    });
    console.log('in delete');
    return this.http.delete(this.url + url, new RequestOptions({
      headers: this.headers,
      body: deletemarker
    }))
    .map((res: Response) => {
      console.log(res);
    });
  }
}
