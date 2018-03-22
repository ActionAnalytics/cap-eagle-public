import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageScrollConfig } from 'ng2-page-scroll';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs/Subscription';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ApiService } from './services/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  loggedIn: String;
  hostname: String;
  private sub: Subscription;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private api: ApiService
  ) {
    // Used for sharing links.
    this.hostname = api.apiPath; // TODO: Wrong

    PageScrollConfig.defaultScrollOffset = 50;
    PageScrollConfig.defaultEasingLogic = {
      ease: (t: number, b: number, c: number, d: number): number => {
        // easeInOutExpo easing
        if (t === 0) {
          return b;
        }
        if (t === d) {
          return b + c;
        }
        if ((t /= d / 2) < 1) {
          return c / 2 * Math.pow(2, 8 * (t - 1)) + b;
        }
        return c / 2 * (-Math.pow(2, -8 * --t) + 2) + b;
      }
    };
  }

  ngOnInit() {
    this.loggedIn = this.cookieService.get('loggedIn');

    this.router.events.subscribe((url: any) => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  }

  showBanner(): boolean {
    return !sessionStorage.hidePrcPilotBanner;
  }

  hideBanner() {
    sessionStorage.hidePrcPilotBanner = true;
  }
}
