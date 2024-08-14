import { Component, OnInit } from '@angular/core';
import { RetirementPlanApplication } from '../retirementPlan/Modal/retirementPlanView';
import { RetirementplanService } from '../retirementPlan/retirementplan-service/retirementplan.service';
import { IUser } from '../signup/Modal/signupViewModal';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SubmitreasonDialogComponent } from '../submitreason-dialog/submitreason-dialog.component';

@Component({
  selector: 'app-pending-retirementplan',
  templateUrl: './pending-retirementplan.component.html',
  styleUrls: ['./pending-retirementplan.component.css']
})
export class PendingRetirementplanComponent {

  retirmentPlanApplicants: RetirementPlanApplication[] = [];
  reason: string = '';
  pagedApplicants: RetirementPlanApplication[] = [];
  page = 1;
  selectedApplicant: RetirementPlanApplication | null = null;
  selectedAction: 'accepted' | 'rejected' = 'accepted'; // Default action is 'accept'

  constructor(private retirementplanService: RetirementplanService,
     private dialog: MatDialog){}

     ngOnInit(): void { 
      const storedApplicants = localStorage.getItem('retirementPlanApplicants');
      if (storedApplicants) {
       this.retirmentPlanApplicants = JSON.parse(storedApplicants);
  
       // filtering the pending loans
       this.retirmentPlanApplicants = this.retirmentPlanApplicants.filter(applicant => applicant.status != 'accepted' && applicant.status != 'rejected' );
        
         // Initialize the paginated data
         this.pagedApplicants = this.retirmentPlanApplicants.slice(0, 4);
      }
    }  

  // pagination function
  onPageChange(pageNumber: number): void {
    const startIndex = (pageNumber - 1) * 5;
    const endIndex = startIndex + 5;
    this.pagedApplicants = this.retirmentPlanApplicants.slice(startIndex, endIndex);
  }


   // setting status to the selected applicant.
   setSelectedApplicant(applicant: RetirementPlanApplication, action: 'accepted' | 'rejected'): void {
    this.selectedApplicant = applicant;
    this.selectedAction = action;
  }

  openConfirmationDialog(action: 'accepted' | 'rejected', applicant: RetirementPlanApplication): void {
    console.log("confiramtion");
    const dialogRef = this.dialog.open<ConfirmationDialogComponent<RetirementPlanApplication>>(ConfirmationDialogComponent, {
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

  // Submitting the reason
  submitReason(reason: string) {
    console.log('submit reason');
    if (this.selectedApplicant) {
      const usersString = localStorage.getItem('users');

      // Update the 'status' property in the loanApplicants array
      const applicantsString = localStorage.getItem('retirementPlanApplicants');
      if (applicantsString) {
        const applicants: RetirementPlanApplication[] = JSON.parse(applicantsString);
        
        // Reverse the applicants array
        const reversedApplicants = applicants.slice().reverse();

        const lastMatchingIndex = reversedApplicants.findIndex(applicant =>
          applicant.userId === this.selectedApplicant!.userId);

        if (lastMatchingIndex !== -1) {
          // Calculate the original index from the reversed index
          const originalIndex = applicants.length - 1 - lastMatchingIndex;

          // Update the 'status' property for the applicant
          applicants[originalIndex].status = this.selectedAction;
          applicants[originalIndex].reason = reason;

          // Remove the item from the loanApplicants array
          const index = this.retirmentPlanApplicants.findIndex(item => item.userId === this.selectedApplicant?.userId);
          if (index !== -1) {
            this.retirmentPlanApplicants.splice(index, 1);
          }

          // Save the updated applicants array back to local storage
          localStorage.setItem('retirementPlanApplicants', JSON.stringify(applicants));
        }
      }

      this.selectedApplicant = null; // Clear the selected applicant
      this.selectedAction = 'accepted'; // Reset the selected action
      this.reason = ''; // Clear the reason field   
    }
  }

  // get other details from the user
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
