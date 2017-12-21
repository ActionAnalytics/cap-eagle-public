import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { Api } from './api';

import { Search, SearchArray, SearchTerms } from '../models/search';
import { Application } from '../models/application';
import { Document } from '../models/document';
import { Proponent } from '../models/proponent';

@Injectable()
export class DocumentService {
  // searchResult: SearchArray;

  constructor(private api: Api) { }

  getDocuments(appId: string) {
    this.api.getDocuments(appId)
      .map((response: Response) => <Document[]>response.json().data)
      .catch(this.handleError);

    return [
      new Document({ _id: 1, displayName: 'first' }),
      new Document({ _id: 2, displayName: 'second' }),
      new Document({ _id: 3, displayName: 'third' })
    ];
  }

  private handleError(error: Response) {
    const msg = `Status code ${error.status} on url ${error.url}`;
    console.error(msg);
    // return Observable.throw(error.json().error || 'Server error');
    return Observable.throw(msg);
  }

  get(terms: SearchTerms, applications: Array<Application>, proponents: Array<Proponent>, page: number, limit: number) {
    return null;
    // this.searchResult = new SearchArray();

    // let query = 'search?types=document';
    // let memApplicationQuery = '';
    // let epicApplicationQuery = '';

    // // Paging
    // query += '&page=' + page + '&limit=' + limit;

    // const params = terms.getParams();

    // // Get the keywords
    // if (params['keywords']) {
    //   query += '&search=' + params['keywords'];
    // }

    // // We change the way we query epic because the only thing we're currently in
    // // for api/applications/major is the epicCode.  In future we'll be able to change
    // // this to reference application= in epic.
    // if (params['applications']) {
    //   const epicQuery = [];
    //   terms.applications.forEach(p => {
    //     p.epicApplicationCodes.forEach(c => {
    //       epicQuery.push(c);
    //     });
    //   });
    //   memApplicationQuery += '&application=' + params['applications'];
    //   epicApplicationQuery += '&applicationcode=' + epicQuery;
    // } else {
    //   // Make sure we query all the applications by default
    //   const applicationQuery = [];
    //   const epicQuery = [];
    //   applications.forEach(p => {
    //     applicationQuery.push(p._id);
    //     p.epicApplicationCodes.forEach(c => {
    //       epicQuery.push(c);
    //     });
    //   });
    //   memApplicationQuery += '&application=' + applicationQuery;
    //   epicApplicationQuery += '&applicationcode=' + epicQuery;
    // }

    // if (params['proponents']) {
    //   // EPIC needs the string name for proponent, not the objectID
    //   memApplicationQuery += '&proponent=' + params['proponents'];

    //   const proponentQ = [];

    //   const props = params['proponents'].split(',');
    //   props.forEach(prop => {
    //     proponents.forEach(p => {
    //       if (p._id === prop) {
    //         // If the AKA field is set, use that - otherwise use the company name
    //         if (p.alsoKnownAs && p.alsoKnownAs !== '') {
    //           proponentQ.push(p.alsoKnownAs);
    //         } else {
    //           proponentQ.push(p.company);
    //         }
    //       }
    //     });
    //   });
    //   if (proponentQ.length > 0) {
    //     epicApplicationQuery += '&proponentstring=' + proponentQ;
    //   }
    // }
    // if (params['ownerships']) {
    //   // MEM/EPIC needs the string name for ownership, not the objectID

    //   const ownershipQ = [];

    //   const owns = params['ownerships'].split(',');
    //   owns.forEach(prop => {
    //     proponents.forEach(p => {
    //       if (p._id === prop) {
    //         // If the AKA field is set, use that - otherwise use the company name
    //         if (p.alsoKnownAs && p.alsoKnownAs !== '') {
    //           ownershipQ.push(p.alsoKnownAs);
    //         } else {
    //           ownershipQ.push(p.company);
    //         }
    //       }
    //     });
    //   });
    //   if (ownershipQ.length > 0) {
    //     // EPIC doesn't store ownership data right now, search as though we're setting
    //     // the owner/proponent field - remake the prop string to include the specific
    //     // results for EPIC.
    //     if (false === epicApplicationQuery.includes('&proponentstring=')) {
    //       epicApplicationQuery += '&proponentstring=' + ownershipQ;
    //     } else {
    //       // Tack it on the end
    //       epicApplicationQuery += ',' + ownershipQ;
    //     }
    //     memApplicationQuery += '&ownership=' + params['ownerships'];
    //   }
    // }
    // if (params['datestart']) {
    //   query += '&datestart=' + params['datestart'];
    // }
    // if (params['dateend']) {
    //   query += '&dateend=' + params['dateend'];
    // }

    // // Field selection
    // query += '&fields=_id application displayName documentDate description datePosted \
    // documentCategories collections keywords inspectionReport';
    // const mem = this.api.getMEM(`v2/${query}${memApplicationQuery}`)
    //   .map((res: Response) => {
    //     const data = res.text() ? res.json() : { count: 0, results: [] };
    //     if (data.results) {
    //       data.results.forEach(i => {
    //         i.hostname = this.api.hostnameMEM;
    //       });
    //     }
    //     return data;
    //   });
    // const epic = this.api.getEPIC(`v3/${query}${epicApplicationQuery}`)
    //   .map((res: Response) => {
    //     const data = res.text() ? res.json() : { count: 0, results: [] };
    //     if (data.results) {
    //       data.results.forEach(i => {
    //         i.hostname = this.api.hostnameEPIC;
    //       });
    //     }
    //     return data;
    //   });

    // return Observable.forkJoin([mem, epic]);
  }
}
