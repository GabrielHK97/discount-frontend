import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BreakpointsService {
  isHandsetPortrait$: Observable<boolean>;
  isHandsetLandscape$: Observable<boolean>;
  isTabletPortrait$: Observable<boolean>;
  isTabletLandscape$: Observable<boolean>;
  isWebPortrait$: Observable<boolean>;
  isWebLandscape$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isHandsetPortrait$ = this.breakpointObserver
    .observe(Breakpoints.HandsetPortrait)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  this.isHandsetLandscape$ = this.breakpointObserver
    .observe(Breakpoints.HandsetLandscape)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    this.isTabletPortrait$ = this.breakpointObserver
      .observe(Breakpoints.TabletPortrait)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );

    this.isTabletLandscape$ = this.breakpointObserver
      .observe(Breakpoints.TabletLandscape)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );

    this.isWebPortrait$ = this.breakpointObserver
      .observe(Breakpoints.WebPortrait)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );

    this.isWebLandscape$ = this.breakpointObserver
      .observe(Breakpoints.WebLandscape)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }
}
