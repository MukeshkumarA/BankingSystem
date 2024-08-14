import { Component,OnInit } from '@angular/core';
import { LoanApplicant } from '../loanform/Modal/loanViewModal';
import { MatDialog } from '@angular/material/dialog';
import { DisplayLoanFormComponent } from '../display-loan-form/display-loan-form.component';
import { DisplayRetirmentPlanComponent } from '../display-retirment-plan/display-retirment-plan.component';

@Component({
  selector: 'app-user-applications',
  templateUrl: './user-applications.component.html',
  styleUrls: ['./user-applications.component.css']
})
export class UserApplicationsComponent implements OnInit{

  private username?: string;
  userId?: number;
  applications?: LoanApplicant[] = [];
  pagedApplicants?: LoanApplicant[] = [];
  page = 1;

  constructor(private matDialog: MatDialog){
    const storedUsername = localStorage.getItem('username');
    if (storedUsername !== null) {
      this.username = storedUsername; // Assign the value if it's not null
      // this.userId? = JSON.parse(localStorage.getItem('users')).filter(user => user.username = this.username);
    }

    const usersData = localStorage.getItem('users');
    if (usersData !== null) {
      const users = JSON.parse(usersData);
      const user = users.find((user: {username: string | undefined}) => user.username === this.username);

      if (user) {
        this.userId = user.id; // Assuming 'id' is the property you want to assign
      }
    } 

  }
  ngOnInit(): void {

    if (this.userId !== undefined) {
      this.getLoanApplicantByUserId(this.userId);
    }

    // initialize the paginated data
    this.pagedApplicants = this.applications?.slice(0,4);
    
  }

  onPageChange(pageNumber: number): void {
    const startIndex = (pageNumber - 1) * 5;
    const endIndex = startIndex + 5;
    this.pagedApplicants = this.applications?.slice(startIndex, endIndex);
  }


  // get the datas from the loan applicants
  getLoanApplicantByUserId(userId: number): void {

    // home and vehicle loan data.
    const loanApplicants = JSON.parse(localStorage.getItem('loanApplicants') || '[]');

    // retirement plan data.
    const retirementPlanApplicants = JSON.parse(localStorage.getItem('retirementPlanApplicants') || '[]')
    
    // concat both loanapplicants and the retirementplanapplicants
    const allApplicants = loanApplicants.concat(retirementPlanApplicants);

    this.applications = allApplicants.filter((applicant: any) => applicant.userId === userId);
  }

  openFormModal(userId: number | undefined, status: string | undefined){
    // this.matDialog.open()
    this.matDialog.open(DisplayLoanFormComponent, {
      data: { userId, status }, // Pass userId as data to the dialog
      "width": '700px',
      "height": 'max-content'
    });
  }

  openRetimentModal(userId: number | undefined, status: string | undefined){
    // this.matDialog.open()
    this.matDialog.open(DisplayRetirmentPlanComponent, {
      data: {userId, status},
      "width": '700px',
      "height": 'max-content'
    })
  }

}
