import { Marker } from './../models/marker';
import { BackendService } from './backend.service';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class MarkerService {

  constructor(private backendService: BackendService) { 
  }

  private markerUrl: string = '/markers';

  get(id?: string) {
      let dataId = id ? id : '';
      if (dataId) {
        return this.backendService.get(this.markerUrl + '/' + dataId);
      } else {
          return this.backendService.get(this.markerUrl);
      }
    }

  post(body: Marker) {
      return this.backendService.post(this.markerUrl, body);
    }

  put(body: Marker, url: string = '') {
      return this.backendService.put(this.markerUrl + '/' + url, body);
    }

  delete(body: Marker) {
      body.deleted = true;
      return this.backendService.put(this.markerUrl, body);
    }
}