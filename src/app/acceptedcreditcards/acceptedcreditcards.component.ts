import { Component, OnInit } from '@angular/core';
import { CreditCardApplicant } from '../creditcard-form/Modal/creditCardModal';
import { IUser } from '../signup/Modal/signupViewModal';

@Component({
  selector: 'app-acceptedcreditcards',
  templateUrl: './acceptedcreditcards.component.html',
  styleUrls: ['./acceptedcreditcards.component.css']
})
export class AcceptedcreditcardsComponent implements OnInit{

  creditCardApplicants: CreditCardApplicant[] = [];
  pagedApplicants: CreditCardApplicant[] = [];
  page = 1;


  constructor(){}

  ngOnInit(): void {
    const storedApplicants = localStorage.getItem('creditCardApplicants');
     if (storedApplicants) {
      this.creditCardApplicants = JSON.parse(storedApplicants);
  
      // Filter based on applicant status
      this.creditCardApplicants = this.creditCardApplicants.filter(applicant => applicant.status == 'accepted');

        // Initialize the paginated data
        this.pagedApplicants = this.creditCardApplicants.slice(0, 4);
    }
  }

  // Function to update paginated data when the page changes
  onPageChange(pageNumber: number): void {
    const startIndex = (pageNumber - 1) * 5;
    const endIndex = startIndex + 5;
    this.pagedApplicants = this.creditCardApplicants.slice(startIndex, endIndex);
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
