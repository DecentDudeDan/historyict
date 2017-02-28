import { MarkerService } from './core/services/marker.service';
import { BackendService } from './core/services/backend.service';
import { HistoryService } from './core/services/history.service';
import { UserService } from './core/services/user.service';
import { AuthenticationService } from './core/services/authentication.service';
import { IconPickerComponent } from './components/icon-picker/icon-picker.component';
import { DialogModule, 
  EditorModule, 
  SharedModule, 
  CalendarModule, 
  GrowlModule, 
  TooltipModule,
  AutoCompleteModule,
  InputTextModule,
  InputMaskModule } from 'primeng/primeng'
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
import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
  { path: 'map', component: MapComponent },
  { path: '', component: WelcomePageComponent },
  { path: 'login', component: LoginComponent },
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
    IconPickerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CalendarModule,
    DialogModule,
    EditorModule,
    GrowlModule,
    TooltipModule,
    AutoCompleteModule,
    InputTextModule,
    InputMaskModule,
    SharedModule,
    FormsModule,
    HttpModule,
    CoreModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB4ASKPhyU9yq1UfTGfMjNGKHsNqrnFg3c'
    })
  ],
  providers: [AuthenticationService, UserService, HistoryService, BackendService, MarkerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
