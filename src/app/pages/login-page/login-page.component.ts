import { Component } from '@angular/core';
// import { BreakpointsService } from '../../services/breakpoints.service';
// import { Observable } from 'rxjs';
// import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login-page',
  standalone: true,
  imports: [
    // CommonModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {

  // isHandsetPortrait$: Observable<boolean>;
  // isHandsetLandscape$: Observable<boolean>;
  // isTabletPortrait$: Observable<boolean>;
  // isTabletLandscape$: Observable<boolean>;
  // isWebPortrait$: Observable<boolean>;
  // isWebLandscape$: Observable<boolean>;

  constructor() // private breakpointsService: BreakpointsService
  {
    // this.isHandsetPortrait$ = this.breakpointsService.isHandsetPortrait$;
    // this.isHandsetLandscape$ = this.breakpointsService.isHandsetLandscape$;
    // this.isTabletPortrait$ = this.breakpointsService.isTabletPortrait$;
    // this.isTabletLandscape$ = this.breakpointsService.isTabletLandscape$;
    // this.isWebPortrait$ = this.breakpointsService.isWebPortrait$;
    // this.isWebLandscape$ = this.breakpointsService.isWebLandscape$;
  }
}
