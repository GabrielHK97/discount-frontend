import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, merge, startWith, switchMap } from 'rxjs';
import { StoreNavbarComponent } from '../../../components/navbar-store/navbar-store.component';
import { CouponService } from '../../../services/coupon.service';
import { ICouponItem } from '../../../utils/interfaces/coupon-item.interface';
import { ViewCouponComponent } from './dialogs/view-coupon/view-coupon.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
    MatProgressSpinnerModule,
    CommonModule
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
    'actions'
  ];
  isLoadingResults = true;
  totalItems = 0;
  coupons = new MatTableDataSource<ICouponItem>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private couponService: CouponService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit(): void {
    this.sort!.sortChange.subscribe(() => (this.paginator!.pageIndex = 0));

    merge(this.sort!.sortChange, this.paginator!.page)
      .pipe(
        startWith({}),
        switchMap(async () => {
          this.isLoadingResults = true;
          try {
            return (
              await this.couponService.findAll({
                page: this.paginator!.pageIndex,
                pageSize: this.paginator!.pageSize,
                sort: this.sort!.active,
                direction: this.sort!.direction,
              })
            ).data;
          } catch (error) {
            const snackBarRef = this.snackBar.open(
              'Erro ao listar cupons!',
              'Fechar',
              {
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
              }
            );
            snackBarRef.onAction().subscribe(() => {
              this.snackBar.dismiss();
            });
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
        (coupons) => (this.coupons = new MatTableDataSource<ICouponItem>(coupons))
      );
  }

  redirect(path: string): void {
    this.router.navigate([path]);
  }

  async openViewCouponModal(id: string) {
    try {
      const response = await this.couponService.find(id);
      this.dialog.open(ViewCouponComponent, {data: {coupon: response.data}});
    } catch (error) {
      const snackBarRef = this.snackBar.open(
        'Não foi possível abrir detalhes do cupom!',
        'Fechar',
        {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        }
      );
      snackBarRef.onAction().subscribe(() => {
        this.snackBar.dismiss();
      });
    }
  }
}
