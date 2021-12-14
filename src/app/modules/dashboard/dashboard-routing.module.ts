import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../../core/guards/auth.guard";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: '**', redirectTo: 'dashboard'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
