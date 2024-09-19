import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [NavbarComponent],
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
