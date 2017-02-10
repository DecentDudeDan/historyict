import { element } from 'protractor';
import { MUrls, PushpinUrls } from './../../core/iconUrls/icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.css']
})
export class IconPickerComponent implements OnInit {

  mIcons: string[] = [];
  pinIcons: string[] = [];
  private MBaseUrl: string = 'http://maps.google.com/mapfiles/ms/micons/';
  private PinBaseUrl: string = 'http://maps.google.com/mapfiles/ms/micons/';

  constructor() { }

  ngOnInit() {
    this.buildIcons();
  }

  buildIcons(): void {

    MUrls.forEach((url: string) => {
      this.mIcons.push(this.MBaseUrl + url);
    });

    console.log(this.mIcons);
  }

}
