import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Employeemodel } from '../employeemodel';

import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  employeeData: any;
  employeeModelObj : Employeemodel = new Employeemodel();
  formValue!: FormGroup ;
  

  constructor(private formbuilder:FormBuilder,private api:ApiService,private router:Router) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      name:[''],
      department:[''],
      sex:[''],
      status:[''],
      salary:[''],
      phone:[''],
      email:[''],
      address:['']
    })
    this.getAllEmployee();
  }
  
  getAllEmployee(){
    this.api.getEmploye()
    .subscribe(res=>{
        this.employeeData = res;
    })
   }

   onEdit(row:any)
   {
     
     this.employeeModelObj.id =row.id;
     this.formValue.controls['name'].setValue(row.name);
     this.formValue.controls['department'].setValue(row.department);
    this.formValue.controls['sex'].setValue(row.sex);
    this.formValue.controls['status'].setValue(row.status);
    this.formValue.controls['salary'].setValue(row.salary);
     this.formValue.controls['phone'].setValue(row.phone);
     this.formValue.controls['email'].setValue(row.email);
     this.formValue.controls['address'].setValue(row.address);
   } 
   updateEmployeeDetails()
   {
     this.employeeModelObj.name=this.formValue.value.name;
   this.employeeModelObj.department=this.formValue.value.department;
   this.employeeModelObj.sex=this.formValue.value.sex;
   this.employeeModelObj.status=this.formValue.value.status;
   this.employeeModelObj.salary=this.formValue.value.salary;
   this.employeeModelObj.phone=this.formValue.value.phone;
   this.employeeModelObj.email=this.formValue.value.email;
   this.employeeModelObj.address=this.formValue.value.address;
 
   this.api.updateEmploye(this.employeeModelObj,this.employeeModelObj.id)
   .subscribe((res: any)=>
     {
       alert("Updated Successfully");
       let ref = document.getElementById('cancel')
       ref?.click();
       this.formValue.reset();
       this.getAllEmployee();
     })
    }
    deleteEmployee(row: any)
    {
      this.api.deleteEmploye(row.id)
      .subscribe((_res: any)=>{
        alert("Employee Deleted");
        this.getAllEmployee();
      })
    }

    
}
