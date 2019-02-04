import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

// modules
import { SharedModule } from 'app/shared.module';
import { ProjectRoutingModule } from './project-routing.module';

// components
import { ProjectComponent } from './project.component';
import { ProjectTabComponent } from './project-tab/project-tab.component';
import { CommentingTabComponent } from './commenting-tab/commenting-tab.component';
import { DecisionsTabComponent } from './decisions-tab/decisions-tab.component';
import { FileUploadComponent } from 'app/file-upload/file-upload.component';
import { DateInputComponent } from 'app/date-input/date-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    NgxPaginationModule,
    RouterModule,
    SharedModule,
    ProjectRoutingModule
  ],
  declarations: [
    ProjectComponent,
    ProjectTabComponent,
    CommentingTabComponent,
    DecisionsTabComponent,
    FileUploadComponent,
    DateInputComponent
  ]
})

export class ProjectModule { }
