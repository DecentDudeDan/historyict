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

  @Input() marker: Marker;
  historys: History[] = [];
  visible: boolean;
  newHistory: History = new History();

  constructor(private backendService: BackendService) { }

  ngOnChanges() {
    this.getHistory();
  }

  showDialog(): void {
    this.visible = true;
  }

  getHistory(): void {
    this.backendService.get('/historys', this.marker.id)
    .subscribe((res: History[]) => {
      console.log(res);
      this.historys = res;
    })
  }

  onSave(): void {
    this.newHistory.markerId = this.marker.id;

    this.backendService.post('/historys', this.newHistory)
    .subscribe(() => {
      this.getHistory();
    });
    this.newHistory = new History();
    this.visible = false;
  }

  onCancel(): void {
    this.visible = false;
  }


}
