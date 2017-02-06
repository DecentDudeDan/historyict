import { MouseEvent } from 'angular2-google-maps/core';
import { browser } from 'protractor';
import { Response } from '@angular/http';
import { Marker } from './../../core/models/marker';
import { BackendService } from './../../core/backend.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private chance = require('../../../../node_modules/chance').Chance();

  initialLat: number = 37.6872;
  initialLng: number = -97.3301;
  zoomAmount: number = 15;
  markers: Marker[];
  currentMarker: Marker;
  isEditing: boolean;
  
  constructor(private backendServce: BackendService) { }

  ngOnInit() {
    this.getMarkers();
  }

  mapClicked($event: MouseEvent) {
    console.log($event.coords.lat, $event.coords.lng);
  }

  getMarkers(): void {
    this.backendServce.get('/markers')
    .subscribe((res: Marker[]) => {
      console.log(res);
      this.markers = res;
    })
  }

  createMarker(): void {
    this.isEditing = !this.isEditing;
    let newMarker: Marker = {
      Title: 'addedmarker',
      Street1: null,
      Street2: null,
      Lat: 39.0202020,
      Lng: 90.93930,
      Id: this.chance.natural(),
      IconUrl: null,
      Label: null,
      Author: 'Me',
      Created: new Date().getTime(),
      LastUpdated: Date.now(),
      Deleted: false
    }

    console.log(newMarker);
    // this.backendServce.post('/markers', newMarker)
    // .subscribe((res: any) => {
    //   console.log(res);
    // })
  }

  deleteMarker(): void {
    console.log(this.currentMarker);
  }

  clickedMarker(marker: Marker): void {
    this.currentMarker = marker;
  }

  onSelect(marker: Marker) {
    if ( this.currentMarker === marker) {
      this.currentMarker = null;
    } else {
      this.currentMarker = marker;
    }
  }

}
