import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoanApplicant } from '../loanform/Modal/loanViewModal';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent<T> {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent<T>>,
    @Inject(MAT_DIALOG_DATA) public data: { action: 'accepted' | 'rejected', applicant: T }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    console.log("yes");
    this.dialogRef.close({ confirmation: true, action: this.data.action, applicant: this.data.applicant });
  }

}
