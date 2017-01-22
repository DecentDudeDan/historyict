import { dataItem } from './models/data-item';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class BackendService {

  private url: string = 'http://localhost:3000';
  private headers: Headers = new Headers();
  private chance: any = require('../../../node_modules/chance').Chance();
  

  constructor(private http: Http) { 
    this.headers.append("Content-Type", 'application/json');
    this.headers.append("Accept", 'application/json');
  }


  get(url) {
    var requestoptions = new RequestOptions({
      method: RequestMethod.Get,
      url: this.url + url,
      headers: this.headers
    });

    return this.http.request(new Request(requestoptions))
    .map((res) => {
      if (res) {
        return res.json();
      }
    });
}
  

  post(url) {

    let user = JSON.stringify({
      "Name": this.chance.name(),
      "Id": this.chance.natural()
    });
    

    return this.http.post(this.url + url, user, {headers: this.headers})
    .map((res: Response) => {
      console.log(res);
    });
  }
}
