import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../../core/guards/auth.guard";
import {EmployeesComponent} from "./components/employees/employees.component";
import {ScheduleComponent} from "./components/schedule/schedule.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {path: 'employees', component: EmployeesComponent},
      {path: 'schedule', component: ScheduleComponent},
      {path: '**', redirectTo: 'employees'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {
}
