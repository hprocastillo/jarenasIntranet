import {Component} from '@angular/core';
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  //INITIAL TAB
  active = 1;

  //PAGES
  pageIndicatorsByVehicle: boolean = true;

  constructor(public authSvc: AuthService) {
  }
}
