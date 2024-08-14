import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SignupComponent } from './signup/signup.component';
import { EmployeeRegistrationComponent } from './Employee/employee-registration.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AuthguardService } from './shared/authguard.service';
import { LoanformComponent } from './loanform/loanform.component';
import { HomeloanTabComponent } from './homeloan-tab/homeloan-tab.component';
import { CarloanTabComponent } from './carloan-tab/carloan-tab.component';
import { EnquirylistComponent } from './enquirylist/enquirylist.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserApplicationsComponent } from './user-applications/user-applications.component';
import { GetcreditscoreComponent } from './getcreditscore/getcreditscore.component';
import { CreditCardComponent } from './creditcard-form/credit-card.component';
import { DebitcardApplyComponent } from './debitcard-apply/debitcard-apply.component';
import { EmbeddedComponent } from './debitcard-apply/embedded/embedded.component';
import { RetirementplaniframeComponent } from './retirementPlan/retirementplaniframe/retirementplaniframe.component';
import { RetirementplanComponent } from './retirementPlan/retirementplan.component';
import { RetimentPlanTabComponent } from './retiment-plan-tab/retiment-plan-tab.component';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'services', component: ServicesComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'home', component: HomeComponent},
  { path: 'employeesignup', component: EmployeeRegistrationComponent},
  { path: 'admin/:username/:role', component: AdmindashboardComponent, canActivate: [AuthguardService]}, // , canActivate: [AuthguardService]
  { path: 'user/:username/:role', component: UserDashboardComponent, canActivate: [AuthguardService]},
  { path: 'loanapplication', component: LoanformComponent },
  { path: 'admin/homeloanstab', component: HomeloanTabComponent, canActivate: [AuthguardService]},
  { path: 'admin/vehicleloanstab', component: CarloanTabComponent, canActivate: [AuthguardService]},
  { path: 'admin/enquirylist', component: EnquirylistComponent, canActivate: [AuthguardService]},
  { path: 'user/applications', component: UserApplicationsComponent, canActivate: [AuthguardService]},
  { path: 'user/getcreditscore', component: GetcreditscoreComponent, canActivate: [AuthguardService]},
  { path: 'creditcardapplication', component: CreditCardComponent},
  { path: 'debitcardapplication', component: DebitcardApplyComponent},
  { path: 'embeddediframe', component: EmbeddedComponent}, // ifrmae inside shadowroot
  { path: 'retirementpalniframe', component: RetirementplaniframeComponent}, // iframe alone
  { path: 'retirementplanapplication', component: RetirementplanComponent},
  { path: 'admin/retimentplantab', component: RetimentPlanTabComponent, canActivate: [AuthguardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
