import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LogisticsRoutingModule} from './logistics-routing.module';
import {VehiclesComponent} from './components/vehicles/vehicles.component';
import {RoutesComponent} from './components/routes/routes.component';
import {ChecklistsComponent} from './components/checklists/checklists.component';
import {ReportsComponent} from './components/reports/reports.component';

@NgModule({
  declarations: [
    VehiclesComponent,
    RoutesComponent,
    ChecklistsComponent,
    ReportsComponent,
  ],
  imports: [
    CommonModule,
    LogisticsRoutingModule
  ]
})
export class LogisticsModule {
}
