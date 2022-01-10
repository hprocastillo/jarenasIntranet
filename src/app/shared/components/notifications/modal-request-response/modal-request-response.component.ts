import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {RequestService} from "../../../../core/services/request.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Request} from "../../../../core/interfaces/request";
import {Employee} from "../../../../core/interfaces/employee";
import {EmployeeService} from "../../../../core/services/employee.service";

@Component({
  selector: 'app-modal-request-response',
  templateUrl: './modal-request-response.component.html',
  styleUrls: ['./modal-request-response.component.scss']
})
export class ModalRequestResponseComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS
  @Input() requestId: string | any;
  @Input() requestResponse: string | any;
  @Input() userId: string | any;

  //RESULTS
  request = {} as Request;

  //VARIABLE
  today = new Date();

  constructor(
    public activeModal: NgbActiveModal,
    private employeeSvc: EmployeeService,
    private requestSvc: RequestService) {
  }

  ngOnInit(): void {
    if (this.requestId) {
      this.requestSvc.getRequestById(this.requestId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.request = res;
        }
      );
    }
  }

  saveAgree(request: Request) {
    const employee = {} as Employee;
    const employeeId = employee?.id || null;
    employee.name = request.userName;
    employee.email = request.userEmail;
    employee.photoUrl = request.userPhotoUrl;
    employee.status = false;
    // @ts-ignore
    employee.createdBy = this.userId;
    // @ts-ignore
    employee.createdAt = this.today;
    this.employeeSvc.saveEmployee(employee, employeeId).then();

    request.status = "ACCEPTED";
    request.active = false;
    this.requestSvc.updateRequest(request, request.id).then();
    this.activeModal.close();
  }

  saveReject(request: Request) {
    request.status = "REJECTED";
    request.active = false;
    request.createdBy = this.userId;
    // @ts-ignore
    request.updatedAt = this.today;
    this.requestSvc.updateRequest(request, request.id).then();
    this.activeModal.close();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
