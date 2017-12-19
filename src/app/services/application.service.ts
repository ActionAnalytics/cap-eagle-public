import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Api } from './api';

import { Application } from '../models/application';
// import { CollectionsList } from '../models/collection';

@Injectable()
export class ApplicationService {
  application: Application;

  constructor(private api: Api) { }

  getAll() {
    return this.api.getApplications()
      .map((res: Response) => {
        const applications = res.text() ? res.json() : [];

        applications.forEach((application, index) => {
          applications[index] = new Application(application);
        });

        return applications;
      })
      .catch(this.api.handleError);
  }

  getById(_id: string): Observable<Application> {
    // return this.application = null;

    // Grab the application data first
    return this.api.getApplicationById(_id)
      .map((res: Response) => {
        return res.text() ? new Application(res.json()) : null;
      })
      .map((application: Application) => {
        if (!application) { return; }

        this.application = application;

      //  this.application.collections = new CollectionsList();

      //   // Now grab the MEM collections
      //   this.api.getProjectCollectionsMEM(this.project.code)
      //     .map((res: Response) => this.processCollections(res))
      //     .subscribe(memCollections => {
      //       // Push them into the project
      //       memCollections.forEach(collection => {
      //         this.addCollection(this.project.collections, collection);
      //       });
      //     });

      //   // Get EPIC collections next.
      //   // Note: there may be multiple (or no) EPIC projects associated with this MEM project.
      //   this.project.epicProjectCodes.forEach(epicProjectCode => {
      //     this.api.getProjectCollectionsEPIC(epicProjectCode)
      //       .map((res: Response) => this.processCollections(res))
      //       .subscribe(epicCollections => {
      //         // Push them into the project
      //         epicCollections.forEach(collection => {
      //           this.addCollection(this.project.collections, collection);
      //         });
      //       });
      //   });

        return this.application;
      })
      .catch(this.api.handleError);
  }
}
