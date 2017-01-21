import { dataItem } from './../../core/models/data-item';
import { BackendService } from './../../core/backend.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {

  data = [];

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.backendService.getAllData()
    .subscribe( (res: dataItem[]) => {
      this.data = this.processData(res);
    })
  }

  private processData(data: dataItem[]): any[] {

    return data.map(item => item.name);
    
  }

}
