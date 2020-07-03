import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeesService }  from '../employees.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeesService: EmployeesService,
    private location: Location
  ) { }

  editionMode: boolean = false;
  formGroup: FormGroup;
  employeeId: any;

  employees: Employee[];

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      firstName: '',
      lastName: '',
      jobPosition: '',
      salary: ''
    });  

    this.route.params.subscribe(params => {
      if (params["id"] == undefined){
        return;
      }
      this.editionMode = true;

      this.employeeId = params["id"];

      this.employeesService.getEmployee(this.employeeId.toString())
      .subscribe(employee => this.loadForm(employee));
    });
  }

  loadForm(employee: Employee){
    this.formGroup.patchValue({
      firstName: employee.firstName,
      lastName: employee.lastName,
      jobPosition: employee.jobPosition,
      salary: employee.salary
    })
  }

  save() {
    let employee: Employee = Object.assign({}, this.formGroup.value);
    console.table(employee);

    if (this.editionMode){
      //edit employee     
      this.employeeId = parseInt(this.employeeId);
      employee.id = this.employeeId;      
      this.employeesService.updateEmployee(employee)
      .subscribe();
    } else {
      //add employee
      this.employeesService.addEmployee(employee)
      .subscribe();
    }    
  }
  
  goBack(): void {
    this.location.back();
  }
}
