import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import * as _ from 'lodash';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { CommentPeriod } from 'app/models/commentperiod';
import { Comment } from 'app/models/comment';
import { Document } from 'app/models/document';
import { User } from 'app/models/user';

@Injectable()
export class ApiService {
  public token: string;
  public apiPath: string;
  public env: 'local' | 'dev' | 'test' | 'prod';

  constructor(private http: Http) {
    const { hostname } = window.location;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    switch (hostname) {
      case 'localhost':
        // Local
        this.apiPath = 'http://localhost:3000/api/public';
        this.env = 'local';
        break;

      case 'www-nrts-prc-dev-public.pathfinder.gov.bc.ca':
        // Dev
        this.apiPath = 'https://prc-api-dev.pathfinder.gov.bc.ca/api/public';
        this.env = 'dev';
        break;

      case 'www-nrts-prc-test-public.pathfinder.gov.bc.ca':
        // Test
        this.apiPath = 'https://prc-api-test.pathfinder.gov.bc.ca/api/public';
        this.env = 'test';
        break;

      default:
        // Prod
        this.apiPath = 'https://';
        this.env = 'prod';
    };
  }

  //
  // Applications
  //
  getApplications() {
    const fields = [
      'name',
      // 'type',
      // 'subtype',
      // 'stageCode',
      'purpose',
      'subpurpose',
      '_proponent',
      // 'areaHectares',
      // 'latitude',
      // 'longitude',
      // 'location',
      // 'region',
      // 'description',
      // 'legalDescription',
      'status',
      // 'projectDate',
      // 'businessUnit',
      // 'cl_files',
      // 'commodityType',
      // 'commodity',
      // 'commodities'
    ];
    let queryString = 'application?fields=';
    _.each(fields, function (f) {
      queryString += f + '|';
    });
    // Trim the last |
    queryString = queryString.replace(/\|$/, '');
    return this.get(queryString);
  }

  getApplication(id: string) {
    const fields = [
      'name',
      'type',
      'subtype',
      'stageCode',
      'purpose',
      'subpurpose',
      '_proponent',
      'areaHectares',
      'latitude',
      'longitude',
      'location',
      'region',
      'description',
      'legalDescription',
      'status',
      'projectDate',
      'businessUnit',
      'cl_files',
      'commodityType',
      'commodity',
      'commodities'
    ];
    let queryString = 'application/' + id + '?fields=';
    _.each(fields, function (f) {
      queryString += f + '|';
    });
    // Trim the last |
    queryString = queryString.replace(/\|$/, '');
    return this.get(queryString);
  }

  //
  // Organizations
  //
  getOrganization(id: string) {
    const fields = [
      '_addedBy',
      'code',
      'name'
    ];
    let queryString = 'organization/' + id + '?fields=';
    _.each(fields, function (f) {
      queryString += f + '|';
    });
    // Trim the last |
    queryString = queryString.replace(/\|$/, '');
    return this.get(queryString);
  }

  //
  // Decisions
  //
  getDecision(id: string) {
    const fields = [
      '_addedBy',
      'code',
      'name'
    ];
    let queryString = 'decision/' + id + '?fields=';
    _.each(fields, function (f) {
      queryString += f + '|';
    });
    // Trim the last |
    queryString = queryString.replace(/\|$/, '');
    return this.get(queryString);
  }

  //
  // Comment Periods
  //
  getPeriodsByAppId(appId: string) {
    const fields = [
      '_addedBy',
      '_application',
      'startDate',
      'endDate',
      'description',
      'internal'
    ];
    let queryString = 'commentperiod?isDeleted=false&_application=' + appId + '&fields=';
    _.each(fields, function (f) {
      queryString += f + '|';
    });
    // Trim the last |
    queryString = queryString.replace(/\|$/, '');
    return this.get(queryString);
  }

  getPeriod(id: string) {
    const fields = [
      '_addedBy',
      '_application',
      'startDate',
      'endDate',
      'description',
      'internal'
    ];
    let queryString = 'commentperiod/' + id + '?fields=';
    _.each(fields, function (f) {
      queryString += f + '|';
    });
    // Trim the last |
    queryString = queryString.replace(/\|$/, '');
    return this.get(queryString);
  }

  addCommentPeriod(period: CommentPeriod) {
    const fields = ['_application', 'startDate', 'endDate', 'description'];
    let queryString = 'commentperiod?fields=';
    _.each(fields, function (f) {
      queryString += f + '|';
    });
    // Trim the last |
    queryString = queryString.replace(/\|$/, '');
    return this.post(queryString, period);
  }

  saveCommentPeriod(period: CommentPeriod) {
    const fields = ['_application', 'startDate', 'endDate', 'description'];
    let queryString = 'commentperiod/' + period._id + '?fields=';
    _.each(fields, function (f) {
      queryString += f + '|';
    });
    // Trim the last |
    queryString = queryString.replace(/\|$/, '');
    return this.put(queryString, period);
  }

