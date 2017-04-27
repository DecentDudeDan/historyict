import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() config;
  @Input() items: any;

  @Output() review: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  getItemData(item: any, columnName: string) {
    return item[columnName];
  }

  reviewItem(item, approve) {
    if (approve) {
      item.approved = new Date();
      this.review.emit(item);
    } else {
      item.declined = new Date();
      this.review.emit(item);
    }
  }

}
