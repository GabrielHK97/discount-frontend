import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private adminService: AdminService) {}

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.adminService.authenticate();
    if (isAuthenticated) {
      return true;
    } else {
      return false;
    }
  }
}
