import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { HttpClient } from '@angular/common/http';
import { EmployeesService} from '../employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  public employees: Employee[];
  
  constructor(private employeesService: EmployeesService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeesService.getEmployees()
      .subscribe(employees => this.employees = employees);
  }

  delete(employee: Employee): void {
    this.employees = this.employees.filter(e => e !== employee);
    this.employeesService.deleteEmployee(employee).subscribe();
  }

}
