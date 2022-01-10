import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReportsByVehicleYearlyComponent} from './reports-by-vehicle-yearly.component';

describe('ReportsByVehicleYearlyComponent', () => {
  let component: ReportsByVehicleYearlyComponent;
  let fixture: ComponentFixture<ReportsByVehicleYearlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsByVehicleYearlyComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsByVehicleYearlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
