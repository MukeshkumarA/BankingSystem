import { Component, OnInit } from '@angular/core';
import { LoanApplicant } from '../loanform/Modal/loanViewModal';
import { LoanDataService } from '../loanform/loan-data-service/loan-data.service';
import { PandataService } from '../shared/pandata.service';
import { IUser } from '../signup/Modal/signupViewModal';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SubmitreasonDialogComponent } from '../submitreason-dialog/submitreason-dialog.component';


@Component({
  selector: 'app-carloan',
  templateUrl: './carloan.component.html',
  styleUrls: ['./carloan.component.css']
})
export class CarloanComponent implements OnInit{

  // loanData: any[] = [];
  loanApplicants: LoanApplicant[] = [];
  reason: string = '';
  pagedApplicants: LoanApplicant[] = [];
  page = 1;
  selectedApplicant: LoanApplicant | null = null;
  selectedAction: 'accepted' | 'rejected' = 'accepted'; // Default action is 'accept'

  constructor(private loanDataService: LoanDataService, 
  private panDataService: PandataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    // Get all the loan data from the service
    // const allLoanData = this.loanDataService.getFormData();
  
    // // Filter the loan data to get only "homeLoan" type
    // this.loanData = allLoanData.filter(data => data.loantype === 'carLoan');

    const storedApplicants = localStorage.getItem('loanApplicants');
    if (storedApplicants) {
     this.loanApplicants = JSON.parse(storedApplicants);
 
     // Filter the loan applicants to get only "homeLoan" type
     this.loanApplicants = this.loanApplicants.filter(applicant => applicant.loanType === 'vehicleLoan');

     // filtering the pending loans
     this.loanApplicants = this.loanApplicants.filter(applicant => applicant.status != 'accepted' && applicant.status != 'rejected' );
      
       // Initialize the paginated data
       this.pagedApplicants = this.loanApplicants.slice(0, 4);
    }
  }

  // pagination function
  onPageChange(pageNumber: number): void {
    const startIndex = (pageNumber - 1) * 5;
    const endIndex = startIndex + 5;
    this.pagedApplicants = this.loanApplicants.slice(startIndex, endIndex);
  }



  // setting status to the selected applicant.
  setSelectedApplicant(applicant: LoanApplicant, action: 'accepted' | 'rejected'): void {
    this.selectedApplicant = applicant;
    this.selectedAction = action;
  }

  openConfirmationDialog(action: 'accepted' | 'rejected', applicant: LoanApplicant): void {
    console.log("confiramtion");
    const dialogRef = this.dialog.open<ConfirmationDialogComponent<LoanApplicant>>(ConfirmationDialogComponent, {
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
      const applicantsString = localStorage.getItem('loanApplicants');
      if (applicantsString) {
        const applicants: LoanApplicant[] = JSON.parse(applicantsString);
        
        // Reverse the applicants array
        const reversedApplicants = applicants.slice().reverse();

        const lastMatchingIndex = reversedApplicants.findIndex(applicant =>
          applicant.userId === this.selectedApplicant!.userId && applicant.loanType === 'vehicleLoan'
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

  // showCibilScore(panNumber: string): void {
  //   const cibilScore = this.panDataService.getCibilScoreByPan(panNumber); 
  //   // Convert the cibilScore to a string before setting it in local storage
  //   const cibilScoreString = cibilScore !== null ? String(cibilScore) : ''; // or cibilScore?.toString() 
  //   localStorage.setItem('cibilscore', cibilScoreString);
  //   console.log('PAN Number:', panNumber);
  //   console.log('cibil score:', cibilScore);
  // }
  

  // getCibilScoreFromLocalStorage(): number | null {
  //   const cibilScoreString = localStorage.getItem('cibilscore');
  //   // Parse the cibilScoreString back to a number (if it exists) and return it
  //   return cibilScoreString !== null ? Number(cibilScoreString) : null;
  // }

  checkCibilScore(panNumber: string): boolean {
    const cibilScore = this.panDataService.getCibilScoreByPan(panNumber); // Assuming getCibilScore() returns the CIBIL score based on the PAN number
    // Check if cibilScore is not null and greater than 6
    return cibilScore !== null && cibilScore > 6;
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
