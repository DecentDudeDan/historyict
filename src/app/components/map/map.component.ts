import { Response } from '@angular/http';
import { Marker } from './../../core/models/marker';
import { BackendService } from './../../core/backend.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private chance = require('../../../../node_modules/chance').Chance();

  lat: number = 37.6872;
  lng: number = -97.3301;
  zoomAmount: number = 14;
  constructor(private backendServce: BackendService) { }

  ngOnInit() {
  }

  getMarkers(): void {
    this.backendServce.get('/markers')
    .subscribe((res: Marker) => {
      console.log(res);
    })
  }

  createMarker(): void {
    let newMarker: Marker = {
      Title: 'addedmarker',
      Street1: null,
      Street2: null,
      Lat: 39.0202020,
      Lng: 90.93930,
      Id: this.chance.natural(),
      IconUrl: null,
      Label: null
    }
    this.backendServce.post('/markers', newMarker)
    .subscribe((res: any) => {
      console.log(res);
    })
  }

}
