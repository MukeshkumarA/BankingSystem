import { Component, AfterViewInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationServiceService } from '../LoginValidationService/validation-service.service';
import { AppComponent } from '../app.component';
import { UserService } from '../signup/user-realted-service/user.service';
import { IUser } from '../signup/Modal/signupViewModal';
import { SessiondataService } from '../sessiondataservice/sessiondata.service';
// import { BackbuttonService } from '../shared/backbutton.service';


@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {

  username! : string;
  isLoggedIn!:boolean;
  role!: string;
  static username: any;
  usersData: any[] | null = null;
  userCount : number | undefined;
  loansApplied : number = 0;
  pendingLoans : number = 0;
  users: IUser[] = [];
  pagedApplicants: IUser[] = [];
  page = 1;




  constructor(private route: ActivatedRoute, private validationService: ValidationServiceService,
     private appcomponent: AppComponent, private router: Router,private sessiondataService:SessiondataService,
      private userService: UserService) {
      }

  ngOnInit(): void {
    
    // Access the username from the path parameters
    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.role = params['role'];
    });

    // calling the updatedata in sessiondataservice
    // this.sessiondataService.updateDataFromLocalStorage();

    localStorage.setItem('username',this.username);
    this.username = this.username.toUpperCase();
    localStorage.setItem('role', this.role);

    this.sessiondataService.triggerData();

    this.getActiveUsers();
    this.getLoanApplicantionCount();
    this.getPendingApplicationCount();


    const storedUsers = localStorage.getItem('users');
    if(storedUsers){
      this.users = JSON.parse(storedUsers);
      this.users = this.users.filter(user => user.hasOwnProperty('id'));
    }

    // Initialize the paginated data
    this.pagedApplicants = this.users.slice(0, 4);

    // disable back button
    // commented just befor.
    // this.backButtonService.disableBackButton();
  }


  // pagination function
  onPageChange(pageNumber: number): void {
    const startIndex = (pageNumber - 1) * 5;
    const endIndex = startIndex + 5;
    this.pagedApplicants = this.users.slice(startIndex, endIndex);
  }

  getActiveUsers(){
      const userDataString = localStorage.getItem('users');
      if (userDataString !== null) {
        this.usersData = JSON.parse(userDataString);
        const usersWithUserId = this.usersData?.filter((user: { hasOwnProperty: (arg0: string) => any; }) => user.hasOwnProperty('id'));
        this.userCount = usersWithUserId?.length;
      }
      else{
        this.userCount = 0;
      }
  }


  getLoanApplicantionCount(){
    const loanApplicantsDataString = localStorage.getItem('loanApplicants');

      // Check if data exists
      if (loanApplicantsDataString !== null) {
        // Parse loan applicant data
        const loanApplicantsData = JSON.parse(loanApplicantsDataString);
        this.loansApplied = loanApplicantsData.length;
      }
  }

  getPendingApplicationCount(){
    // Retrieve loan applicant data from local storage
    const loanApplicantsDataString = localStorage.getItem('loanApplicants');

    // Initialize count
    let pendingLoanApplicantsCount = 0;

    // Check if data exists
    if (loanApplicantsDataString !== null) {
      // Parse loan applicant data
      const loanApplicantsData = JSON.parse(loanApplicantsDataString);

      // Loop through the array and count pending loan applicants
      for (const applicant of loanApplicantsData) {
        if (applicant.status === 'pending') {
          pendingLoanApplicantsCount++;
        }
      }

      this.pendingLoans = pendingLoanApplicantsCount;

    } else {
      this.pendingLoans = 0;
    }

  }


  // logout(){
  //   this.userService.logout();
  //   this.appcomponent.isUrlChanged = false;

  //   // Redirect to the initial URL (root URL) of the application
  //   window.location.href = window.location.origin;
  // }

  // admincards: { title: string, description: string , url: string }[] = [
  //   { title: 'Home Loans', description: 'Home loan details', url: 'assets/loan.png' },
  //   { title: 'Vehicle Loans', description: 'Vehicle loan details', url: 'assets/car.png' },
  //   { title: 'Enquiry List', description: 'Queries list', url: 'assets/credit.png' },
  //   // { title: 'Accepted Home Loans', description: 'None', url: 'assets/salary.png' }
  //   // Add more card details here if needed
  // ];


  // gotoloans(title: string)
  // {
  //    if(title === "Home Loans")
  //    {
  //      this.router.navigate(['/homeloanstab']);
  //    }
  //    else if(title === "Vehicle Loans"){
  //     this.router.navigate(['/vehicleloanstab']);
  //    }
  //    else if(title === "Enquiry List"){
  //     this.router.navigate(['/enquirylist']);
  //    }
  // }

}
