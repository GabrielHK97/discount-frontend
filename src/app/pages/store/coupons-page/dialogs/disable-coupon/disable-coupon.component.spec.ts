import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableCouponComponent } from './disable-coupon.component';

describe('DisableCouponComponent', () => {
  let component: DisableCouponComponent;
  let fixture: ComponentFixture<DisableCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisableCouponComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisableCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
