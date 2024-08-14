import { Component, OnInit } from '@angular/core';
// import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoanDataService } from './loanform/loan-data-service/loan-data.service';
import { UserService } from './signup/user-realted-service/user.service';
import { DebitcardService } from './debitcard-apply/debit-card-service/debitcard.service';
import { CreditcardService } from './creditcard-form/credit-card-service/creditcard.service';
import { RetirementplanService } from './retirementPlan/retirementplan-service/retirementplan.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BankingSystem';
  
  constructor(private router: Router, private loanDataService: LoanDataService, 
    private userService: UserService, private debitCardService: DebitcardService,
    private creditCardService: CreditcardService, private retirmentPlanService: RetirementplanService) {}

  ngOnInit(): void {
    // calling the fetchdata function in every services..
    this.loanDataService.fetchDataAndStoreInLocalStorage();
    this.userService.fetchDataAndStoreInLocalStorage();
    this.debitCardService.fetchDataAndStoreInLocalStorage();
    this.creditCardService.fetchDataAndStoreInLocalStorage();
    this.retirmentPlanService.fetchDataAndStoreInLocalStorage();
  }

  // Check if the current route is '/embeddediframe'
  isEmbeddedIframeRoute(): boolean {
    return this.router.url === '/embeddediframe';
  }

  // Check if the current route is '/retirementpalniframe'
  isIframeRoute(): boolean{
    return this.router.url === '/retirementpalniframe';
  }
  
}
