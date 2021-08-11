import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const routes: Routes = [
  { path: 'property-details', component: PropertyDetailsComponent},
  { path: 'dashboard', component: DashboardComponent },
  {path: '',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),   BrowserModule,
    BrowserAnimationsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
