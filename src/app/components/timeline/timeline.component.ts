import { AuthenticationService } from './../../core/services/authentication.service';
import { Marker } from './../../core/models/marker';
import { History, PermissionType } from './../../core/models';
import { HistoryService } from './../../core/services/history.service';
import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, ViewEncapsulation } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnChanges, OnInit, AfterViewInit {

  private dateFormat = require('../../../../node_modules/dateformat');

  @Input() marker: Marker;
  @Input() mobile: boolean;
  @ViewChild('fileUpload') fileUpload: ElementRef;
  formData: FormData = new FormData();
  historys: History[] = [];
  uploadedFiles: any[] = [];
  visible: boolean;
  loggedIn: boolean;
  loading: boolean = false;
  currentHistory: History = new History();
  keywordSuggestions: string[] = ['Black history', '1800"s', '1900"s', '2000"s', 'Kansas', 'Native Americans', "Indians"];
  filteredKeywords: string[];

  constructor(private historyService: HistoryService, public auth: AuthenticationService) {
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
  
  ngAfterViewInit() {
    const input = this.fileUpload.nativeElement;
    input.onchange = () => {
      if (input.files[0] !== null) {
        this.getFileData(input.files[0]);
      }
    };
  }

  getFileData(file: File) {
    if (file == null) {
      return;
    }

    if (this.isValidFile(file)) {
      this.formData.append('id', this.marker.id);
      this.formData.append('file', file, file.name);
    }
  }

  private isValidFile(file: File): boolean {
    if (file.type.indexOf('image/') === -1) {
      return false;
    }
    return true;
  }

  upload() {
    if (this.formData.get('id')) {
      this.historyService.upload(this.formData).subscribe(res => {
        const json = JSON.parse(res._body);
        const imageLocation =json.location;
        if (this.currentHistory.images) {
          this.currentHistory.images.push(imageLocation);
        } else {
          this.currentHistory.images = [imageLocation];
        }
        this.formData = new FormData();
        this.fileUpload.nativeElement.value = null;
      });
    }
  }

  addHistory(): void {
    this.currentHistory = new History();
    this.visible = true;
  }

  editHistory(): void {
    this.visible = true;
  }

  removeImageSrc(index) {
    this.currentHistory.images.splice(index, 1);
  }

  getHistory(): void {
    this.loading = true;
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
        this.loading = false;
      }, (err) => {
        console.log(err);
        this.loading = false;
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
      this.currentHistory.author = this.auth.userInfo.username;
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
        });
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
