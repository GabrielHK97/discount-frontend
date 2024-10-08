import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCouponPageComponent } from './create-coupon-page.component';

describe('CreateCouponPageComponent', () => {
  let component: CreateCouponPageComponent;
  let fixture: ComponentFixture<CreateCouponPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCouponPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCouponPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
