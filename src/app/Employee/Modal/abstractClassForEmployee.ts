import { Employee } from "./employeeViewModal";

export interface EmployeeStorage{
    createEmployee(employee: Employee): void;
    getEmployee(employeeId: number): Employee | undefined;
    updateEmployee(employeeId: number, updatedEmployee: Employee): void;
    
}