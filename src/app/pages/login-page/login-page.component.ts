import { Component, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ILogin } from '../../interfaces/login.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { BreakpointsService } from '../../services/breakpoints.service';
// import { Observable } from 'rxjs';
// import { CommonModule } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    // CommonModule
  ],
  providers: [provideNgxMask()],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  hide: boolean = true;

  // isHandsetPortrait$: Observable<boolean>;
  // isHandsetLandscape$: Observable<boolean>;
  // isTabletPortrait$: Observable<boolean>;
  // isTabletLandscape$: Observable<boolean>;
  // isWebPortrait$: Observable<boolean>;
  // isWebLandscape$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    // private breakpointsService: BreakpointsService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      token: new FormControl('', [Validators.min(0), Validators.max(9999)]),
    });
    // this.isHandsetPortrait$ = this.breakpointsService.isHandsetPortrait$;
    // this.isHandsetLandscape$ = this.breakpointsService.isHandsetLandscape$;
    // this.isTabletPortrait$ = this.breakpointsService.isTabletPortrait$;
    // this.isTabletLandscape$ = this.breakpointsService.isTabletLandscape$;
    // this.isWebPortrait$ = this.breakpointsService.isWebPortrait$;
    // this.isWebLandscape$ = this.breakpointsService.isWebLandscape$;
  }


  async ngOnInit() {
    const isAuthenticated = await this.authService.authenticate();
    if (isAuthenticated) {
      this.router.navigate(['/dashboard']);
    }
  }

  switchPasswordVisibility() {
    this.hide = !this.hide;
  }

  async onSubmit(): Promise<void> {
    try {
      const loginDto: ILogin = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
        token: this.loginForm.value.token,
      };
      await this.authService.login(loginDto);
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      const snackBarRef = this.snackBar.open(error.error.message, 'Fechar',{
        duration: 2000
      });
      snackBarRef.onAction().subscribe(() => {
        this.snackBar.dismiss();
      });
    }
  }
}
