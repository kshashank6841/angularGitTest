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
    StoreModule.forRoot({ propertyReducer: propertyReducer })
 
 
    // !environment.production ? StoreDevtoolsModule.instrument() : [],
    // EffectsModule.forRoot([UserEffects])
  ],
  providers: [],
  schemas:[NO_ERRORS_SCHEMA],
  exports:[AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
