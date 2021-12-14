import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTypeByIdComponent } from './employee-type-by-id.component';

describe('EmployeeTypeByIdComponent', () => {
  let component: EmployeeTypeByIdComponent;
  let fixture: ComponentFixture<EmployeeTypeByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTypeByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTypeByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
