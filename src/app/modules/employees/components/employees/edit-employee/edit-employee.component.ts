import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import firebase from "firebase";
import {Subject, takeUntil} from "rxjs";
import {Employee, EmployeeTypes} from "../../../../../core/interfaces/employee";
import {EmployeeService} from "../../../../../core/services/employee.service";
import User = firebase.User;

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit, OnChanges, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Input() employeeId: string | any;
  @Output() cancel = new EventEmitter<boolean>();

  //RESULTS
  employee = {} as Employee;
  listEmployeeTypes: EmployeeTypes[] = [];

  //VARIABLES
  today = new Date();

  constructor(private employeeSvc: EmployeeService) {
  }

  ngOnInit(): void {
    this.employeeSvc.getEmployeesTypes().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: EmployeeTypes[]) => {
        this.listEmployeeTypes = res;
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.employeeId) {
      this.employeeSvc.getEmployeeById(this.employeeId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.employee = res;
        }
      );
    }
  }

  getEdit(user: User, employeeId: string) {
    this.employee.name = this.employee.name.toUpperCase();
    this.employee.updatedBy = user.uid;
    // @ts-ignore
    this.employee.updatedAt = this.today;
    this.employeeSvc.updateEmployee(this.employee, employeeId).then(r => console.log(r));
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
