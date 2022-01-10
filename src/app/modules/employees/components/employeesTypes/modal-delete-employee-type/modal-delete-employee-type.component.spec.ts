import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteEmployeeTypeComponent } from './modal-delete-employee-type.component';

describe('ModalDeleteEmployeeTypeComponent', () => {
  let component: ModalDeleteEmployeeTypeComponent;
  let fixture: ComponentFixture<ModalDeleteEmployeeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeleteEmployeeTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteEmployeeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
