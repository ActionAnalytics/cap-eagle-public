import { Routes } from '@angular/router';

import { CommentingTabComponent } from './commenting-tab/commenting-tab.component';
import { DecisionsTabComponent } from './decisions-tab/decisions-tab.component';
import { CommentsComponent } from './comments/comments.component';
import { DocumentsTabComponent } from './documents/documents-tab.component';
import { DocumentsResolver } from './documents/documents-resolver.service';

export const ProjectRoutes: Routes = [
  {
    path: '',
    redirectTo: 'project',
    pathMatch: 'full'
  },
  {
    path: 'commenting',
    component: CommentingTabComponent
  },
  {
    path: 'documents',
    component: DocumentsTabComponent,
    resolve: {
      documents: DocumentsResolver
    }
  },
  {
    path: 'decisions',
    component: DecisionsTabComponent
  },
  {
    path: 'cp',
    component: CommentsComponent
  }
];
