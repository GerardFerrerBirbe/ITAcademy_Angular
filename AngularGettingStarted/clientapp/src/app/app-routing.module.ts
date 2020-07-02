import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { EmployeeDetailComponent }  from './employee-detail/employee-detail.component';
import { EmployeeFormComponent }  from './employee-form/employee-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employee-detail/:id', component: EmployeeDetailComponent },
  { path: 'employee-form', component: EmployeeFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
