import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingNotificationsComponent } from './waiting-notifications.component';

describe('WaitingNotificationsComponent', () => {
  let component: WaitingNotificationsComponent;
  let fixture: ComponentFixture<WaitingNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
