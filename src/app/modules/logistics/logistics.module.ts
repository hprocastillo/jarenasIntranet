import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LogisticsRoutingModule} from './logistics-routing.module';
import {VehiclesComponent} from './components/vehicles/vehicles.component';
import {RoutesComponent} from './components/routes/routes.component';
import {ChecklistsComponent} from './components/checklists/checklists.component';
import {ReportsComponent} from './components/reports/reports.component';
import {NgbNavModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {ListVehiclesComponent} from './components/vehicles/list-vehicles/list-vehicles.component';
import {NewVehicleComponent} from './components/vehicles/new-vehicle/new-vehicle.component';
import {EditVehicleComponent} from './components/vehicles/edit-vehicle/edit-vehicle.component';
import {ListBrandsComponent} from './components/brands/list-brands/list-brands.component';
import {EditBrandComponent} from './components/brands/edit-brand/edit-brand.component';
import {NewBrandComponent} from './components/brands/new-brand/new-brand.component';
import {ToolbarLogisticsComponent} from './components/toolbar-logistics/toolbar-logistics.component';
import {EmployeesModule} from "../employees/employees.module";
import {BrandByIdComponent} from './components/brands/brand-by-id/brand-by-id.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NewTripComponent} from './components/trips/new-trip/new-trip.component';
import {EditTripComponent} from './components/trips/edit-trip/edit-trip.component';
import {ListTripsComponent} from './components/trips/list-trips/list-trips.component';
import {NewCityComponent} from './components/cities/new-city/new-city.component';
import {EditCityComponent} from './components/cities/edit-city/edit-city.component';
import {ListCitiesComponent} from './components/cities/list-cities/list-cities.component';
import {CityByIdComponent} from './components/cities/city-by-id/city-by-id.component';
import {NewRouteComponent} from './components/routes/new-route/new-route.component';
import {EditRouteComponent} from './components/routes/edit-route/edit-route.component';
import {ListRoutesComponent} from './components/routes/list-routes/list-routes.component';
import {RouteByIdComponent} from './components/routes/route-by-id/route-by-id.component';
import {ListChecklistComponent} from './components/checklists/list-checklist/list-checklist.component';
import {NewChecklistComponent} from './components/checklists/new-checklist/new-checklist.component';
import {EditChecklistComponent} from './components/checklists/edit-checklist/edit-checklist.component';
import {ChecklistByIdComponent} from './components/checklists/checklist-by-id/checklist-by-id.component';
import {ListQuestionsComponent} from './components/questions/list-questions/list-questions.component';
import {NewQuestionComponent} from './components/questions/new-question/new-question.component';
import {EditQuestionComponent} from './components/questions/edit-question/edit-question.component';
import {
  ListQuestionByChecklistComponent
} from './components/questions/list-question-by-checklist/list-question-by-checklist.component';
import {CategoryByIdComponent} from './components/categories/category-by-id/category-by-id.component';
import {ListCategoriesComponent} from './components/categories/list-categories/list-categories.component';
import {NewCategoryComponent} from './components/categories/new-category/new-category.component';
import {EditCategoryComponent} from './components/categories/edit-category/edit-category.component';
import {ListVerificationsComponent} from './components/verifications/list-verifications/list-verifications.component';
import {ViewVerificationComponent} from './components/verifications/view-verification/view-verification.component';
import {ViewAnswerComponent} from './components/answers/view-answer/view-answer.component';
import {ReportsByVehicleComponent} from './components/reports/reports-by-vehicle/reports-by-vehicle.component';
import {
  ReportsByVehicleDailyComponent
} from './components/reports/reports-by-vehicle/reports-by-vehicle-daily/reports-by-vehicle-daily.component';
import {
  ReportsByVehicleMonthlyComponent
} from './components/reports/reports-by-vehicle/reports-by-vehicle-monthly/reports-by-vehicle-monthly.component';
import {
  ReportsByVehicleYearlyComponent
} from './components/reports/reports-by-vehicle/reports-by-vehicle-yearly/reports-by-vehicle-yearly.component';
import {VehicleByIdComponent} from './components/vehicles/vehicle-by-id/vehicle-by-id.component';
import {PieChartComponent} from './components/reports/charts/pie-chart/pie-chart.component';
import {GoogleChartsModule} from "angular-google-charts";
import { ModalDeleteVehicleComponent } from './components/vehicles/modal-delete-vehicle/modal-delete-vehicle.component';

@NgModule({
  declarations: [
    VehiclesComponent,
    RoutesComponent,
    ChecklistsComponent,
    ReportsComponent,
    ListVehiclesComponent,
    NewVehicleComponent,
    EditVehicleComponent,
    ListBrandsComponent,
    EditBrandComponent,
    NewBrandComponent,
    ToolbarLogisticsComponent,
    BrandByIdComponent,
    NewTripComponent,
    EditTripComponent,
    ListTripsComponent,
    NewCityComponent,
    EditCityComponent,
    ListCitiesComponent,
    CityByIdComponent,
    NewRouteComponent,
    EditRouteComponent,
    ListRoutesComponent,
    RouteByIdComponent,
    ListChecklistComponent,
    NewChecklistComponent,
    EditChecklistComponent,
    ChecklistByIdComponent,
    ListQuestionsComponent,
    NewQuestionComponent,
    EditQuestionComponent,
    ListQuestionByChecklistComponent,
    CategoryByIdComponent,
    ListCategoriesComponent,
    NewCategoryComponent,
    EditCategoryComponent,
    ListVerificationsComponent,
    ViewVerificationComponent,
    ViewAnswerComponent,
    ReportsByVehicleComponent,
    ReportsByVehicleDailyComponent,
    ReportsByVehicleMonthlyComponent,
    ReportsByVehicleYearlyComponent,
    VehicleByIdComponent,
    PieChartComponent,
    ModalDeleteVehicleComponent,
  ],
  imports: [
    CommonModule,
    LogisticsRoutingModule,
    NgbNavModule,
    EmployeesModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleChartsModule,
  ]
})
export class LogisticsModule {
}
