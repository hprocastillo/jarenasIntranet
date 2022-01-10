import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalNotificationsComponent } from './historical-notifications.component';

describe('HistoricalNotificationsComponent', () => {
  let component: HistoricalNotificationsComponent;
  let fixture: ComponentFixture<HistoricalNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
