import { ResourcesComponent } from './components/resources/resources.component';
import { permissionGuard } from './core/services/user.permission.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', component: MapComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'map', component: MapComponent },
  { path: 'account', component: LoginComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [permissionGuard] },
  { path: '**', component: PageNotFoundComponent }
];