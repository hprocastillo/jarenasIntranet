import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReportsByVehicleDailyComponent} from './reports-by-vehicle-daily.component';

describe('ReportsByVehicleDailyComponent', () => {
  let component: ReportsByVehicleDailyComponent;
  let fixture: ComponentFixture<ReportsByVehicleDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsByVehicleDailyComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsByVehicleDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
