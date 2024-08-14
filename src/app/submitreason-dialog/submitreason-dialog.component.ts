import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-submitreason-dialog',
  templateUrl: './submitreason-dialog.component.html',
  styleUrls: ['./submitreason-dialog.component.css']
})
export class SubmitreasonDialogComponent {

  reason: string = ''; // Declare the reason property

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}
