import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AdminService } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ILogin } from '../../../interfaces/login.interface';
import { IStatus } from '../../../interfaces/status.interface';

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
    CommonModule,
  ],
  providers: [provideNgxMask()],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class AdminLoginPageComponent {
  loginForm: FormGroup;
  twofaForm: FormGroup;
  hidePassword: boolean = true;
  twofa: boolean = false;

  constructor(
    private adminService: AdminService,
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
    const isAuthenticated = await this.adminService.authenticate();
    if (isAuthenticated) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  switchPasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  async onSubmitLogin(): Promise<void> {
    try {
      const loginDto: ILogin = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
      const response = await this.adminService.login(loginDto);
      if ((response.data as IStatus).status) {
        this.twofa = true;
      } else {
        this.router.navigate(['/admin/dashboard']);
      }
    } catch (error: any) {
      const snackBarRef = this.snackBar.open(error.error.message, 'Fechar', {
        duration: 2000,
      });
      snackBarRef.onAction().subscribe(() => {
        this.snackBar.dismiss();
      });
    }
  }

  async onSubmitTwofa(): Promise<void> {
    try {
      const twofaDto: ILogin = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
        twofa: this.twofaForm.value.twofa
      };
      await this.adminService.login(twofaDto);
      this.router.navigate(['/admin/dashboard']);
    } catch (error: any) {
      const snackBarRef = this.snackBar.open(error.error.message, 'Fechar', {
        duration: 2000,
      });
      snackBarRef.onAction().subscribe(() => {
        this.snackBar.dismiss();
      });
    }
  }
}
