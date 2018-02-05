import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';

import { ApiService } from './api';
// import { Search, SearchArray, SearchTerms } from 'app/models/search';
import { Document } from 'app/models/document';
import { Comment } from 'app/models/comment';
import { Application } from 'app/models/application';
import { Decision } from 'app/models/decision';
// import { Proponent } from 'app/models/proponent';

@Injectable()
export class DocumentService {
  // searchResult: SearchArray;

  constructor(private api: ApiService) { }

  // get all documents for the specified application id
  getAllByApplicationId(appId: string): Observable<Document[]> {
    return this.api.getDocumentsByAppId(appId)
      .map((res: Response) => {
        const documents = res.text() ? res.json() : [];
        documents.forEach((document, i) => {
          documents[i] = new Document(document);
        });
        return documents;
      })
      .catch(this.api.handleError);
  }

  // get all documents for the specified comment
  getAllByComment(comment: Comment): Observable<Document[]> {
    return Observable.of([]);

    // TODO: iterate over comment._documents[]

    // return this.api.getDocumentsByAppId(appId)
    //   .map((res: Response) => {
    //     const documents = res.text() ? res.json() : [];
    //     documents.forEach((document, i) => {
    //       documents[i] = new Document(document);
    //     });
    //     return documents;
    //   })
    //   .catch(this.api.handleError);
  }

  // get all documents for the specified decision
  getAllByDecision(decision: Decision): Observable<Document[]> {
    return Observable.of([]);

    // TODO: iterate over decision._documents[]

    // return this.api.getDocumentsByAppId(appId)
    //   .map((res: Response) => {
    //     const documents = res.text() ? res.json() : [];
    //     documents.forEach((document, i) => {
    //       documents[i] = new Document(document);
    //     });
    //     return documents;
    //   })
    //   .catch(this.api.handleError);
  }

  // get(terms: SearchTerms, applications: Array<Application>, proponents: Array<Proponent>, page: number, limit: number) {
  //   this.searchResult = new SearchArray();

  //   let query = 'search?types=document';
  //   let memProjectQuery = '';
  //   let epicProjectQuery = '';

  //   // Paging
  //   query += '&page=' + page + '&limit=' + limit;

  //   const params = terms.getParams();

  //   // Get the keywords
  //   if (params['keywords']) {
  //     query += '&search=' + params['keywords'];
  //   }

  //   // We change the way we query epic because the only thing we're currently in
  //   // for api/applications/major is the epicCode.  In future we'll be able to change
  //   // this to reference project= in epic.
  //   if (params['applications']) {
  //     const epicQuery = [];
  //     terms.applications.forEach(p => {
  //       p.epicProjectCodes.forEach(c => {
  //         epicQuery.push(c);
  //       });
  //     });
  //     memProjectQuery += '&project=' + params['applications'];
  //     epicProjectQuery += '&projectcode=' + epicQuery;
  //   } else {
  //     // Make sure we query all the applications by default
  //     const projectQuery = [];
  //     const epicQuery = [];
  //     applications.forEach(p => {
  //       projectQuery.push(p._id);
  //       p.epicProjectCodes.forEach(c => {
  //         epicQuery.push(c);
  //       });
  //     });
  //     memProjectQuery += '&project=' + projectQuery;
  //     epicProjectQuery += '&projectcode=' + epicQuery;
  //   }

  //   if (params['proponents']) {
  //     // EPIC needs the string name for proponent, not the objectID
  //     memProjectQuery += '&proponent=' + params['proponents'];

  //     const proponentQ = [];

  //     const props = params['proponents'].split(',');
  //     props.forEach(prop => {
  //       proponents.forEach(p => {
  //         if (p._id === prop) {
  //           // If the AKA field is set, use that - otherwise use the company name
  //           if (p.alsoKnownAs && p.alsoKnownAs !== '') {
  //             proponentQ.push(p.alsoKnownAs);
  //           } else {
  //             proponentQ.push(p.company);
  //           }
  //         }
  //       });
  //     });
  //     if (proponentQ.length > 0) {
  //       epicProjectQuery += '&proponentstring=' + proponentQ;
  //     }
  //   }
  //   if (params['ownerships']) {
  //     // MEM/EPIC needs the string name for ownership, not the objectID

  //     const ownershipQ = [];

  //     const owns = params['ownerships'].split(',');
  //     owns.forEach(prop => {
  //       proponents.forEach(p => {
  //         if (p._id === prop) {
  //           // If the AKA field is set, use that - otherwise use the company name
  //           if (p.alsoKnownAs && p.alsoKnownAs !== '') {
  //             ownershipQ.push(p.alsoKnownAs);
  //           } else {
  //             ownershipQ.push(p.company);
  //           }
  //         }
  //       });
  //     });
  //     if (ownershipQ.length > 0) {
  //       // EPIC doesn't store ownership data right now, search as though we're setting
  //       // the owner/proponent field - remake the prop string to include the specific
  //       // results for EPIC.
  //       if (false === epicProjectQuery.includes('&proponentstring=')) {
  //         epicProjectQuery += '&proponentstring=' + ownershipQ;
  //       } else {
  //         // Tack it on the end
  //         epicProjectQuery += ',' + ownershipQ;
  //       }
  //       memProjectQuery += '&ownership=' + params['ownerships'];
  //     }
  //   }
  //   if (params['datestart']) {
  //     query += '&datestart=' + params['datestart'];
  //   }
  //   if (params['dateend']) {
  //     query += '&dateend=' + params['dateend'];
  //   }

  //   // Field selection
  //   query += '&fields=_id application displayName documentDate description datePosted \
  //   documentCategories collections keywords inspectionReport';
  //   const mem = this.api.getMEM(`v2/${query}${memProjectQuery}`)
  //     .map((res: Response) => {
  //       const data = res.text() ? res.json() : { count: 0, results: [] };
  //       if (data.results) {
  //         data.results.forEach(i => {
  //           i.hostname = this.api.hostnameMEM;
  //         });
  //       }
  //       return data;
  //     });
  //   const epic = this.api.getEPIC(`v3/${query}${epicProjectQuery}`)
  //     .map((res: Response) => {
  //       const data = res.text() ? res.json() : { count: 0, results: [] };
  //       if (data.results) {
  //         data.results.forEach(i => {
  //           i.hostname = this.api.hostnameEPIC;
  //         });
  //       }
  //       return data;
  //     });

  //   // execute in parallel
  //   return Observable.forkJoin([mem, epic]);
  // }
}
