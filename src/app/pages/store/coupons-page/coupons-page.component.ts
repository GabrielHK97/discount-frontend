import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { StoreNavbarComponent } from '../../../components/navbar-store/navbar-store.component';
import { CouponService } from '../../../services/coupon.service';
import { ICoupon } from '../../../utils/interfaces/coupon.interface';

@Component({
  selector: 'app-store-coupons-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    StoreNavbarComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './coupons-page.component.html',
  styleUrl: './coupons-page.component.css',
})
export class StoreCouponsPageComponent implements OnInit {
  columns: string[] = ['name', 'description', 'period', 'usage', 'amount'];
  coupons = new MatTableDataSource<ICoupon>([]);

  constructor(private couponService: CouponService, private router: Router) {}

  async ngOnInit() {
    const response = await this.couponService.list({});
    this.coupons = new MatTableDataSource<ICoupon>(response.data);
  }

  redirect(path: string): void {
    this.router.navigate([path]);
  }
}
