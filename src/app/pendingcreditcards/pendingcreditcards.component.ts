import { Component, OnInit } from '@angular/core';
import { CreditCardApplicant } from '../creditcard-form/Modal/creditCardModal';
import { CreditcardService } from '../creditcard-form/credit-card-service/creditcard.service';
import { IUser } from '../signup/Modal/signupViewModal';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SubmitreasonDialogComponent } from '../submitreason-dialog/submitreason-dialog.component';

@Component({
  selector: 'app-pendingcreditcards',
  templateUrl: './pendingcreditcards.component.html',
  styleUrls: ['./pendingcreditcards.component.css']
})
export class PendingcreditcardsComponent implements OnInit{

  creditCardApplicants: CreditCardApplicant[] = [];
  reason: string = '';
  pagedApplicants: CreditCardApplicant[] = [];
  page = 1;
  selectedApplicant: CreditCardApplicant | null = null;
  selectedAction: 'accepted' | 'rejected' = 'accepted'; // Default action is 'accept'


  constructor(private creditCardService: CreditcardService, public dialog: MatDialog){}

  ngOnInit(): void{

    const storedApplicants = localStorage.getItem('creditCardApplicants');
    if (storedApplicants) {
     this.creditCardApplicants = JSON.parse(storedApplicants);

     // filtering the pending loans
     this.creditCardApplicants = this.creditCardApplicants.filter(applicant => applicant.status != 'accepted' && applicant.status != 'rejected' );
      
       // Initialize the paginated data
       this.pagedApplicants = this.creditCardApplicants.slice(0, 4);
    }
  }

  // pagination function
  onPageChange(pageNumber: number): void {
    const startIndex = (pageNumber - 1) * 5;
    const endIndex = startIndex + 5;
    this.pagedApplicants = this.creditCardApplicants.slice(startIndex, endIndex);
  }

   // setting status to the selected applicant.
   setSelectedApplicant(applicant: CreditCardApplicant, action: 'accepted' | 'rejected'): void {
    this.selectedApplicant = applicant;
    this.selectedAction = action;
  }

  openConfirmationDialog(action: 'accepted' | 'rejected', applicant: CreditCardApplicant): void {
    console.log("confiramtion");
    const dialogRef = this.dialog.open<ConfirmationDialogComponent<CreditCardApplicant>>(ConfirmationDialogComponent, {
      // width: '300px',    reason: string = '';
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
      // width: '300px',
      data: { action: this.selectedAction } // Pass the selected action to the Reason Dialog
    });

    dialogRef.afterClosed().subscribe(reason => {
      console.log(reason);
      if (reason) {
        // Perform your actions with the reason
        this.submitReason(reason);

        console.log(this.selectedAction);
      }
    });
  }

  submitReason(reason: string) {
    console.log('submit reason');
    if (this.selectedApplicant) {
      const usersString = localStorage.getItem('users');
  
      // Update the 'status' property in the loanApplicants array
      const applicantsString = localStorage.getItem('loanApplicants');
      if (applicantsString) {
        const applicants: CreditCardApplicant[] = JSON.parse(applicantsString);
        const applicantIndex = applicants.findIndex(applicant => applicant.userId === this.selectedApplicant!.userId);
  
        if (applicantIndex !== -1) {
          // Update the 'status' property for the applicant
          applicants[applicantIndex].status = this.selectedAction;
          applicants[applicantIndex].reason = reason;
                   
          // index of the list
          const index = this.creditCardApplicants.findIndex(index => index.userId === this.selectedApplicant?.userId);
          this.creditCardApplicants.splice(index, 1);
          // Save the updated applicants array back to local storage
          localStorage.setItem('creditCardApplicants', JSON.stringify(applicants));
        }
      }

      this.selectedApplicant = null; // Clear the selected applicant
      this.selectedAction = 'accepted'; // Reset the selected action
      this.reason = ''; // Clear the reason field   
    }
  }

  // to display other details directly from the users local storage.
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
