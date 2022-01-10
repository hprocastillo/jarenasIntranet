import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import firebase from "firebase";
import {Subject, takeUntil} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeTypes} from "../../../../../core/interfaces/employee";
import {EmployeeService} from "../../../../../core/services/employee.service";
import User = firebase.User;

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit, OnDestroy {
  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Output() cancel = new EventEmitter<boolean>();
  //NEW FORM
  newForm: FormGroup;
  //RESULTS
  listEmployeesTypes: EmployeeTypes[] = [];
  //VARIABLES
  today = new Date();
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private employeeSvc: EmployeeService) {
    this.newForm = this.fb.group({
      name: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      email: ['', [Validators.required]],
      employeeTypeId: ['', [Validators.required]],
      phone: [''],
      address: [''],
    });
  }

  ngOnInit(): void {
    this.employeeSvc.getEmployeesTypes().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: EmployeeTypes[]) => {
        this.listEmployeesTypes = res;
      }
    );
  }

  getSave(user: User) {
    if (this.newForm.valid) {
      const employee = this.newForm.value;
      const employeeId = employee?.id || null;
      employee.name = employee.name.toUpperCase();
      employee.createdBy = user.uid;
      employee.createdAt = this.today;
      this.employeeSvc.saveEmployee(employee, employeeId).then();
      this.newForm.reset();
      this.cancel.emit(false);
    }
  }

  getCancel() {
    this.cancel.emit(false);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
