import { ResourcesComponent } from './components/resources/resources.component';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { permissionGuard } from './core/services/user.permission.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { appRoutes } from './app.routes';
import { MarkerService } from './core/services/marker.service';
import { BackendService } from './core/services/backend.service';
import { HistoryService } from './core/services/history.service';
import { UserService } from './core/services/user.service';
import { AuthenticationService } from './core/services/authentication.service';
import { IconPickerComponent } from './components/icon-picker/icon-picker.component';
import { TabsModule } from 'ngx-bootstrap';
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
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import { Routes, RouterModule } from '@angular/router';;
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ResourcesComponent,
    PageNotFoundComponent,
    AdminDashboardComponent,
    NavBarComponent,
    MapComponent,
    TimelineComponent,
    IconPickerComponent,
    LoginComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
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
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB4ASKPhyU9yq1UfTGfMjNGKHsNqrnFg3c'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
