import { dataItem } from './models/data-item';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class BackendService {

  constructor(private http: Http) { }


  getAllData() {
    return this.http.get('http://localhost:3000/api')
    .map( (res: Response)  => res.json());
  }
}
