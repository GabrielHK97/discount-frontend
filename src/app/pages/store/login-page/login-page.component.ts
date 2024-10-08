import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { StoreService } from '../../../services/store.service';
import { ILogin } from '../../../utils/interfaces/login.interface';
import { IStatus } from '../../../utils/interfaces/status.interface';

@Component({
  selector: 'app-store-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    CommonModule,
  ],
  providers: [provideNgxMask()],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class StoreLoginPageComponent {
  loginForm: FormGroup;
  twofaForm: FormGroup;
  hidePassword: boolean = true;
  twofa: boolean = false;

  constructor(
    private storeService: StoreService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.twofaForm = new FormGroup({
      twofa: new FormControl('', Validators.required),
    });
  }

  async ngOnInit() {
    const isAuthenticated = await this.storeService.authenticate();
    if (isAuthenticated) {
      this.router.navigate(['/store/dashboard']);
    }
  }

  switchPasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  async login(): Promise<void> {
    try {
      const loginDto: ILogin = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
      const response = await this.storeService.login(loginDto);
      if ((response.data as IStatus).status) {
        this.twofa = true;
      } else {
        this.router.navigate(['/store/dashboard']);
      }
    } catch (error: any) {
      const snackBarRef = this.snackBar.open(error.error.message, 'Fechar', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      snackBarRef.onAction().subscribe(() => {
        this.snackBar.dismiss();
      });
    }
  }

  async loginTwoFa(): Promise<void> {
    try {
      const twofaDto: ILogin = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
        twofa: this.twofaForm.value.twofa,
      };
      await this.storeService.login(twofaDto);
      this.router.navigate(['/store/dashboard']);
    } catch (error: any) {
      const snackBarRef = this.snackBar.open(error.error.message, 'Fechar', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      snackBarRef.onAction().subscribe(() => {
        this.snackBar.dismiss();
      });
    }
  }

  redirectToCreate(): void {
    this.router.navigate(['store/create']);
  }
}
