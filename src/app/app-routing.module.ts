import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConfigComponent} from "./shared/components/config/config.component";
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('./modules/employees/employees.module').then(m => m.EmployeesModule)
  },
  {
    path: 'logistics',
    loadChildren: () => import('./modules/logistics/logistics.module').then(m => m.LogisticsModule)
  },
  {
    path: 'config/:userId', component: ConfigComponent, canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
