import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReportsByVehicleMonthlyComponent} from './reports-by-vehicle-monthly.component';

describe('ReportsByVehicleMonthlyComponent', () => {
  let component: ReportsByVehicleMonthlyComponent;
  let fixture: ComponentFixture<ReportsByVehicleMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsByVehicleMonthlyComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsByVehicleMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
