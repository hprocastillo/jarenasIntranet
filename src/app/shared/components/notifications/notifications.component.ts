import {Component} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  //INITIAL TAB
  active = 1;

  //PAGES
  pageWaitingNotifications: boolean = true;
  pageHistoricalNotifications: boolean = true;

  constructor(public authSvc: AuthService) {
  }
}
