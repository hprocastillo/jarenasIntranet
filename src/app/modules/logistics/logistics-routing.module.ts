import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../../core/guards/auth.guard";
import {RoutesComponent} from "./components/routes/routes.component";
import {VehiclesComponent} from "./components/vehicles/vehicles.component";
import {ChecklistsComponent} from "./components/checklists/checklists.component";
import {ReportsComponent} from "./components/reports/reports.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {path: 'routes', component: RoutesComponent},
      {path: 'vehicles', component: VehiclesComponent},
      {path: 'checklists', component: ChecklistsComponent},
      {path: 'reports', component: ReportsComponent},
      {path: '**', redirectTo: 'routes'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogisticsRoutingModule {
}
