import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeeTypesComponent } from './edit-employee-types.component';

describe('EditEmployeeTypesComponent', () => {
  let component: EditEmployeeTypesComponent;
  let fixture: ComponentFixture<EditEmployeeTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEmployeeTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmployeeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
