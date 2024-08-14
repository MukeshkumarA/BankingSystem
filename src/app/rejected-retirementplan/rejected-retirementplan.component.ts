import { Component, OnInit} from '@angular/core';
import { RetirementPlanApplication } from '../retirementPlan/Modal/retirementPlanView';
import { IUser } from '../signup/Modal/signupViewModal';

@Component({
  selector: 'app-rejected-retirementplan',
  templateUrl: './rejected-retirementplan.component.html',
  styleUrls: ['./rejected-retirementplan.component.css']
})
export class RejectedRetirementplanComponent implements OnInit{

  retirementPlanApplicants: RetirementPlanApplication[] = [];
  pagedApplicants: RetirementPlanApplication[] = [];
  page = 1;

  constructor(){}

  ngOnInit(): void {
    // Get all the loan applicants directly from local storage
    const storedApplicants = localStorage.getItem('retirementPlanApplicants');
    if (storedApplicants) {
     this.retirementPlanApplicants = JSON.parse(storedApplicants);

     // Filter based on applicant.accepted status
     this.retirementPlanApplicants = this.retirementPlanApplicants.filter(applicant => applicant.status == 'rejected');

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
