import { Component, ViewChild } from '@angular/core';
import {
  Form,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { StoreNavbarComponent } from '../../../components/navbar-store/navbar-store.component';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { ICoupon } from '../../../utils/interfaces/coupon.interface';
import { AmountTypesEnum } from '../../../utils/enums/amount-types.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CouponService } from '../../../services/coupon.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-store-create-coupon-page',
  standalone: true,
  imports: [
    StoreNavbarComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatStepperModule,
    MatSelectModule,
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    provideNativeDateAdapter(),
    provideNgxMask()
  ],
  templateUrl: './create-coupon-page.component.html',
  styleUrl: './create-coupon-page.component.css',
})
export class StoreCreateCouponPageComponent {
  createCouponForm: FormGroup;
  amountTypesEnum = AmountTypesEnum;
  couponCreated: boolean = false;

  @ViewChild('form') form: NgForm | null = null;

  constructor(
    private couponService: CouponService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.createCouponForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
      hasPeriod: new FormControl(false, Validators.required),
      dateStart: new FormControl({ value: null, disabled: true }),
      dateEnd: new FormControl({ value: null, disabled: true }),
      hasLimit: new FormControl(false, Validators.required),
      limit: new FormControl({ value: null, disabled: true }),
      amountType: new FormControl(null, Validators.required),
      amount: new FormControl({value: null, disabled: true}, Validators.required),
    });
  }

  switchVisibilityOfDates(event: MatCheckboxChange) {
    if (event.checked) {
      this.createCouponForm.get('dateStart')!.enable();
      this.createCouponForm.get('dateEnd')!.enable();
    } else {
      this.createCouponForm.get('dateStart')!.setValue(null);
      this.createCouponForm.get('dateEnd')!.setValue(null);
      this.createCouponForm.get('dateStart')!.disable();
      this.createCouponForm.get('dateEnd')!.disable();
    }
  }

  switchVisibilityOfLimit(event: MatCheckboxChange) {
    if (event.checked) {
      this.createCouponForm.get('limit')!.enable();
    } else {
      this.createCouponForm.get('limit')!.setValue(null);
      this.createCouponForm.get('limit')!.disable();
    }
  }

  resetAmount() {
    this.createCouponForm.get('amount')!.setValue(null);
    this.createCouponForm.get('amount')!.enable();
    if (this.createCouponForm.value.amountType === this.amountTypesEnum.ABSOLUTE) {
      this.createCouponForm.get('amount')!.setValidators([Validators.required]);
    }
    if (this.createCouponForm.value.amountType === this.amountTypesEnum.PERCENTAGE) {
      this.createCouponForm.get('amount')!.setValidators([Validators.min(1), Validators.max(100)]);
    }
  }

  resetCreate() {
    this.couponCreated = false;
    this.form!.resetForm();
    this.createCouponForm.reset({
      name: null,
      description: null,
      hasPeriod: false,
      dateStart: { value: null, disabled: true },
      dateEnd: { value: null, disabled: true },
      hasLimit: false,
      limit: { value: null, disabled: true },
      amountType: null,
      amount: null,
    });
  }

  redirectToList() {
    this.router.navigate(['/store/coupons']);
  }

  async createCoupon(event: SubmitEvent): Promise<void> {
    try {
      const createCouponDto: ICoupon = {
        name: this.createCouponForm.value.name,
        description: this.createCouponForm.value.description,
        hasPeriod: this.createCouponForm.value.hasPeriod,
        dateStart: this.createCouponForm.value.dateStart,
        dateEnd: this.createCouponForm.value.dateEnd,
        hasLimit: this.createCouponForm.value.hasLimit,
        limit: this.createCouponForm.value.limit,
        hasPercentage:
          this.createCouponForm.value.amountType ===
          this.amountTypesEnum.PERCENTAGE,
        percentage:
          this.createCouponForm.value.amountType ===
          this.amountTypesEnum.PERCENTAGE
            ? this.createCouponForm.value.amount
            : null,
        hasValue:
          this.createCouponForm.value.amountType ===
          this.amountTypesEnum.ABSOLUTE,
        value:
          this.createCouponForm.value.amountType ===
          this.amountTypesEnum.ABSOLUTE
            ? this.createCouponForm.value.amount
            : null,
      };
      await this.couponService.create(createCouponDto);
      this.couponCreated = true;
      const snackBarRef = this.snackBar.open(
        'Cupom criado com sucesso!',
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
    } catch (error: any) {
      const snackBarRef = this.snackBar.open(error.error.message, 'Fechar', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      snackBarRef.onAction().subscribe(() => {
        this.snackBar.dismiss();
      });
    }
  }
}
