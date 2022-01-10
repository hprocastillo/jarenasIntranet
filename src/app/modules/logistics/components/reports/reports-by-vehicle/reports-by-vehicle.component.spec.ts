import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReportsByVehicleComponent} from './reports-by-vehicle.component';

describe('ReportsByVehicleComponent', () => {
  let component: ReportsByVehicleComponent;
  let fixture: ComponentFixture<ReportsByVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsByVehicleComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsByVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
