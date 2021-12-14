import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeesRoutingModule} from './employees-routing.module';
import {EmployeesComponent} from './components/employees/employees.component';
import {ScheduleComponent} from './components/schedule/schedule.component';
import {NgbNavModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {ListEmployeesComponent} from './components/employees/list-employees/list-employees.component';
import {NewEmployeeComponent} from './components/employees/new-employee/new-employee.component';
import {EditEmployeeComponent} from './components/employees/edit-employee/edit-employee.component';
import {ListEmployeesTypesComponent} from './components/employees/list-employees-types/list-employees-types.component';
import {NewEmployeeTypesComponent} from './components/employees/new-employee-types/new-employee-types.component';
import {EditEmployeeTypesComponent} from './components/employees/edit-employee-types/edit-employee-types.component';
import {ToolbarEmployeesComponent} from './components/toolbar-employees/toolbar-employees.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EmployeeTypeByIdComponent } from './components/employees/employee-type-by-id/employee-type-by-id.component';


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
    EmployeeTypeByIdComponent
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
