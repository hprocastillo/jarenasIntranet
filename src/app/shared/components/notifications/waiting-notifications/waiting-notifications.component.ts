import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Request} from "../../../../core/interfaces/request";
import {Router} from "@angular/router";
import {EmployeeService} from "../../../../core/services/employee.service";
import {RequestService} from "../../../../core/services/request.service";
import firebase from "firebase";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalRequestResponseComponent} from "../modal-request-response/modal-request-response.component";
import User = firebase.User;

@Component({
  selector: 'app-waiting-notifications',
  templateUrl: './waiting-notifications.component.html',
  styleUrls: ['./waiting-notifications.component.scss']
})
export class WaitingNotificationsComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS
  @Input() user = {} as User;

  //PAGINATION
  page: number = 1;
  pageSize: number = 5;

  //RESULTS
  listRequests: Request[] = [];

  //VARIABLES
  today = new Date();

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private employeeSvc: EmployeeService,
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

  getModalRequest(request: Request, user: User, agree: boolean) {
    const modalRef = this.modalService.open(ModalRequestResponseComponent, {centered: true});
    modalRef.componentInstance.requestId = request.id;
    modalRef.componentInstance.userId = user.uid;

    if (agree) {
      modalRef.componentInstance.requestResponse = "AGREE";
    } else {
      modalRef.componentInstance.requestResponse = "REJECT";
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
