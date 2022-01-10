import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import firebase from "firebase";
import {RequestService} from "../../../../core/services/request.service";
import {Request} from "../../../../core/interfaces/request";
import User = firebase.User;

@Component({
  selector: 'app-notification-badge',
  templateUrl: './notification-badge.component.html',
  styleUrls: ['./notification-badge.component.scss']
})
export class NotificationBadgeComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS
  @Input() user = {} as User;

  //RESULTS
  listRequests: Request[] = [];

  constructor(
    private requestSvc: RequestService) {
  }

  ngOnInit(): void {
    this.requestSvc.getRequestsByJoin().pipe(
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
