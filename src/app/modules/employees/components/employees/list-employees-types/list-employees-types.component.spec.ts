import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmployeesTypesComponent } from './list-employees-types.component';

describe('ListEmployeesTypesComponent', () => {
  let component: ListEmployeesTypesComponent;
  let fixture: ComponentFixture<ListEmployeesTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEmployeesTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmployeesTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
