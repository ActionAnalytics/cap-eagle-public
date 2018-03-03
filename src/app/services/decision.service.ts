import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api';
import { DocumentService } from './document.service';
import { Decision } from 'app/models/decision';

@Injectable()
export class DecisionService {
  private decision: Decision = null;

  constructor(
    private api: ApiService,
    private documentService: DocumentService
  ) { }

  // get decision for the specified application id
  getByApplicationId(appId: string): Observable<Decision> {
    return this.api.getDecisionByAppId(appId)
      .map((res: Response) => {
        const decisions = res.text() ? res.json() : [];
        // return the first (only) decision
        return decisions.length > 0 ? new Decision(decisions[0]) : null;
      })
      .map((decision: Decision) => {
        if (!decision) { return null; }

        // now grab the decision documents
        this.documentService.getAllByDecisionId(decision._id).subscribe(
          documents => decision.documents = documents,
          error => console.log(error)
        );

        return decision;
      })
      .catch(this.api.handleError);
  }

  // get a specific decision by its id
  getById(decisionId): Observable<Decision> {
    if (this.decision && this.decision._id === decisionId) {
      return Observable.of(this.decision);
    }

    return this.api.getDecision(decisionId)
      .map((res: Response) => {
        const decisions = res.text() ? res.json() : [];
        // return the first (only) decision
        return decisions.length > 0 ? new Decision(decisions[0]) : null;
      })
      .map((decision: Decision) => {
        if (!decision) { return null; }

        // now grab the decision documents
        this.documentService.getAllByDecisionId(decision._id).subscribe(
          documents => decision.documents = documents,
          error => console.log(error)
        );

        this.decision = decision;
        return this.decision;
      })
      .catch(this.api.handleError);
  }
}
