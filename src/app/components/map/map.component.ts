import { MouseEvent, LatLngBoundsLiteral } from 'angular2-google-maps/core';
import { browser } from 'protractor';
import { Response } from '@angular/http';
import { Marker } from './../../core/models/marker';
import { BackendService } from './../../core/backend.service';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {

  private chance = require('../../../../node_modules/chance').Chance();

  initialLat: number = 37.6872;
  initialLng: number = -97.3301;
  zoomAmount: number = 15;
  markers: Marker[];
  currentMarker: Marker;
  editingMarker: Marker = new Marker();
  isEditing: boolean;
  gettingCoords: boolean = false;
  cursorType: string = 'move';
  
  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.getMarkers();
    this.currentMarker = null
  }

  addMarker(): void {
    this.editingMarker = new Marker();
    this.getCoords();
  }

  editMarker(): void {
    this.editingMarker = this.currentMarker;
    this.isEditing = true;
  }

  mapClicked($event: MouseEvent) {
    if (this.gettingCoords) {
      this.currentMarker.lat = $event.coords.lat;
      this.currentMarker.lng = $event.coords.lng;
      this.gettingCoords = false;
      this.cursorType = 'move';
      this.isEditing = true;
    }
  }

  getMarkers(): void {
    this.backendService.get('/markers')
    .subscribe((res: Marker[]) => {
      console.log(res);
      this.markers = res;
    })
  }

  deleteMarker(): void {
      if (this.currentMarker != null) {
    this.backendService.delete('/markers', this.currentMarker)
    .subscribe(() => {
      this.currentMarker = new Marker();
      this.getMarkers();
    });
    }
  }

  clickedMarker(marker: Marker): void {
    if ( this.currentMarker === marker) {
      this.currentMarker = null;
    } else {
      this.currentMarker = marker;
    }
  }

  isActive(marker: Marker): boolean {
    return this.currentMarker === marker;
  }

  onSave(): void {

    if (this.isValid(this.currentMarker)) {
      this.backendService.post('/markers', this.currentMarker)
      .subscribe((res: any) => {
        this.getMarkers();
      })
    }

    this.isEditing = !this.isEditing;
  }

  cancel(): void {
    this.currentMarker = null;
    this.isEditing = !this.isEditing;
  }

  isValid(marker: Marker): boolean {
    if(marker.title != null && marker.lat != null && marker.lng != null) {
      return true;
    } else {
      alert('Error: Title, Lat, and Lng must be set to save a new marker');
    }
  }
  
  isLocal(): boolean {
    return window.location.href.indexOf('localhost') != -1;
  }

  getCoords(): void {
    this.gettingCoords = true;
    this.cursorType = 'crosshair';
  }

}
