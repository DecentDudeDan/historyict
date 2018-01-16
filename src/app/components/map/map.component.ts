import { TimelineComponent } from './../timeline/timeline.component';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from './../../core/services/authentication.service';
import * as esriLoader from 'esri-loader';
import { Response } from '@angular/http';
import { Marker, PermissionType } from './../../core/models';
import { MarkerService } from './../../core/services/marker.service';
import { Component, OnInit, Input, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Message } from 'primeng/primeng';
import { resetFakeAsyncZone } from '@angular/core/testing';


let EsriGraphic;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {

  @ViewChild('timeline') timeline: ElementRef;
  msgs: Message[] = [];
  loggedIn: boolean;
  initialLat: number = 37.6872;
  initialLng: number = -97.3301;
  zoomAmount: number = 13;
  markers: Marker[];
  currentMarker: Marker;
  editingMarker: Marker = new Marker();
  isEditing: boolean;
  isSelected: boolean;
  gettingCoords: boolean = false;
  cursorType: string = 'move';
  mobile: boolean = false;
  view: __esri.MapView;

  constructor(private markerService: MarkerService, public auth: AuthenticationService) {
  }

  ngOnInit() {
    this.mobile = this.isMobile();
    this.getMarkers();
    this.isLoggedIn();
    this.isSelected = false;
    if (this.loggedIn) {
      this.auth.getLoginInfo();
    }
    if (!esriLoader.isLoaded()) {
      esriLoader.loadScript().then(() => {
        esriLoader.loadModules(['esri/views/MapView', 
                                'esri/WebMap',
                                'esri/Graphic']).then(([MapView, WebMap, Graphic]: [__esri.MapViewConstructor, __esri.WebMapConstructor, __esri.GraphicConstructor]) => {
          var webmap = new WebMap({
            portalItem: { // autocasts as new PortalItem()
              id: '8bf7167d20924cbf8e25e7b11c7c502c'
            }
          });
          this.view = new MapView({
            map: webmap,
            container: 'mapDiv',
            center: [this.initialLng, this.initialLat],
            zoom: this.zoomAmount
          });

          EsriGraphic = Graphic;
          this.view.on('click', (event) => this.mapClicked(event));
          this.view.on('pointer-down', (event) => this.eventHandler(event));
          this.addMarkers();
        })
          .catch(err => {
            console.error(err);
          });
      });
    }
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
    this.msgs.push({ severity: 'info', summary: 'Getting Coordinates', detail: 'Select a locatin on the map to obtain coordinates' });
  }

  editMarker(): void {
    this.editingMarker = this.currentMarker;
    this.isEditing = true;
  }

  isMobile(): boolean {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor);
    return check;
  }

  mapClicked($event) {
    if ($event.button === 2) {
      if (this.gettingCoords) {
        this.cursorType = 'move';
        this.gettingCoords = false;
      }
    } else {
      if (this.gettingCoords) {
        this.editingMarker.lat = $event.mapPoint.latitude;
        this.editingMarker.lng = $event.mapPoint.longitude;
        this.gettingCoords = false;
        this.cursorType = 'move';
        this.isEditing = true;
      }
    }
  }

  mapRightClicked($event) {
    if (this.gettingCoords) {
      this.cursorType = 'move';
      this.gettingCoords = false;
    }
  }

  getMarkers(): void {
    this.markerService.get()
      .subscribe((res: Marker[]) => {
        this.markers = res;
        if (this.view) {
          this.addMarkers();
        }
      }, err => {
        this.markers = [];
        console.log(err);
      })
  }

  addMarkers() {
    this.view.graphics.addMany(this.mapToGraphics(this.markers));
  }

  mapToGraphics(markers: Marker[]): __esri.Graphic[] {
    let mappedPoints: __esri.Graphic[] = [];
    markers.forEach(m => {
      var point = {
        type: "point", // autocasts as new Point()
        longitude: m.lng,
        latitude: m.lat
      };
  
      // Create a symbol for drawing the point
      var markerSymbol = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [226, 119, 40],
        outline: { // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 2
        }
      };
  
      // Create a graphic and add the geometry and symbol to it
      var pointGraphic = new EsriGraphic({
        geometry: point,
        symbol: markerSymbol
      });

      mappedPoints.push(pointGraphic);
    })
    return mappedPoints;
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

  eventHandler(event): void {
    this.view.hitTest(event).then(res => this.getGraphic(res, this));
  }

  clickedMarker(marker: Marker): void {
    if (this.currentMarker === marker) {
      this.currentMarker = null;
      this.isSelected = false;
    } else {
      this.currentMarker = marker;
      this.isSelected = true;
      this.timeline.nativeElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  getGraphic(response, context) {
    console.log(response);
    if(response.results.length) {
      let marker;
      const geometry: __esri.Geometry = response.results[0].graphic.geometry;
      console.log('graphic: ', geometry);
      marker = context.markers.find(m => {
        return m.lat === geometry.get('latitude') && m.lng === geometry.get('longitude');
      })
      if (marker) {
        context.clickedMarker(marker[0]);
      }
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
        if (this.auth.isAdmin() || this.auth.isEditor()) {
          this.editingMarker.approved = new Date();
        }
        this.editingMarker.author = this.auth.userInfo.username;
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
    if (marker.title != null && marker.lat != null && marker.lng != null) {
      return true;
    } else {
      this.msgs.push({ severity: 'error', summary: 'Invalid Marker', detail: 'Marker must have a title, latitude, and longitude' });
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
