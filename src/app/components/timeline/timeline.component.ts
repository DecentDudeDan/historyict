import { Marker } from './../../core/models/marker';
import { History } from './../../core/models/history';
import { BackendService } from './../../core/backend.service';
import { Component, OnInit, Input, OnChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent implements OnChanges {

  private dateFormat = require('../../../../node_modules/dateformat');

  @Input() marker: Marker;
  historys: History[] = [];
  visible: boolean;
  currentHistory: History = new History();

  constructor(private backendService: BackendService) { }

  ngOnChanges() {
    if(this.marker.title){
      this.getHistory();
    }
  }

  addHistory(): void {
    this.currentHistory = new History();
    this.visible = true;
  }

  editHistory(): void {
    this.visible = true;
  }

  getHistory(): void {
    this.backendService.get('/historys', this.marker.id)
    .subscribe((res: History[]) => {
      console.log(res);
      res.forEach((hist: History) => {
        hist.date = this.dateFormat(hist.date, "mm/dd/yyyy");
      })
      this.historys = res;
    })
  }

  onSave(): void {
    this.currentHistory.markerId = this.marker.id;
    this.currentHistory.date;

    if (this.currentHistory.created === undefined) {
    this.backendService.post('/historys', this.currentHistory)
    .subscribe(() => {
      this.getHistory();
    });
    } else {
      this.backendService.put('/historys', this.currentHistory)
      .subscribe(() => {
        this.getHistory();
      })
    }
    this.currentHistory = new History();
    this.visible = false;
  }

  deleteHistory(): void {
    if (this.currentHistory.created) {
      this.backendService.delete('/historys', this.currentHistory)
      .subscribe(() => {
        this.getHistory();
      })
    }
  }

  onCancel(): void {
    this.visible = false;
  }

  onSelect(history: History): void {
    if (this.currentHistory !== history) {
      this.currentHistory = history;
    } else {
      this.currentHistory = new History();
    }
  }

  isLocal(): boolean {
    return window.location.href.indexOf('localhost') != -1;
  }


}
