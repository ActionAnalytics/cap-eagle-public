import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { ApiService } from './api';
import { CommentPeriod } from 'app/models/commentperiod';

@Injectable()
export class CommentPeriodService {
  private commentPeriod: CommentPeriod = null;
  public commentStatuses = {};

  constructor(private api: ApiService) {
    this.commentStatuses['NOT STARTED'] = 'Commenting Not Started';
    this.commentStatuses['NOT OPEN'] = 'Not Open For Commenting';
    this.commentStatuses['CLOSED'] = 'Commenting Closed';
    this.commentStatuses['OPEN'] = 'Commenting Open';
  }

  // get all comment periods for the specified application id
  getAllByApplicationId(appId: string): Observable<CommentPeriod[]> {
    return this.api.getPeriodsByAppId(appId)
      .map((res: Response) => {
        const periods = res.text() ? res.json() : [];
        periods.forEach((period, i) => {
          periods[i] = new CommentPeriod(period);
        });
        return periods;
      })
      .map((periods: CommentPeriod[]) => {
        if (periods.length === 0) {
          return [] as CommentPeriod[];
        }

        // replace \\n (JSON format) with newlines in each comment period
        periods.forEach((period, i) => {
          if (periods[i].description) {
            periods[i].description = periods[i].description.replace(/\\n/g, '\n');
          }
        });

        return periods;
      })
      .catch(this.api.handleError);
  }

  // get a specific comment period by its id
  getById(periodId: string, forceReload: boolean = false): Observable<CommentPeriod> {
    if (this.commentPeriod && this.commentPeriod._id === periodId && !forceReload) {
      return Observable.of(this.commentPeriod);
    }

    return this.api.getPeriod(periodId)
      .map((res: Response) => {
        const periods = res.text() ? res.json() : [];
        // return the first (only) comment period
        return periods.length > 0 ? new CommentPeriod(periods[0]) : null;
      })
      .map((period: CommentPeriod) => {
        if (!period) { return null as CommentPeriod; }

        // replace \\n (JSON format) with newlines
        if (period.description) {
          period.description = period.description.replace(/\\n/g, '\n');
        }

        this.commentPeriod = period;
        return this.commentPeriod;
      })
      .catch(this.api.handleError);
  }

  // returns current (latest) period
  // assumes if there's an open period, there isn't also future one
  getCurrent(periods: CommentPeriod[]): CommentPeriod {
    const sortedPeriods = periods.sort((a, b) => a.startDate < b.startDate ? 1 : 0);
    return (sortedPeriods.length > 0) ? sortedPeriods[0] : null;
  }

  isOpen(period: CommentPeriod): boolean {
    return (this.getStatus(period) === this.commentStatuses['OPEN']);
  }

  isOpenNotStarted(period: CommentPeriod): boolean {
    const status = this.getStatus(period);
    return (status === this.commentStatuses['OPEN'] || status === this.commentStatuses['NOT STARTED']);
  }

  getStatus(period: CommentPeriod): string {
    if (!period || !period.startDate || !period.endDate) {
      return this.commentStatuses['NOT OPEN'];
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startDate = new Date(period.startDate);
    const endDate = new Date(period.endDate);

    if (endDate < today) {
      return this.commentStatuses['CLOSED'];
    } else if (startDate > today) {
      return this.commentStatuses['NOT STARTED'];
    } else {
      return this.commentStatuses['OPEN'];
    }
  }
}
