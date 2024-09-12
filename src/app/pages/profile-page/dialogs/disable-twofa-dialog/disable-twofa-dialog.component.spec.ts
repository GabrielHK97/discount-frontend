import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableTwofaDialogComponent } from './disable-twofa-dialog.component';

describe('DisableTwofaDialogComponent', () => {
  let component: DisableTwofaDialogComponent;
  let fixture: ComponentFixture<DisableTwofaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisableTwofaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisableTwofaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
