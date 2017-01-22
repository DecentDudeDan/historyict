import { Response } from '@angular/http';
import { dataItem } from './../../core/models/data-item';
import { BackendService } from './../../core/backend.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {

  data: dataItem[] = new Array<dataItem>();

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.backendService.get('/data')
    .subscribe( (res: dataItem[]) => {
      this.data = res;
    })
  }

  addRow() {
    this.backendService.post('/data')
    .subscribe( () => {
      location.reload();
    });
  };

}
