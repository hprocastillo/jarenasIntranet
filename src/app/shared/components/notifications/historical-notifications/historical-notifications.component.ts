import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import firebase from "firebase";
import {Subject, takeUntil} from "rxjs";
import {EmployeeService} from "../../../../core/services/employee.service";
import {RequestService} from "../../../../core/services/request.service";
import {Request} from "../../../../core/interfaces/request";
import User = firebase.User;

@Component({
  selector: 'app-historical-notifications',
  templateUrl: './historical-notifications.component.html',
  styleUrls: ['./historical-notifications.component.scss']
})
export class HistoricalNotificationsComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() user = {} as User;

  //PAGINATION
  page: number = 1;
  pageSize: number = 5;

  //RESULTS
  listRequests: Request[] = [];

  constructor(private employeeSvc: EmployeeService, private requestSvc: RequestService) {
  }

  ngOnInit(): void {
    this.requestSvc.getRequestsHistoricalJoin().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: Request[]) => {
        this.listRequests = res;
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
