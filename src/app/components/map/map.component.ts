import { MouseEvent, LatLngBoundsLiteral } from 'angular2-google-maps/core';
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

  iconUrl: string = this.iconBase + 'parking_lot_maps.png';
  initialLat: number = 37.6872;
  initialLng: number = -97.3301;
  zoomAmount: number = 15;
  markers: Marker[];
  currentMarker: Marker = new Marker();
  isEditing: boolean;
  gettingCoords: boolean = false;
  cursorType: string = 'move';
  iconBase: string  = 'http://maps.google.com/mapfiles/kml/shapes/';
  
  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.getMarkers();
  }

  mapClicked($event: MouseEvent) {
    if (this.gettingCoords) {
      this.currentMarker.lat = $event.coords.lat;
      this.currentMarker.lng = $event.coords.lng;
      this.gettingCoords = false;
      this.cursorType = 'move';
    }
  }

  getMarkers(): void {
    this.backendService.get('/markers')
    .subscribe((res: Marker[]) => {
      console.log(res);
      this.markers = res;
    })
  }

  showMarkerForm(): void {
    this.isEditing = !this.isEditing;
    this.currentMarker = new Marker();
  }

  deleteMarker(): void {
    console.log(this.currentMarker);
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
      this.currentMarker = new Marker();
    } else {
      this.currentMarker = marker;
    }
  }

  onSelect(marker: Marker) {
    if ( this.currentMarker === marker) {
      this.currentMarker = new Marker();
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

    this.showMarkerForm();
  }

  cancel(): void {
    this.currentMarker = new Marker();
    this.isEditing = !this.isEditing;
  }

  isValid(marker: Marker): boolean {
    if(marker.title != null && marker.lat != null && marker.lng != null) {
      return true;
    } else {
      alert('Error: Title, Lat, and Lng must be set to save a new marker');
    }
  }

  getIcon(url: string): string {
    if (url) {
      return this.iconBase + url;
    }
    return '';
  }

  getCoords(): void {
    this.gettingCoords = true;
    this.cursorType = 'crosshair';
  }

}
