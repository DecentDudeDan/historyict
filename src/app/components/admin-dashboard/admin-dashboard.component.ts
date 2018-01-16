import { History, Marker, User, PermissionType, ItemType, RequestType } from './../../core/models';
import { ListConfig } from './../list/list-config';
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

  requestedItems: Array<any> = [];
  ItemType = ItemType;
  RequestType = RequestType;

  pActive: boolean = true;

  markerConfig: ListConfig = {
    ColumnNames: [
      { title: 'Title', key: 'title' },
      { title: 'Street1', key: 'street1' },
      { title: 'Street2', key: 'street2' },
      { title: 'Latitude', key: 'lat' },
      { title: 'Longitude', key: 'lng' },
      { title: 'Author', key: 'author' }
    ],
    Type: ItemType.Marker
  }

  historyConfig: ListConfig = {
    ColumnNames: [
      { title: 'Title', key: 'title' },
      { title: 'Content', key: 'content' },
      { title: 'Date', key: 'date' },
      { title: 'Author', key: 'author' }
    ],
    Type: ItemType.History
  }

  userConfig: ListConfig = {
    ColumnNames: [
      { title: 'Username', key: 'username' },
      { title: 'Email', key: 'email' },
      { title: 'Permission', key: 'permissionLevel' },
      { title: 'First', key: 'firstName' },
      { title: 'Last', key: 'lastName' }
    ],
    Type: ItemType.User
  }

  constructor(private userService: UserService, private markerService: MarkerService, private historyService: HistoryService) { }

  ngOnInit() {
    this.getMarkers('pending');
  }

  getMarkers(type) {
    this.markerService.get(type)
      .subscribe((markers) => {
        this.requestedItems = markers;
      });
  }

  getHistorys(type) {
    this.historyService.get(type)
      .subscribe((historys) => {
        this.requestedItems = historys;
      });
  }

  getUsers(type) {
    this.userService.get(type)
      .subscribe((users) => {
        this.requestedItems = users;
      });
  }

  requestItems(event) {
    this.requestedItems = [];
    let lowercaseType = RequestType[event.requestType].toLowerCase();

    if (lowercaseType == 'pending') {
      this.pActive = true;
    } else {
      this.pActive = false;
    }

    switch (event.itemType) {
      case ItemType.Marker:
        this.getMarkers(lowercaseType);
        break;
      case ItemType.History:
        this.getHistorys(lowercaseType);
        break;
      case ItemType.User:
        this.getUsers(lowercaseType);
        break;
    }
  }

  review(event) {
    switch (event.itemType) {
      case ItemType.Marker:
        this.reviewMarker(event.item, event.approved, event.previousType);
        break;
      case ItemType.History:
        this.reviewHistory(event.item, event.approved, event.previousType);
        break;
      case ItemType.User:
        this.reviewUser(event.item, event.approved, event.previousType);
        break;
    }
  }

  reviewMarker(marker: Marker, isApproved: boolean, previousType) {
    let lowercaseType = RequestType[previousType].toLowerCase();
    let reviewType: string = isApproved ? 'approve' : 'decline';
      this.markerService.put(marker, reviewType)
        .subscribe(() => {
          this.getMarkers(lowercaseType);
        });
  }

  reviewHistory(history: History, isApproved: boolean, previousType) {
    let lowercaseType = RequestType[previousType].toLowerCase();
    let reviewType: string = isApproved ? 'approve' : 'decline';
      this.historyService.put(history, reviewType)
        .subscribe(() => {
          this.getHistorys(lowercaseType);
        });
  }

  reviewUser(user: User, isApproved: boolean, previousType) {
    let lowercaseType = RequestType[previousType].toLowerCase();
    let reviewType: string = isApproved ? 'approve' : 'decline';    
      this.userService.put(user, reviewType)
        .subscribe(() => {
          this.getUsers(lowercaseType);
        });
  }

  getPermissionLevel(user: User): string {
    if (user.permissionLevel === PermissionType.USER) {
      return "User";
    } else if (user.permissionLevel === PermissionType.EDITOR) {
      return "Editor";
    } else if (user.permissionLevel === PermissionType.ADMIN) {
      return "Admin";
    }

    return null;
  }

}
