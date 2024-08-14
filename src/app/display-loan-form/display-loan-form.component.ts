import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { solidIcons, brandIcons, regularIcons } from '../icon-library';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-display-loan-form',
  templateUrl: './display-loan-form.component.html',
  styleUrls: ['./display-loan-form.component.css']
})
export class DisplayLoanFormComponent implements OnInit{

  dataForm!: FormGroup;
  faXmark = solidIcons.faXmark;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { userId: number, status: string },
    private fb: FormBuilder, private dialogRef: MatDialogRef<DisplayLoanFormComponent>
  ) {}

  ngOnInit(): void {
    const loanApplicants = JSON.parse(localStorage.getItem('loanApplicants') || '[]');

    // Find the applicant that matches the userId and status
    const currentdata = loanApplicants.find((applicant: { userId: number; status: string; }) => {
      return applicant.userId === this.data.userId && applicant.status === this.data.status;
    });

    // Initialize the form with the found data
    this.dataForm = this.fb.group({
      userId: [currentdata.userId],
      loanType: [currentdata.loanType],
      panNumber: [currentdata.panNumber],
      occupation: [currentdata.occupation],
      status: [currentdata.status],
    });
  }

  print(){
    window.print();
  }

  closeModal(){
    this.dialogRef.close();
  }

}
