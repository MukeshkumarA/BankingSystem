import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { solidIcons } from '../icon-library';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-display-retirment-plan',
  templateUrl: './display-retirment-plan.component.html',
  styleUrls: ['./display-retirment-plan.component.css']
})
export class DisplayRetirmentPlanComponent implements OnInit {

  retirmenetPlanForm!: FormGroup;
  faXmark = solidIcons.faXmark;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {userId: number, status: string},
    private fb: FormBuilder, private dialogRef: MatDialogRef<DisplayRetirmentPlanComponent>){}

  ngOnInit(): void {
   const applicants = JSON.parse(localStorage.getItem('retirementPlanApplicants') || '[]');

   const currentdata = applicants.find((applicant: { userId: number; status: string; }) => {
    return applicant.userId === this.data.userId && applicant.status === this.data.status;
   })


   // Initialize the form with the found data
   this.retirmenetPlanForm = this.fb.group({
    userId: [currentdata.userId],
    planAmount: [currentdata.plan],
    noOfYears: [currentdata.numberOfYears],
    interestRate: [currentdata.interest],
    status: [currentdata.status]
   });
  }

  print(){
    window.print();
  }

  closerModal(){
    this.dialogRef.close();
  }

}
