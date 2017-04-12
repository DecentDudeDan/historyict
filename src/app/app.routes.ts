import { canLoadWithPermissions } from './core/services/user.permission.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { MapComponent } from './components/map/map.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: 'map', component: MapComponent },
  { path: '', component: WelcomePageComponent },
  { path: 'account', component: LoginComponent },
  { path: 'admin', component: AdminDashboardComponent, canLoad: ['canLoadWithPermissions'] },
  { path: '**', component: PageNotFoundComponent }
];