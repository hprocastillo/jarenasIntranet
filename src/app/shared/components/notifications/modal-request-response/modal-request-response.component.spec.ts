import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRequestResponseComponent } from './modal-request-response.component';

describe('ModalRequestResponseComponent', () => {
  let component: ModalRequestResponseComponent;
  let fixture: ComponentFixture<ModalRequestResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRequestResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRequestResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
