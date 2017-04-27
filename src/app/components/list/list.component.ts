import { ListConfig } from './list-config';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RequestType } from './../../core/models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  requestType = RequestType;

  @Input() config: ListConfig
  @Input() items: any;

  @Output() review: EventEmitter<any> = new EventEmitter();
  @Output() request: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  getItemData(item: any, columnName: string) {
    if (columnName === 'permissionLevel') {
      switch (item[columnName]) {
        case 0:
          return 'User';
        case 1:
          return 'Editor';
        case 2:
          return 'Admin';
      }
    }
    return item[columnName];
  }

  reviewItem(item, approve, type: RequestType) {
    let reviewItem = {
      item: item,
      itemType: this.config.Type,
      approved: approve,
      previousType: type
    }
    this.review.emit(reviewItem);
  }

  requestItems(type: RequestType) {
    let requestOption = {
      itemType: this.config.Type,
      requestType: type
    }
    this.request.emit(requestOption);
  }

}
