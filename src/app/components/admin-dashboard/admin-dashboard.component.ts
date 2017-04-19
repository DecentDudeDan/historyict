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

  pendingUsers: User[] = [];
  pendingMarkers: Marker[] = [];
  pendingHistorys: History[] = [];

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
