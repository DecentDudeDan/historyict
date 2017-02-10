import { History } from './../../core/models/history';
import { BackendService } from './../../core/backend.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  historys: History[];

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.getHistorys();
  }

  getHistorys(): void {
    this.backendService.get('/historys')
    .subscribe((res: History[]) => {
      console.log(res);
      this.historys = res;
    })
  }

  hasHistory(): boolean {
    return this.historys != [];
  }

}
