import { Injectable } from '@angular/core';
import { EmployeeStorage } from '../Modal/abstractClassForEmployee';
import { Employee } from '../Modal/employeeViewModal';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  constructor() { }

  createEmployee(employee: Employee): void {
    console.log("Create EMployee");
    let employees: Employee[] = JSON.parse(localStorage.getItem('employees') || '[]');
    
    // Generate employeeId as the next number in sequence
    employee.employeeId = employees.length + 1; 
    // Generate employeeCode as 'emp' + employeeId
    employee.employeeCode = 'emp' + employee.employeeId;

    // Push the new employee to the employees array
    employees.push(employee);
    // Store updated employees array in localStorage
    localStorage.setItem('employees', JSON.stringify(employees));
  }
  


  getEmployee(employeeId: number): Employee | undefined {
    throw new Error('Method not implemented.');
  }


  updateEmployee(employeeId: number, updatedEmployee: Employee): void {
    throw new Error('Method not implemented.');
  }
}
