import {Component, EventEmitter, Input, Output} from '@angular/core';
import firebase from "firebase";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmployeeService} from "../../../../../core/services/employee.service";
import User = firebase.User;

@Component({
  selector: 'app-new-employee-types',
  templateUrl: './new-employee-types.component.html',
  styleUrls: ['./new-employee-types.component.scss']
})
export class NewEmployeeTypesComponent {

  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Output() cancel = new EventEmitter<boolean>();

  //NEW FORM
  newForm: FormGroup;

  //VARIABLES
  today = new Date();

  constructor(
    private fb: FormBuilder,
    private employeeSvc: EmployeeService) {
    this.newForm = this.fb.group({
      description: [''],
      securityModule: [''],
      employeeModule: [''],
      logisticsModule: [''],
      configModule: [''],
    });
  }

  getSave(user: User) {
    if (this.newForm.valid) {
      const employeeType = this.newForm.value;
      const employeeTypeId = employeeType?.id || null;
      employeeType.description = employeeType.description.toUpperCase();
      employeeType.createdBy = user.uid;
      employeeType.createdAt = this.today;
      this.employeeSvc.saveEmployeeType(employeeType, employeeTypeId).then(r => console.log(r)).catch(err => console.log(err));
      this.newForm.reset();
      this.cancel.emit(false);
    }
  }

  getCancel() {
    this.cancel.emit(false);
  }
}
