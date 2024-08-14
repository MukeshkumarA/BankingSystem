import { Component, OnInit } from '@angular/core';
import { RetirementPlanApplication } from '../retirementPlan/Modal/retirementPlanView';
import { IUser } from '../signup/Modal/signupViewModal';

@Component({
  selector: 'app-accepted-retirementplan',
  templateUrl: './accepted-retirementplan.component.html',
  styleUrls: ['./accepted-retirementplan.component.css']
})
export class AcceptedRetirementplanComponent {

  retirementPlanApplicants: RetirementPlanApplication[] = [];
  pagedApplicants: RetirementPlanApplication[] = [];
  page = 1;

  constructor(){}

  ngOnInit(): void {
    const storedApplicants = localStorage.getItem('retirementPlanApplicants');
     if (storedApplicants) {
      this.retirementPlanApplicants = JSON.parse(storedApplicants);
  
      // Filter based on applicant status
      this.retirementPlanApplicants = this.retirementPlanApplicants.filter(applicant => applicant.status == 'accepted');

        // Initialize the paginated data
        this.pagedApplicants = this.retirementPlanApplicants.slice(0, 4);
    }
  }

   // Function to update paginated data when the page changes
   onPageChange(pageNumber: number): void {
    const startIndex = (pageNumber - 1) * 5;
    const endIndex = startIndex + 5;
    this.pagedApplicants = this.retirementPlanApplicants.slice(startIndex, endIndex);
  }
  
  // getting other details from the user
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
