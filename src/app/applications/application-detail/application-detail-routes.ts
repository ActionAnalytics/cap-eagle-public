import { Routes } from '@angular/router';

import { ApplicationTabContentComponent } from './application/application-tab-content.component';
import { CommentsTabContentComponent } from './comments/comments-tab-content.component';
import { DecisionsTabContentComponent } from './decisions/decisions-tab-content.component';
// import { ApplicationResolver, CommentsResolver, DecisionsResolver } from './application-detail-resolver.service';

export const TAB_NAV_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'application',
        pathMatch: 'full'
    },
    {
        path: 'application',
        component: ApplicationTabContentComponent,
        // FUTURE: implement resolver for faster-seeming page loads
        // resolve: {
        //   documents: ApplicationResolver
        // }
    },
    {
        path: 'comments',
        component: CommentsTabContentComponent,
        // FUTURE: implement resolver for faster-seeming page loads
        // resolve: {
        //   comments: CommentsResolver
        // }
    },
    {
        path: 'decisions',
        component: DecisionsTabContentComponent,
        // FUTURE: implement resolver for faster-seeming page loads
        // resolve: {
        //   decision: DecisionsResolver
        // }
    }
];
