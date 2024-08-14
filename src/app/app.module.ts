import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EmployeeRegistrationComponent } from './Employee/employee-registration.component';
import { HttpClientModule } from '@angular/common/http';
// import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { CarloanComponent } from './carloan/carloan.component';
import { AcceptedcarloansComponent } from './acceptedcarloans/acceptedcarloans.component';
import { AcceptedhomeloansComponent } from './acceptedhomeloans/acceptedhomeloans.component';
import { CarloanTabComponent } from './carloan-tab/carloan-tab.component';
import { RejectedcarloansComponent } from './rejectedcarloans/rejectedcarloans.component';
import { RejectedhomeloansComponent } from './rejectedhomeloans/rejectedhomeloans.component';
import { LoanformComponent } from './loanform/loanform.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { SubmitreasonDialogComponent } from './submitreason-dialog/submitreason-dialog.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HomeloanTabComponent } from './homeloan-tab/homeloan-tab.component';
import { HomeloanComponent } from './homeloan/homeloan.component';
import { EnquirylistComponent } from './enquirylist/enquirylist.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MatSelectModule } from '@angular/material/select';


// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
// import { MatRadioModule } from '@angular/material/radio';

// import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap/carousel/carousel.module';
import { NgbModule,NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { UserApplicationsComponent } from './user-applications/user-applications.component';
import { GetcreditscoreComponent } from './getcreditscore/getcreditscore.component';
import { CreditCardComponent } from './creditcard-form/credit-card.component';
import { NestedshadowdomComponent } from './creditcard-form/nestedshadowdom/nestedshadowdom.component';
import { DebitcardApplyComponent } from './debitcard-apply/debitcard-apply.component';
import { EmbeddedComponent } from './debitcard-apply/embedded/embedded.component';
import { DisplayLoanFormComponent } from './display-loan-form/display-loan-form.component';
import { RetirementplanComponent } from './retirementPlan/retirementplan.component';
import { RetirementplaniframeComponent } from './retirementPlan/retirementplaniframe/retirementplaniframe.component';
import { PendingcreditcardsComponent } from './pendingcreditcards/pendingcreditcards.component';
import { AcceptedcreditcardsComponent } from './acceptedcreditcards/acceptedcreditcards.component';
import { RejectedcreditcardsComponent } from './rejectedcreditcards/rejectedcreditcards.component';
import { CreditcardTabComponent } from './creditcard-tab/creditcard-tab.component';
import { PendingRetirementplanComponent } from './pending-retirementplan/pending-retirementplan.component';
import { AcceptedRetirementplanComponent } from './accepted-retirementplan/accepted-retirementplan.component';
import { RejectedRetirementplanComponent } from './rejected-retirementplan/rejected-retirementplan.component';
import { RetimentPlanTabComponent } from './retiment-plan-tab/retiment-plan-tab.component';
import { DisplayRetirmentPlanComponent } from './display-retirment-plan/display-retirment-plan.component'; 




@NgModule({
  declarations: [
    AppComponent,
    NavigationbarComponent,
    HomeComponent,
    ServicesComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    EmployeeRegistrationComponent,
    AdmindashboardComponent,
    CarloanComponent,
    AcceptedcarloansComponent,
    AcceptedhomeloansComponent,
    CarloanTabComponent,
    RejectedcarloansComponent,
    RejectedhomeloansComponent,
    LoanformComponent,
    ConfirmationDialogComponent,
    SubmitreasonDialogComponent,
    HomeloanTabComponent,
    HomeloanComponent,
    EnquirylistComponent,
    UserDashboardComponent,
    UserApplicationsComponent,
    GetcreditscoreComponent,
    CreditCardComponent,
    NestedshadowdomComponent,
    DebitcardApplyComponent,
    EmbeddedComponent,
    DisplayLoanFormComponent,
    RetirementplanComponent,
    RetirementplaniframeComponent,
    PendingcreditcardsComponent,
    AcceptedcreditcardsComponent,
    RejectedcreditcardsComponent,
    CreditcardTabComponent,
    PendingRetirementplanComponent,
    AcceptedRetirementplanComponent,
    RejectedRetirementplanComponent,
    RetimentPlanTabComponent,
    DisplayRetirmentPlanComponent
    // AdmindashboardComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    MatTabsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgbModule,
    MatSelectModule
  ],
  
  // imports: [
  //   BrowserModule,
  //   AppRoutingModule,
  //   FontAwesomeModule,
  //   ReactiveFormsModule,
  //   FormsModule,
  //   MatDialogModule,
  //   HttpClientModule,
  //   MatTabsModule,
  //   BrowserAnimationsModule,
  //   NgxPaginationModule,
  //   // MatFormFieldModule,
  //   // MatInputModule,
  //   // MatDatepickerModule,
  //   // MatNativeDateModule,
  //   // MatRadioModule,
  //   NgbModule,
  //   NgbCarouselModule
  // ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
