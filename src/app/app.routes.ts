import { Routes } from '@angular/router';
import { AdminLoginPageComponent } from './pages/admin/login-page/login-page.component';
import { AdminProfilePageComponent } from './pages/admin/profile-page/profile-page.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminDashboardPageComponent } from './pages/admin/dashboard-page/dashboard-page.component';
import { StoreLoginPageComponent } from './pages/store/login-page/login-page.component';
import { StoreCreatePageComponent } from './pages/store/create-store-page/create-store-page.component';
import { StoreDashboardPageComponent } from './pages/store/dashboard-page/dashboard-page.component';
import { StoreProfilePageComponent } from './pages/store/profile-page/profile-page.component';
import { StoreCouponsPageComponent } from './pages/store/coupons-page/coupons-page.component';
import { StoreGuard } from './guards/store.guard';
import { StoreCreateCouponPageComponent } from './pages/store/create-coupon-page/create-coupon-page.component';

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
  },
  {
    path: 'store',
    component: StoreLoginPageComponent
  },
  {
    path: 'store/create',
    component: StoreCreatePageComponent,
  },
  {
    path: 'store/dashboard',
    component: StoreDashboardPageComponent,
    canActivate: [StoreGuard]
  },
  {
    path: 'store/profile',
    component: StoreProfilePageComponent,
    canActivate: [StoreGuard]
  },
  {
    path: 'store/coupons',
    component: StoreCouponsPageComponent,
    canActivate: [StoreGuard]
  },
  {
    path: 'store/coupons/create',
    component: StoreCreateCouponPageComponent,
    canActivate: [StoreGuard]
  }
];
