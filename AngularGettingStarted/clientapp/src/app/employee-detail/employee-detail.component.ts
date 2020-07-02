import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeesService }  from '../employees.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  @Input() employee: Employee;

  constructor(
    private route: ActivatedRoute,
    private employeesService: EmployeesService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(): void {
    const id = +this.route.snapshot.paramMap.get('id');//+ converts the string to a number
    this.employeesService.getEmployee(id)
    .subscribe(employee => this.employee = employee)
  }

  save(): void {
    this.employeesService.updateEmployee(this.employee)
    .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
