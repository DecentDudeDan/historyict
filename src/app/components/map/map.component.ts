import { MouseEvent, LatLngBoundsLiteral } from 'angular2-google-maps/core';
import { browser } from 'protractor';
import { Response } from '@angular/http';
import { Marker } from './../../core/models/marker';
import { BackendService } from './../../core/backend.service';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Message } from 'primeng/primeng';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {

  private chance = require('../../../../node_modules/chance').Chance();

  msgs: Message[] = [];
  initialLat: number = 37.6872;
  initialLng: number = -97.3301;
  zoomAmount: number = 15;
  markers: Marker[];
  currentMarker: Marker;
  editingMarker: Marker = new Marker();
  isEditing: boolean;
  isSelected: boolean;
  gettingCoords: boolean = false;
  cursorType: string = 'move';
  
  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.getMarkers();
    this.isSelected = false;
  }

  getCurrentMarker(): Marker {
    if (this.currentMarker) {
      return this.currentMarker;
    }
    return new Marker
  }

  addMarker(): void {
    this.editingMarker = new Marker();
    this.getCoords();
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Getting Coordinates', detail: 'Select a locatin on the map to obtain coordinates'});
  }

  editMarker(): void {
    this.editingMarker = this.currentMarker;
    this.isEditing = true;
  }

  mapClicked($event: MouseEvent) {
    if (this.gettingCoords) {
      this.editingMarker.lat = $event.coords.lat;
      this.editingMarker.lng = $event.coords.lng;
      this.gettingCoords = false;
      this.cursorType = 'move';
      this.isEditing = true;
    }
  }

  mapRightClicked($event: MouseEvent) {
    if (this.gettingCoords) {
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

  deleteMarker(): void {
      if (this.currentMarker != null) {
    this.backendService.delete('/markers', this.currentMarker)
    .subscribe(() => {
      this.getMarkers();
    });
    }
  }

  clickedMarker(marker: Marker): void {
    if ( this.currentMarker === marker) {
      this.currentMarker = null;
      this.isSelected = false;
    } else {
      this.currentMarker = marker;
      this.isSelected = true;
    }
  }

  onSave(): void {

    if (this.isValid(this.editingMarker)) {
      this.backendService.post('/markers', this.editingMarker)
      .subscribe((res: any) => {
        this.getMarkers();
      })
    }
    this.editingMarker = new Marker();
    this.isEditing = !this.isEditing;
  }

  cancel(): void {
    this.editingMarker = new Marker();
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