  deleteCommentPeriod(period: CommentPeriod) {
    const fields = ['_application', 'startDate', 'endDate', 'description'];
    let queryString = 'commentperiod/' + period._id + '?fields=';
    _.each(fields, function (f) {
      queryString += f + '|';
    });
    // Trim the last |
    queryString = queryString.replace(/\|$/, '');
    return this.delete(queryString, period);
  }

  //
  // Comments
  //
  getCommentsByPeriodId(periodId: string) {
    const fields = [
      '_addedBy',
      '_commentPeriod',
      'commentNumber',
      'comment',
      'commentAuthor',
      '_documents',
      'review',
      'dateAdded',
      'commentStatus'
    ];
    let queryString = 'comment?isDeleted=false&_commentPeriod=' + periodId + '&fields=';
    _.each(fields, function (f) {
      queryString += f + '|';
    });
    // Trim the last |
    queryString = queryString.replace(/\|$/, '');
    return this.get(queryString);
  }

  getComment(id: string) {
    const fields = [
      '_addedBy',
      '_commentPeriod',
      'commentNumber',
      'comment',
      'commentAuthor',
      '_documents',
      'review',
      'dateAdded',
      'commentStatus'
    ];
    let queryString = 'comment/' + id + '?fields=';
    _.each(fields, function (f) {
      queryString += f + '|';
    });
    // Trim the last |
    queryString = queryString.replace(/\|$/, '');
    return this.get(queryString);
  }

  addComment(comment: Comment) {
    // TODO: add comment documents
    const fields = ['comment', 'commentAuthor'];
    let queryString = 'comment?fields=';
    _.each(fields, function (f) {
      queryString += f + '|';
    });
    // Trim the last |
    queryString = queryString.replace(/\|$/, '');
    return this.post(queryString, comment);
  }

  saveComment(comment: Comment) {
    const fields = ['review', 'commentStatus'];
    let queryString = 'comment/' + comment._id + '?fields=';
    _.each(fields, function (f) {
      queryString += f + '|';
    });
    // Trim the last |
    queryString = queryString.replace(/\|$/, '');
    return this.put(queryString, comment);
  }

  //
  // Documents
  //
  getDocumentsByAppId(appId: string) {
    const fields = [
      '_application',
      'documentFileName',
      'displayName',
      'internalURL',
      'internalMime'
    ];
    let queryString = 'document?_application=' + appId + '&fields=';
    _.each(fields, function (f) {
      queryString += f + '|';
    });
    // Trim the last |
    queryString = queryString.replace(/\|$/, '');
    return this.get(queryString);
  }

  getDocument(id: string) {
    const fields = [
      '_application',
      'documentFileName',
      'displayName',
      'internalURL',
      'internalMime'
    ];
    let queryString = 'document/' + id + '?fields=';
    _.each(fields, function (f) {
      queryString += f + '|';
    });
    // Trim the last |
    queryString = queryString.replace(/\|$/, '');
    return this.get(queryString);
  }

  getDocumentUrl(document: Document): string {
    return this.apiPath + '/document/' + document._id + '/download';
  }

  // TODO: saveDocument()

  //
  // Users
  //
  getAllUsers() {
    const fields = ['displayName', 'username', 'firstName', 'lastName'];
    let queryString = 'user?fields=';
    _.each(fields, function (f) {
      queryString += f + '|';
    });
    // Trim the last |
    queryString = queryString.replace(/\|$/, '');
    return this.get(queryString);
  }

  saveUser(user: User) {
    const fields = ['displayName', 'username', 'firstName', 'lastName'];
    let queryString = 'user/' + user._id + '?fields=';
    _.each(fields, function (f) {
      queryString += f + '|';
    });
    // Trim the last |
    queryString = queryString.replace(/\|$/, '');
    return this.put(queryString, user);
  }

  addUser(user: User) {
    const fields = ['displayName', 'username', 'firstName', 'lastName'];
    let queryString = 'user?fields=';
    _.each(fields, function (f) {
      queryString += f + '|';
    });
    // Trim the last |
    queryString = queryString.replace(/\|$/, '');
    return this.post(queryString, user);
  }

  public handleError(error: any) {
    const reason = error.message ? error.message : (error.status ? `${error.status} - ${error.statusText}` : 'Server error');
    console.log(reason);
    return Observable.throw(reason);
  }

  //
  // Private
  //
  private get(apiRoute: string, options?: Object) {
    return this.http.get(`${this.apiPath}/${apiRoute}`, options || null);
  }

  private put(apiRoute: string, body?: Object, options?: Object) {
    return this.http.put(`${this.apiPath}/${apiRoute}`, body || null, options || null);
  }

  private post(apiRoute: string, body?: Object, options?: Object) {
    return this.http.post(`${this.apiPath}/${apiRoute}`, body || null, options || null);
  }
  private delete(apiRoute: string, body?: Object, options?: Object) {
    return this.http.delete(`${this.apiPath}/${apiRoute}`, options || null);
  }
}
