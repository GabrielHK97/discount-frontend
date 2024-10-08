import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { StoreService } from '../services/store.service';

@Injectable({
  providedIn: 'root',
})
export class StoreGuard implements CanActivate {
  constructor(private storeService: StoreService) {}

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.storeService.authenticate();
    if (isAuthenticated) {
      return true;
    } else {
      return false;
    }
  }
}