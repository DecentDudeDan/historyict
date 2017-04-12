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

  constructor(private userService: UserService, private markerSerice: MarkerService, private historyService: HistoryService) { }

  ngOnInit() {
    this.populatePendingItems();
  }

  populatePendingItems() {
    this.userService.get('pending')
    .subscribe((users) => {
      console.log('pendingUsers: ', users);
      this.pendingUsers = users;
    });
  }

}
