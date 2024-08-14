import { Component, OnInit } from '@angular/core';
import { LoanApplicant } from '../loanform/Modal/loanViewModal';
import { IUser } from '../signup/Modal/signupViewModal';

@Component({
  selector: 'app-rejectedcarloans',
  templateUrl: './rejectedcarloans.component.html',
  styleUrls: ['./rejectedcarloans.component.css']
})
export class RejectedcarloansComponent implements OnInit {

  // loanData: any[] = [];
  loanApplicants: LoanApplicant[] = [];
  pagedApplicants: LoanApplicant[] = [];
  page = 1;

  constructor(){}

  ngOnInit(): void {
     // Get all the loan applicants directly from local storage
     const storedApplicants = localStorage.getItem('loanApplicants');
     if (storedApplicants) {
      this.loanApplicants = JSON.parse(storedApplicants);
  
      // Filter the loan applicants to get only "homeLoan" type
      this.loanApplicants = this.loanApplicants.filter(applicant => applicant.loanType === 'vehicleLoan');

      // Filter based on applicant.accepted status
      // Only show applicants with status "rejected"
      this.loanApplicants = this.loanApplicants.filter(applicant => applicant.status == 'rejected');

      // Initialize the paginated data
      this.pagedApplicants = this.loanApplicants.slice(0, 4);
    }
  }

  // Function to update paginated data when the page changes
  onPageChange(pageNumber: number): void {
    const startIndex = (pageNumber - 1) * 5;
    const endIndex = startIndex + 5;
    this.pagedApplicants = this.loanApplicants.slice(startIndex, endIndex);
  }

   // getting other detials from the users local storage.
  getUserDetails(userId: number | undefined): IUser | undefined {
    if (userId === undefined) {
      return undefined;
    }
  
    const usersString = localStorage.getItem('users');
    if (usersString) {
      const users: IUser[] = JSON.parse(usersString);
      return users.find(user => user.id === userId);
    }
    return undefined;
  }

}
