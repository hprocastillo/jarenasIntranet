import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmployeeTypesComponent } from './new-employee-types.component';

describe('NewEmployeeTypesComponent', () => {
  let component: NewEmployeeTypesComponent;
  let fixture: ComponentFixture<NewEmployeeTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEmployeeTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEmployeeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
