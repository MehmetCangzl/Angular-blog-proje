import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { DefaultComponent } from './admin/default/default.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  {path:'', component: DefaultComponent,
  children : [
    {path: 'dashboard', component: DashboardComponent},
    { path: 'employees', component: EmployeesComponent}
  ]

}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
