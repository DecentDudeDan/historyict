import { IconPickerComponent } from './components/icon-picker/icon-picker.component';
import { MapComponent } from './components/map/map.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import { Routes, RouterModule } from '@angular/router';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TimelineComponent } from './components/timeline/timeline.component';

const appRoutes: Routes = [
  { path: 'map', component: MapComponent },
  { path: '', component: WelcomePageComponent },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    PageNotFoundComponent,
    NavBarComponent,
    MapComponent,
    TimelineComponent,
    IconPickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB4ASKPhyU9yq1UfTGfMjNGKHsNqrnFg3c'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
