import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api';
import { Document } from 'app/models/document';

@Injectable()
export class DocumentService {
  private document: Document = null;

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

  // get all documents for the specified comment id
  getAllByCommentId(commentId: string): Observable<Document[]> {
    return this.api.getDocumentsByCommentId(commentId)
      .map((res: Response) => {
        const documents = res.text() ? res.json() : [];
        documents.forEach((document, i) => {
          documents[i] = new Document(document);
        });
        return documents;
      })
      .catch(this.api.handleError);
  }

  // get all documents for the specified decision id
  getAllByDecisionId(decisionId: string): Observable<Document[]> {
    return this.api.getDocumentsByDecisionId(decisionId)
      .map((res: Response) => {
        const documents = res.text() ? res.json() : [];
        documents.forEach((document, i) => {
          documents[i] = new Document(document);
        });
        return documents;
      })
      .catch(this.api.handleError);
  }

  // get a specific document by its id
  getById(documentId: string, forceReload: boolean = false): Observable<Document> {
    if (this.document && this.document._id === documentId && !forceReload) {
      return Observable.of(this.document);
    }

    return this.api.getDocument(documentId)
      .map((res: Response) => {
        const documents = res.text() ? res.json() : [];
        // return the first (only) document
        return documents.length > 0 ? new Document(documents[0]) : null;
      })
      .map((document: Document) => {
        if (!document) { return null; }

        this.document = document;
        return this.document;
      })
      .catch(this.api.handleError);
  }

  upload(formData: Object): Observable<Document> {
    return this.api.uploadDocument(formData)
      .map((res: Response) => {
        const d = res.text() ? res.json() : null;
        return d ? new Document(d) : null;
      })
      .catch(this.api.handleError);
  }
}
