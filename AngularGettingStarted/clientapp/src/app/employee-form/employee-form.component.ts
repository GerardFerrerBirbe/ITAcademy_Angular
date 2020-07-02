import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeesService }  from '../employees.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  @Input() employee: Employee;

  constructor(
    private route: ActivatedRoute,
    private employeesService: EmployeesService,
    private location: Location
  ) { }

  employees: Employee[];

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.employeesService.getEmployee(id)
      .subscribe(employee => this.employee = employee);
  }

  add(firstName: string, lastName: string, jobPosition: string): void {
    firstName = firstName.trim();
    lastName = lastName.trim();
    jobPosition = jobPosition.trim();

    if (!firstName) { return; }
    this.employeesService.addEmployee({ firstName, lastName, jobPosition } as Employee)
      .subscribe( employee => {
        this.employees.push(employee);
      });
  }

  save(): void {
    this.employeesService.updateEmployee(this.employee)
      .subscribe(() => this.goBack());
  }
  
  goBack(): void {
    this.location.back();
  }

}
