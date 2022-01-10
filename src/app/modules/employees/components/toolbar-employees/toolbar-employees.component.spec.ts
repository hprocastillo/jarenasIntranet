import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ToolbarEmployeesComponent} from './toolbar-employees.component';

describe('ToolbarEmployeesComponent', () => {
  let component: ToolbarEmployeesComponent;
  let fixture: ComponentFixture<ToolbarEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarEmployeesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
