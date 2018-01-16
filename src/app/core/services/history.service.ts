import { History } from './../models/history';
import { BackendService } from './backend.service';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class HistoryService {

  constructor(private backendService: BackendService) { 
  }

  private historyUrl: string = '/historys';

  get(id?: string) {
      let dataId = id ? id : '';
      if (dataId) {
          return this.backendService.get(this.historyUrl + '/' + dataId);
      } else {
          return this.backendService.get(this.historyUrl);
      }
    }

  post(body: History) {
      return this.backendService.post(this.historyUrl, body);
    }

  put(body: History, url: string = '') {
      return this.backendService.put(this.historyUrl + '/' + url, body);
    }

  delete(body: History) {
      body.deleted = true;
      return this.backendService.put(this.historyUrl, body);
    }
}