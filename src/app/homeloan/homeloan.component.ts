import { Component, Inject } from '@angular/core';
import { LoanDataService } from '../loanform/loan-data-service/loan-data.service';
import { PandataService } from '../shared/pandata.service';
import { LoanApplicant } from '../loanform/Modal/loanViewModal';
import { IUser } from '../signup/Modal/signupViewModal';
import { UserService } from '../signup/user-realted-service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SubmitreasonDialogComponent } from '../submitreason-dialog/submitreason-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination/public-api';

@Component({
  selector: 'app-homeloan',
  templateUrl: './homeloan.component.html',
  styleUrls: ['./homeloan.component.css']
})
export class HomeloanComponent {

  
  loanData: any[] = [];
  loanApplicants: LoanApplicant[] = [];
  reason: string = '';

  pagedApplicants: LoanApplicant[] = []; // Array for paginated data
  page = 1;


  constructor(private loanDataService: LoanDataService, 
    private panDataService: PandataService, private userService: UserService,public dialog: MatDialog) { }


  ngOnInit(): void {
     const storedApplicants = localStorage.getItem('loanApplicants');
     if (storedApplicants) {
      this.loanApplicants = JSON.parse(storedApplicants);
  
      // Filter the loan applicants to get only "homeLoan" type
      this.loanApplicants = this.loanApplicants.filter(applicant => applicant.loanType === 'homeLoan');

      // Filter based on applicant status
      this.loanApplicants = this.loanApplicants.filter(applicant => applicant.status != 'accepted' && applicant.status != 'rejected' );
    
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

 

  openConfirmationDialog(action: 'accepted' | 'rejected', applicant: LoanApplicant): void {
    console.log("confiramtion");
    const dialogRef = this.dialog.open<ConfirmationDialogComponent<LoanApplicant>>(ConfirmationDialogComponent, {
      // width: '300px', // Set the width according to your needs
      data: { action, applicant }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.confirmation) {
        this.selectedApplicant = result.applicant;
        this.selectedAction = result.action;

        // Open the Reason Dialog when the user confirms
        this.openReasonDialog();
      }
    });
  }

  openReasonDialog(): void {
    const dialogRef = this.dialog.open(SubmitreasonDialogComponent, {
      // width: '300px', // Set the width according to your needs
      data: { action: this.selectedAction } // Pass the selected action to the Reason Dialog
    });

    dialogRef.afterClosed().subscribe(reason => {
      console.log(reason);
      if (reason) {
        // Perform your actions with the reason
        this.submitreason(reason);

        console.log(this.selectedAction);
      }
    });
  }

  submitreason(reason: string) {
    if (this.selectedApplicant) {
      const usersString = localStorage.getItem('users');
      // if (usersString) {
      //   const users: IUser[] = JSON.parse(usersString);
      //   const userIndex = users.findIndex(user => user.id === this.selectedApplicant!.userId);
  
      //   if (userIndex !== -1) {
      //     // Update the reason property for the user
      //     users[userIndex].reason = reason; // Use the passed reason parameter
  
      //     // Update the status property based on the selected action
      //     users[userIndex].status = this.selectedAction;
      //     console.log(users[userIndex])
  
      //     // Save the updated users array back to local storage
      //     localStorage.setItem('users', JSON.stringify(users));
      //   }
      // }
  
      // Update the 'status' property in the loanApplicants array
      const applicantsString = localStorage.getItem('loanApplicants');
      if (applicantsString) {
        const applicants: LoanApplicant[] = JSON.parse(applicantsString);
        
        // Reverse the applicants array
        const reversedApplicants = applicants.slice().reverse();

        const lastMatchingIndex = reversedApplicants.findIndex(applicant =>
          applicant.userId === this.selectedApplicant!.userId && applicant.loanType === 'carLoan'
        );

        if (lastMatchingIndex !== -1) {
          // Calculate the original index from the reversed index
          const originalIndex = applicants.length - 1 - lastMatchingIndex;

          // Update the 'status' property for the applicant
          applicants[originalIndex].status = this.selectedAction;
          applicants[originalIndex].reason = reason;

          // Remove the item from the loanApplicants array
          const index = this.loanApplicants.findIndex(item => item.userId === this.selectedApplicant?.userId);
          if (index !== -1) {
            this.loanApplicants.splice(index, 1);
          }

          // Save the updated applicants array back to local storage
          localStorage.setItem('loanApplicants', JSON.stringify(applicants));
        }
      }

      this.selectedApplicant = null; // Clear the selected applicant
      this.selectedAction = 'accepted'; // Reset the selected action
      this.reason = ''; // Clear the reason field
    }
  }

  showCibilScore(panNumber: string): void {
    const cibilScore = this.panDataService.getCibilScoreByPan(panNumber); 
    // Convert the cibilScore to a string before setting it in local storage
    const cibilScoreString = cibilScore !== null ? String(cibilScore) : ''; // or cibilScore?.toString() 
    localStorage.setItem('cibilscore', cibilScoreString);
    console.log('PAN Number:', panNumber);
    console.log('cibil score:', cibilScore);
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



selectedApplicant: LoanApplicant | null = null;
selectedAction: 'accepted' | 'rejected' = 'accepted'; // Default action is 'accept'

setSelectedApplicant(applicant: LoanApplicant, action: 'accepted' | 'rejected'): void {
  this.selectedApplicant = applicant;
  this.selectedAction = action;
}



}
