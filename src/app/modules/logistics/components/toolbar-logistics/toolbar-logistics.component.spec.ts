import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ToolbarLogisticsComponent} from './toolbar-logistics.component';

describe('ToolbarLogisticsComponent', () => {
  let component: ToolbarLogisticsComponent;
  let fixture: ComponentFixture<ToolbarLogisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarLogisticsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarLogisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
