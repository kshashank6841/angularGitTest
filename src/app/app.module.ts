import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { StoreModule } from '@ngrx/store';

// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
// import { EffectsModule } from '@ngrx/effects';

import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { propertyReducer } from './components/state/property.reducer';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    PropertyDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    MdbCheckboxModule,
    StoreModule.forRoot({ propertyReducer: propertyReducer }),
    MDBBootstrapModule.forRoot()
 
 
    // !environment.production ? StoreDevtoolsModule.instrument() : [],
    // EffectsModule.forRoot([UserEffects])
  ],
  providers: [],
  schemas:[NO_ERRORS_SCHEMA],
  exports:[AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
