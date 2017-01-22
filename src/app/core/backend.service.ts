import { User } from './models/user';
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

  post(url: string, user: User) {
    return this.http.post(this.url + url, user, {headers: this.headers})
    .map((res: Response) => {
      console.log(res);
    });
  }

  put(url: string, user: User) {
    let userToEdit = JSON.stringify(user);

    return this.http.put(this.url + url, user, {headers: this.headers})
    .map((res: Response) => {
      console.log(res);
    });
  }

  delete(url: string, user: User) {

    let deleteUser = JSON.stringify({
      "Name": user.Name,
      "Id": user.Id
    });
    console.log('in delete');
    return this.http.delete(this.url + url, new RequestOptions({
      headers: this.headers,
      body: deleteUser
    }))
    .map((res: Response) => {
      console.log(res);
    });
  }
}
