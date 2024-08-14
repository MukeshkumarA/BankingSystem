import { Component } from '@angular/core';
import { LoanApplicant } from '../loanform/Modal/loanViewModal';
import { PandataService } from '../shared/pandata.service';
import { IUser } from '../signup/Modal/signupViewModal';

@Component({
  selector: 'app-rejectedhomeloans',
  templateUrl: './rejectedhomeloans.component.html',
  styleUrls: ['./rejectedhomeloans.component.css']
})
export class RejectedhomeloansComponent {


  loanData: any[] = [];
  loanApplicants: LoanApplicant[] = [];
  pagedApplicants: LoanApplicant[] = [];
  page = 1;

  constructor(private panDataService: PandataService){}

  ngOnInit(): void {
     // Get all the loan applicants directly from local storage
     const storedApplicants = localStorage.getItem('loanApplicants');
     if (storedApplicants) {
      this.loanApplicants = JSON.parse(storedApplicants);
  
      // Filter the loan applicants to get only "homeLoan" type
      this.loanApplicants = this.loanApplicants.filter(applicant => applicant.loanType === 'homeLoan');

      // Filter based on applicant.accepted status
      // Only show applicants with status "accepted" or "pending"
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

  
  checkCibilScore(panNumber: string): boolean {
    const cibilScore = this.panDataService.getCibilScoreByPan(panNumber); // Assuming getCibilScore() returns the CIBIL score based on the PAN number
    // Check if cibilScore is not null and greater than 6
    return cibilScore !== null && cibilScore > 6;
  }
  
 
  getCibilScoreFromLocalStorage(): number | null {
    const cibilScoreString = localStorage.getItem('cibilscore');
  
    // Parse the cibilScoreString back to a number (if it exists) and return it
    return cibilScoreString !== null ? Number(cibilScoreString) : null;
  }


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
