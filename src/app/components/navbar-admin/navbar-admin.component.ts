import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css',
})
export class AdminNavbarComponent {
  constructor(private adminService: AdminService, private router: Router) {}

  async logout(): Promise<void> {
    await this.adminService.logout();
    this.router.navigate(['/admin']);
  }

  redirect(path: string): void {
    this.router.navigate([path]);
  }
}
