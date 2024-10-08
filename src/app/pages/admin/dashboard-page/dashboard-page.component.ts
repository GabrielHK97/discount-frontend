import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../../../components/navbar-admin/navbar-admin.component';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard-page',
  standalone: true,
  imports: [AdminNavbarComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
})
export class AdminDashboardPageComponent {
  constructor(
    private adminService: AdminService,
    private router: Router,
  ) {}

  async logout(): Promise<void> {
    await this.adminService.logout();
    this.router.navigate(['/login']);
  }
}
