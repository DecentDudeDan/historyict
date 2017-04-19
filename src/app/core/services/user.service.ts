import { ReplaySubject } from 'rxjs/Rx';
import { User } from './../models/user';
import { BackendService } from './backend.service';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private backendService: BackendService) {
  }

  private userUrl: string = '/users';

  get(path?: string) {
    let dataId = path ? path : '';
    if (dataId) {
      return this.backendService.get(this.userUrl + '/' + dataId);
    } else {
      return this.backendService.get(this.userUrl);
    }
  }

  post(body: User) {
    return this.backendService.post(this.userUrl, body);
  }

  put(body: User) {
    return this.backendService.put(this.userUrl, body);
  }

  delete(body: User) {
    body.deleted = true;
    return this.backendService.put(this.userUrl, body);
  }
}