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

  get(id?: string) {
      let dataId = id ? id : '';
      if (dataId) {
        return this.backendService.get(this.userUrl + '/' + dataId);
      } else {
          return this.backendService.get(this.userUrl);
      }
  }

  getUserInfo() {
    let body = { includePermission: true };
    return this.backendService.post(this.userUrl + '/info', body);
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