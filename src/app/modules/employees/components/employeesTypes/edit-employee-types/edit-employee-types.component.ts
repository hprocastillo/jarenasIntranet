import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import firebase from "firebase";
import {Subject, takeUntil} from "rxjs";
import {EmployeeTypes} from "../../../../../core/interfaces/employee";
import {EmployeeService} from "../../../../../core/services/employee.service";
import User = firebase.User;

@Component({
  selector: 'app-edit-employee-types',
  templateUrl: './edit-employee-types.component.html',
  styleUrls: ['./edit-employee-types.component.scss']
})
export class EditEmployeeTypesComponent implements OnChanges, OnDestroy {
  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Input() employeeTypeId: string | any;
  @Output() cancel = new EventEmitter<boolean>();
  //RESULTS
  employeeType = {} as EmployeeTypes;
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(private employeeSvc: EmployeeService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.employeeTypeId) {
      this.employeeSvc.getEmployeesTypesById(this.employeeTypeId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.employeeType = res;
        }
      );
    }
  }

  getEdit() {
    this.employeeType.description = this.employeeType.description.toUpperCase();
    this.employeeSvc.updateEmployeeType(this.employeeType, this.employeeTypeId).then(r => console.log(r));
    this.cancel.emit(false);
  }

  getCancel() {
    this.cancel.emit(false);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
