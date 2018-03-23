import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api';
import { Search } from 'app/models/search';
import { Feature } from 'app/models/feature';
import { Client } from 'app/models/client';

@Injectable()
export class SearchService {
  private clients: Array<Client> = null;
  private search: Search = null;
  private features: Array<Feature> = null;

  constructor(private api: ApiService) { }

  getClientsByDispositionId(dispositionId: number, forceReload: boolean = false): Observable<Client[]> {
    if (this.clients && this.clients.length > 0 && +this.clients[0].ORGANIZATIONS_LEGAL_NAME === dispositionId && !forceReload) {
      return Observable.of(this.clients);
    }

    return this.api.getClientsInfoByDispositionId(dispositionId)
      .map(res => {
        const clients = res.text() ? res.json() : [];
        clients.forEach((client, i) => {
          clients[i] = new Client(client);
        });
        return clients;
      })
      .map((clients: Client[]) => {
        if (clients.length === 0) {
          return [];
        }

        this.clients = clients;
        return this.clients;
      });
  }

  getByCLFile(clfile: string, forceReload: boolean = false): Observable<Search> {
    if (this.search && this.search._id === clfile && !forceReload) {
      return Observable.of(this.search);
    }

    return this.api.getBCGWCrownLands(clfile)
      .map(res => {
        return res.text() ? new Search(res.json()) : null;
      })
      .map((search: Search) => {
        if (!search) { return null; }

        this.search = search;
        return this.search;
      });
  }

  getByDTID(dtid: string, forceReload: boolean = false): Observable<Feature[]> {
    // TODO: fix - map error when using cached data!?
    // if (this.features && this.features[0].properties.DISPOSITION_TRANSACTION_SID === +dtid && !forceReload) {
    //   console.log('cached features =', this.features);
    //   return Observable.of(this.features);
    // }

    console.log('dtid =', dtid);

    return this.api.getBCGWDispositionTransactionId(dtid)
      .map(res => {
        const results = res.text() ? new Search(res.json()) : null;
        return results.features;
      })
      .map((features: Feature[]) => {
        if (!features) { return null; }

        console.log('new features =', features);
        this.features = features;
        return this.features;
      });
  }
}
