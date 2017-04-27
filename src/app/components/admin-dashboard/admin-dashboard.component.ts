import { ListConfig } from './../list/list-config';
import { History } from './../../core/models/history';
import { Marker } from './../../core/models/marker';
import { User } from './../../core/models/user';
import { HistoryService } from './../../core/services/history.service';
import { MarkerService } from './../../core/services/marker.service';
import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  pendingUsers: User[];
  pendingMarkers: Marker[];
  pendingHistorys: History[];

  markerConfig: ListConfig = {
    ColumnNames: [
      'Title',
      'lat',
      'lng',
      'author',
      'street1',
      'street2'
    ],
    Type: 'Marker'
  }

  fakeMarkers: Marker[] = [
    {
    title: 'test',
    street1: 'street1',
    street2: 'street2',
    lat: 10921,
    lng: 10103,
    deleted: false,
    id: '5'
  },
  {
    title: 'test2',
    street1: 'street9',
    street2: 'street6',
    lat: 20404,
    lng: 34043,
    deleted: false,
    id: '6'
    }
  ]

  constructor(private userService: UserService, private markerService: MarkerService, private historyService: HistoryService) { }

  ngOnInit() {
    this.populatePendingItems();
  }

  populatePendingItems() {
    this.getPendingMarkers();

    this.getPendingHistorys();

    this.getPendingUsers();
  }

  getPendingMarkers() {
    this.markerService.get('pending')
    .subscribe((markers) => {
      this.pendingMarkers = markers;
    });
  }

  getPendingHistorys() {
    this.historyService.get('pending')
    .subscribe((historys) => {
      this.pendingHistorys = historys;
    });
  }

  getPendingUsers() {
    this.userService.get('pending')
    .subscribe((users) => {
      this.pendingUsers = users;
    });
  }

  review(event: Event) {
    console.log(event);
  }

  reviewMarker(marker: Marker, isApproved) {
    if (isApproved) {
      marker.approved = new Date();
      this.markerService.put(marker)
      .subscribe(() => {
        this.getPendingMarkers();
      });
    } else {
      marker.declined = new Date();
      this.markerService.put(marker)
      .subscribe(() => {
        this.getPendingMarkers();
      });
    }
  }

  reviewHistory(history: History, isApproved) {
    if (isApproved) {
      history.approved = new Date();
      this.historyService.put(history)
      .subscribe(() => {
        this.getPendingHistorys();
      });
    } else {
      history.declined = new Date();
      this.historyService.put(history)
      .subscribe(() => {
        this.getPendingHistorys();
      });
    }
  }

  reviewUser(user: User, isApproved) {
    if (isApproved) {
      user.approved = new Date();
      this.userService.put(user)
      .subscribe(() => {
        this.getPendingUsers();
      });
    } else {
      user.declined = new Date();
      this.userService.put(user)
      .subscribe(() => {
        this.getPendingUsers();
      });
    }
  }

}
