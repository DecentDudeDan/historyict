import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from './../../core/services/authentication.service';
import { MouseEvent, LatLngBoundsLiteral } from 'angular2-google-maps/core';
import { Response } from '@angular/http';
import { Marker, PermissionType } from './../../core/models';
import { MarkerService } from './../../core/services/marker.service';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Message } from 'primeng/primeng';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {

  msgs: Message[] = [];
  loggedIn: boolean;
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
  
  constructor(private markerService: MarkerService, private auth: AuthenticationService) {
   }

  ngOnInit() {
    this.getMarkers();
    this.isSelected = false;
    this.isLoggedIn();
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
    this.markerService.get()
    .subscribe((res: Marker[]) => {
      this.markers = res;
    }, err => {
      this.markers = [];
      console.log(err);
    })
  }

  deleteMarker(): void {
      if (this.currentMarker != null) {
    this.markerService.delete(this.currentMarker)
    .subscribe(() => {
      this.getMarkers();
    });
    }
    this.isSelected = false;
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
      if (this.editingMarker.created) {
        this.markerService.put(this.editingMarker)
        .subscribe(() => {
          this.getMarkers();
        });
      } else {
        if (this.auth.permissionLevel === PermissionType.ADMIN || this.auth.permissionLevel === PermissionType.EDITOR) {
          this.editingMarker.approved = new Date();
        }
        this.editingMarker.author = this.auth.userInfo.firstName + ' ' + this.auth.userInfo.lastName;
      this.markerService.post(this.editingMarker)
      .subscribe(() => {
        this.getMarkers();
      });
      }
    }
    this.editingMarker = new Marker();
    this.isEditing = !this.isEditing;
  }

  cancel(): void {
    this.editingMarker = new Marker();
    this.isEditing = false;
  }

  isValid(marker: Marker): boolean {
    if(marker.title != null && marker.lat != null && marker.lng != null) {
      return true;
    } else {
      this.msgs.push({severity: 'error', summary: 'Invalid Marker', detail: 'Marker must have a title, latitude, and longitude'});
      return false;
    }
  }
  
  isLocal(): boolean {
    return window.location.href.indexOf('localhost') != -1;
  }

  getCoords(): void {
    this.gettingCoords = true;
    this.cursorType = 'crosshair';
  }

  isLoggedIn(): void {
    this.auth.loggedInStatus().subscribe((auth) => {
      this.loggedIn = auth.loggedIn;
    });
  }

}
