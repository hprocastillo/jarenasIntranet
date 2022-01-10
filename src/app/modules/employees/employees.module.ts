import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeesRoutingModule} from './employees-routing.module';
import {EmployeesComponent} from './components/employees/employees.component';
import {ScheduleComponent} from './components/schedule/schedule.component';
import {NgbNavModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {ListEmployeesComponent} from './components/employees/list-employees/list-employees.component';
import {NewEmployeeComponent} from './components/employees/new-employee/new-employee.component';
import {EditEmployeeComponent} from './components/employees/edit-employee/edit-employee.component';
import {
  ListEmployeesTypesComponent
} from './components/employeesTypes/list-employees-types/list-employees-types.component';
import {NewEmployeeTypesComponent} from './components/employeesTypes/new-employee-types/new-employee-types.component';
import {
  EditEmployeeTypesComponent
} from './components/employeesTypes/edit-employee-types/edit-employee-types.component';
import {ToolbarEmployeesComponent} from './components/toolbar-employees/toolbar-employees.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EmployeeTypeByIdComponent} from './components/employeesTypes/employee-type-by-id/employee-type-by-id.component';
import {EmployeeByIdComponent} from './components/employees/employee-by-id/employee-by-id.component';
import {
  ModalDeleteEmployeeComponent
} from './components/employees/modal-delete-employee/modal-delete-employee.component';
import {
  ModalDeleteEmployeeTypeComponent
} from './components/employeesTypes/modal-delete-employee-type/modal-delete-employee-type.component';

@NgModule({
  declarations: [
    EmployeesComponent,
    ScheduleComponent,
    ListEmployeesComponent,
    NewEmployeeComponent,
    EditEmployeeComponent,
    ListEmployeesTypesComponent,
    NewEmployeeTypesComponent,
    EditEmployeeTypesComponent,
    ToolbarEmployeesComponent,
    EmployeeTypeByIdComponent,
    EmployeeByIdComponent,
    ModalDeleteEmployeeComponent,
    ModalDeleteEmployeeTypeComponent
  ],
  exports: [
    EmployeeByIdComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    NgbNavModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EmployeesModule {
}
