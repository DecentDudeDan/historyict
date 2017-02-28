import { MarkerService } from './services/marker.service';
import { HistoryService } from './services/history.service';
import { BackendService } from './services/backend.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [BackendService, HistoryService, MarkerService]
})
export class CoreModule { }
