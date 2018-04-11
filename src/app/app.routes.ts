import { Routes } from '@angular/router';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppNotFoundComponent } from './app-not-found/app-not-found.component';
import { LoginComponent } from './login/login.component';

export const appRoutes: Routes = [
  { path: '', component: AppHomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: AppNotFoundComponent}
];
