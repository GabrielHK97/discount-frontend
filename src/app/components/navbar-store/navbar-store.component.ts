import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-store-navbar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './navbar-store.component.html',
  styleUrl: './navbar-store.component.css',
})
export class StoreNavbarComponent {
  constructor(private storeService: StoreService, private router: Router) {}

  async logout(): Promise<void> {
    await this.storeService.logout();
    this.router.navigate(['/store']);
  }

  redirect(path: string): void {
    this.router.navigate([path]);
  }
}
