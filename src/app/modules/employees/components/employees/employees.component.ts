import {Component} from '@angular/core';
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {
  //INITIAL TAB
  active = 1;

  //PAGES
  pageListEmployees: boolean = true;
  pageListEmployeesTypes: boolean = true;
  pageNewEmployee: boolean = false;
  pageNewEmployeeTypes: boolean = false;
  pageEditEmployee: boolean = false;
  pageEditEmployeeTypes: boolean = false;

  //VARIABLES
  editEmployee: string | any;
  editEmployeeType: string | any;

  constructor(public authSvc: AuthService) {
  }

  //SHOW PAGES EMPLOYEES
  showListEmployees() {
    this.pageListEmployees = true;
    this.pageNewEmployee = false;
    this.pageEditEmployee = false;
  }

  showNewEmployee() {
    this.pageListEmployees = false;
    this.pageNewEmployee = true;
    this.pageEditEmployee = false;
  }

  showEditEmployee() {
    this.pageListEmployees = false;
    this.pageNewEmployee = false;
    this.pageEditEmployee = true;
  }

  getEditEmployee(event: any) {
    this.editEmployee = event;
    this.showEditEmployee();
  }

  //SHOW PAGES EMPLOYEES TYPES
  showListEmployeesTypes() {
    this.pageListEmployeesTypes = true;
    this.pageNewEmployeeTypes = false;
    this.pageEditEmployeeTypes = false;
  }

  showNewEmployeeTypes() {
    this.pageListEmployeesTypes = false;
    this.pageNewEmployeeTypes = true;
    this.pageEditEmployeeTypes = false;
  }

  showEditEmployeeTypes() {
    this.pageListEmployeesTypes = false;
    this.pageNewEmployeeTypes = false;
    this.pageEditEmployeeTypes = true;
  }

  getEditEmployeeTypes(event: any) {
    this.editEmployeeType = event;
    this.showEditEmployeeTypes();
  }

}
