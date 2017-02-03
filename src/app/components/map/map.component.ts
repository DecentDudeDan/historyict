import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  lat: number = 37.6872;
  lng: number = -97.3301;
  zoomAmount: number = 14;
  constructor() { }

  ngOnInit() {
  }

}
