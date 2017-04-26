import { AuthenticationService } from './../../core/services/authentication.service';
import { Marker } from './../../core/models/marker';
import { History, PermissionType } from './../../core/models';
import { HistoryService } from './../../core/services/history.service';
import { Component, OnInit, Input, OnChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnChanges, OnInit {

  private dateFormat = require('../../../../node_modules/dateformat');

  @Input() marker: Marker;
  historys: History[] = [];
  visible: boolean;
  loggedIn: boolean;
  currentHistory: History = new History();
  keywordSuggestions: string[] = ['Black history', '1800"s', '1900"s', '2000"s', 'Kansas', 'Native Americans', "Indians"];
  filteredKeywords: string[];

  constructor(private historyService: HistoryService, private auth: AuthenticationService) {
  }

  ngOnChanges() {
    if (this.marker.title) {
      this.getHistory();
    }
  }

  ngOnInit() {
    this.isLoggedIn();
    if (this.loggedIn) {
      this.auth.getLoginInfo();
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
    this.historyService.get(this.marker.id)
      .subscribe((res: History[]) => {
        res.forEach((hist: History) => {
          hist.date = this.dateFormat(hist.date, "mm/dd/yyyy");
        })
        this.historys = res;
        this.historys.sort((a, b) => {
          var keyA = new Date(a.date);
          var keyB = new Date(b.date);

          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });
      });
  }

  onSave(): void {
    this.currentHistory.markerId = this.marker.id;

    if (this.currentHistory.created) {
      this.historyService.put(this.currentHistory)
        .subscribe(() => {
          this.getHistory();
        });
    } else {
      if (this.auth.isAdmin() || this.auth.isEditor()) {
        this.currentHistory.approved = new Date();
      }
      this.currentHistory.author = this.auth.getFullName()

      this.historyService.post(this.currentHistory)
        .subscribe(() => {
          this.getHistory();
        });
    }
    this.currentHistory = new History();
    this.visible = false;
  }

  deleteHistory(): void {
    if (this.currentHistory.created) {
      this.historyService.delete(this.currentHistory)
        .subscribe(() => {
          this.getHistory();
          this.currentHistory = new History();
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

  filterKeywordsEvent($event) {
    let query = $event.query;
    this.filteredKeywords = this.filterKeywords(query, this.keywordSuggestions);
  }

  filterKeywords(query, keywords: string[]): string[] {
    let filtered: any[] = [];

    keywords.forEach((keyword: string) => {
      if (keyword.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(keyword);
      }
    });
    return filtered;
  }

  isLoggedIn(): void {
    this.auth.loggedInStatus().subscribe((auth) => {
      this.loggedIn = auth.loggedIn;
    });
  }

}
