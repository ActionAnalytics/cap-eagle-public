import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { CookieService } from 'ngx-cookie-service';
import { TagInputModule } from 'ngx-chips';

// components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ObjectFilterPipe } from './object-filter.pipe';
import { ProcessComponent } from './process/process.component';
import { ContactComponent } from './contact/contact.component';
import { SearchComponent } from './search/search.component';

// services
import { ApplicationService } from './services/application.service';
import { ProponentService } from './services/proponent.service';
import { OrganizationService } from './services/organization.service';
import { DocumentService } from './services/document.service';
import { CommentPeriodService } from './services/commentperiod.service';
import { CommentService } from './services/comment.service';
import { DecisionService } from './services/decision.service';

// feature modules
import { MapModule } from './map/map.module';
import { ApplicationsModule } from './applications/applications.module';
import { CommentPeriod } from 'app/models/commentperiod';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ObjectFilterPipe,
    ProcessComponent,
    ContactComponent,
    SearchComponent
  ],
  imports: [
    TagInputModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ApplicationsModule,  // <-- module import order matters - https://angular.io/guide/router#module-import-order-matters
    AppRoutingModule,
    NgbModule.forRoot(),
    NgxPaginationModule,
    Ng2PageScrollModule.forRoot(),
    MapModule
  ],
  providers: [
    CookieService,
    ApplicationService,
    ProponentService,
    OrganizationService,
    DocumentService,
    CommentPeriodService,
    CommentService,
    DecisionService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
