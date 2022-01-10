import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EmployeeService} from "../../../../../core/services/employee.service";
import {Subject, takeUntil} from "rxjs";
import {Employee} from "../../../../../core/interfaces/employee";

@Component({
  selector: 'app-modal-delete-employee-type',
  templateUrl: './modal-delete-employee-type.component.html',
  styleUrls: ['./modal-delete-employee-type.component.scss']
})
export class ModalDeleteEmployeeTypeComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //VARIABLES
  @Input() employeeTypeId: string | any;
  @Input() employeeTypeDescription: string | any;

  //RESULTS
  inUse: boolean = false;

  constructor(public activeModal: NgbActiveModal, private employeeSvc: EmployeeService) {
  }

  ngOnInit(): void {
    if (this.employeeTypeId) {
      this.employeeSvc.getEmployeesByEmployeeType(this.employeeTypeId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Employee[]) => {
          if (res.length > 0) {
            this.inUse = true;
          }
        }
      );
    }
  }

  getDelete(employeeTypeId: string) {
    this.employeeSvc.deleteEmployeeType(employeeTypeId).then(r => console.log(r));
    this.activeModal.close();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
