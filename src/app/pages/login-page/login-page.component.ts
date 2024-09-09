import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from './services/login.service';
import { LoginDto } from './dto/login.dto';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  loginForm: FormGroup;
  message: string = '';

  constructor(private loginService: LoginService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      token: new FormControl(''),
    });
  }

  onSubmit() {
    const loginDto: LoginDto = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      token: this.loginForm.value.token,
    };
    this.loginService.login(loginDto).subscribe({
      error: (err) => {
        this.message = err.error.message; 
      },
      complete: () => {
        console.log('Request complete');
      },
    });
  }
}
