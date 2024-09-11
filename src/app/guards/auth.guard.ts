import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.authService.authenticate();
    if (isAuthenticated) {
      return true;
    } else {
      return false;
    }
  }
}
