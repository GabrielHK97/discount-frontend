import { Routes } from '@angular/router';
import { AdminLoginPageComponent } from './pages/admin/login-page/login-page.component';
import { AdminProfilePageComponent } from './pages/admin/profile-page/profile-page.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminDashboardPageComponent } from './pages/admin/dashboard-page/dashboard-page.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLoginPageComponent,
  },
  {path: 'admin/profile',
    component: AdminProfilePageComponent,
    canActivate: [AdminGuard]
  },
  {path: 'admin/dashboard',
    component: AdminDashboardPageComponent,
    canActivate: [AdminGuard]
  }
];
