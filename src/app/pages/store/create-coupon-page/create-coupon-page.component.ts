import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
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
    MatSelectModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    provideNativeDateAdapter(),
  ],
  templateUrl: './create-coupon-page.component.html',
  styleUrl: './create-coupon-page.component.css',
})
export class StoreCreateCouponPageComponent {
  couponInfoForm: FormGroup;
  couponDetailsForm: FormGroup;
  couponAmountForm: FormGroup;

  constructor() {
    this.couponInfoForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
    });
    this.couponDetailsForm = new FormGroup({
      hasPeriod: new FormControl(false, Validators.required),
      dateStart: new FormControl({ value: null, disabled: true }),
      dateEnd: new FormControl({ value: null, disabled: true }),
      hasLimit: new FormControl(false, Validators.required),
      limit: new FormControl({ value: null, disabled: true }),
    });
    this.couponAmountForm = new FormGroup({
      hasValue: new FormControl(false, Validators.required),
      value: new FormControl({ value: null, disabled: true }),
      hasPercentage: new FormControl(false, Validators.required),
      percentage: new FormControl({ value: null, disabled: true }),
    });
  }

  switchHasPeriod(event: MatCheckboxChange) {
    if (event.checked) {
      this.couponDetailsForm.get('dateStart')!.enable();
      this.couponDetailsForm.get('dateEnd')!.enable();
    } else {
      this.couponDetailsForm.get('dateStart')!.setValue(null);
      this.couponDetailsForm.get('dateEnd')!.setValue(null);
      this.couponDetailsForm.get('dateStart')!.disable();
      this.couponDetailsForm.get('dateEnd')!.disable();
    }
  }

  switchHasLimit(event: MatCheckboxChange) {
    if (event.checked) {
      this.couponDetailsForm.get('limit')!.enable();
    } else {
      this.couponDetailsForm.get('limit')!.setValue(null);
      this.couponDetailsForm.get('limit')!.disable();
    }
  }

  createCoupon() {}
}
