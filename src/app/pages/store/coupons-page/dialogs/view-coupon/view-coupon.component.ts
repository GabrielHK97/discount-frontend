import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ICouponItem } from '../../../../../utils/interfaces/coupon-item.interface';

@Component({
  selector: 'app-view-coupon',
  standalone: true,
  imports: [MatButtonModule, MatDialogContent, MatDialogActions, CommonModule],
  templateUrl: './view-coupon.component.html',
  styleUrl: './view-coupon.component.css',
})
export class ViewCouponComponent {
  coupon: ICouponItem;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { coupon: ICouponItem },
    private dialogRef: MatDialogRef<ViewCouponComponent>,
  ) {
    this.coupon = data.coupon;
    console.log(this.coupon);
  }

  close(): void {
    this.dialogRef.close();
  }
}
