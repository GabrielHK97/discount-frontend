import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, merge, startWith, switchMap } from 'rxjs';
import { StoreNavbarComponent } from '../../../components/navbar-store/navbar-store.component';
import { CouponService } from '../../../services/coupon.service';
import { ICoupon } from '../../../utils/interfaces/coupon.interface';

@Component({
  selector: 'app-store-coupons-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    StoreNavbarComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './coupons-page.component.html',
  styleUrl: './coupons-page.component.css',
})
export class StoreCouponsPageComponent implements AfterViewInit {
  columns: string[] = [
    'name',
    'description',
    'period',
    'limitPerUser',
    'usage',
    'amount',
  ];
  isLoadingResults = true;
  totalItems = 0;
  coupons = new MatTableDataSource<ICoupon>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private couponService: CouponService, private router: Router) {}

  ngAfterViewInit(): void {

    this.sort!.sortChange.subscribe(() => (this.paginator!.pageIndex = 0));

    merge(this.sort!.sortChange, this.paginator!.page)
      .pipe(
        startWith({}),
        switchMap(async () => {
          this.isLoadingResults = true;
          try {
            return (
              await this.couponService.list({
                page: this.paginator!.pageIndex,
                pageSize: this.paginator!.pageSize,
                sort: this.sort!.active,
                direction: this.sort!.direction,
              })
            ).data;
          } catch (error) {
            console.log(error);
            return null;
          }
        }),
        map((list) => {
          this.isLoadingResults = false;
          if (list === null) {
            return [];
          }
          this.totalItems = list!.totalItems;
          return list!.coupons;
        })
      )
      .subscribe(
        (coupons) => (this.coupons = new MatTableDataSource<ICoupon>(coupons))
      );
  }

  redirect(path: string): void {
    this.router.navigate([path]);
  }
}
