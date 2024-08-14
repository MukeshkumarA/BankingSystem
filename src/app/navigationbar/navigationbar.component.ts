import { ChangeDetectorRef,Component, OnInit, AfterViewInit} from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { EmployeeRegistrationComponent } from '../Employee/employee-registration.component';
import { Router } from '@angular/router';
import { solidIcons } from '../icon-library';
import { SessiondataService } from '../sessiondataservice/sessiondata.service';
import { Subscription} from 'rxjs';


@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit{

  
  faXmark = solidIcons.faXmark;
  showProfileDiv = false;
  showUserDetails = false;
  imageurl: string | null | undefined;
  username: string | null | undefined;
  role: string | null | undefined;
  usernamefirstletter: any | null;
  userId: number | undefined;

  // imageurl: string = '';
  // username: string = '';
  // role: string = '';
  // usernamefirstletter: string = '';

  
  private subscriptions: Subscription[] = [];
  

  constructor(private matDialog: MatDialog, private router: Router,
     private cdRef: ChangeDetectorRef, private sessionDataService: SessiondataService){

      this.sessionDataService.isFetchTrigger.subscribe(this.isFetchTriggered.bind(this));
    
  }

  
  ngOnInit() {
    // debugger
    // this.subscriptions.push(
    //   this.sessionDataService.imageurl$.subscribe((imageUrl) => (this.imageurl = imageUrl)),
    //   this.sessionDataService.username$.subscribe((username) => (this.username = username)),
    //   this.sessionDataService.role$.subscribe((role) => (this.role = role)),
    //   this.sessionDataService.userId$.subscribe((userId)=> (this.userId = userId)),
    //   this.sessionDataService.usernameFirstLetter$.subscribe(
    //     (firstLetter) => (this.usernamefirstletter = firstLetter)
    //   )
    // );
   }


  setNecessaryValues(){
    this.imageurl = localStorage.getItem('imageurl');
    this.username = localStorage.getItem('username');
    this.role = localStorage.getItem('role');
    this.usernamefirstletter = this.username?.charAt(0).toUpperCase();

    const users = localStorage.getItem('users');
    if (users) {
      const usersArray = JSON.parse(users);
      const userIndex = usersArray.findIndex((user: { username: string | null }) => user.username === this.username);
  
      if (userIndex !== -1) {
        this.userId = usersArray[userIndex].id; // Assuming 'id' is the property you want to retrieve
      }
    }
  }

  // ngOnInit(): void {
  //   this.sessionDataService.getImageUrl().subscribe(imageUrl => this.imageUrl = imageUrl);
  //   this.sessionDataService.getUsername().subscribe(username => this.username = username);
  //   this.sessionDataService.getRole().subscribe(role => this.role = role);
  //   this.sessionDataService.getUsernameFirstLetter().subscribe(usernameFirstLetter => this.usernameFirstLetter = usernameFirstLetter);
  //   this.sessionDataService.getUserId().subscribe(userId => this.userId = userId);
  // }


  // ngOnInit(): void {
  //   this.imageurl = localStorage.getItem('imageurl');
  //   this.username = localStorage.getItem('username');
  //   this.role = localStorage.getItem('role');
  //   this.usernamefirstletter = this.username?.charAt(0).toUpperCase();
  // }

  toggleProfileDiv() {
    this.showProfileDiv = !this.showProfileDiv;
  }

  toggleUserProfile(){
    this.showUserDetails = !this.showUserDetails;
  }

  adminlogout(){
    this.toggleProfileDiv();
    this.emptySession();
  }

  userlogout(){
    this.toggleUserProfile();
    this.emptySession();
  }

  // empty session
  emptySession(){
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('imageurl');
  }


  // check whether it is redirecting to admin page
  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }

  // check whether it is redirecting to user page
  isUserRoute(): boolean {
    return this.router.url.startsWith('/user');
  }

  openLoginModal(){
    this.matDialog.open(LoginComponent,{
      "width": '400px',
      "height": 'max-content'
    })
  }

  openSignupModal(){
    this.matDialog.open(SignupComponent,{
      "width": '700px',
      "height":"600px"
    })
  }

  openEmployeeSignupModal(){
    this.matDialog.open(EmployeeRegistrationComponent,{
      "width": '700px',
      "height": "600px"
    })
  }

   
  private isFetchTriggered(isFetch:boolean){
    if(isFetch){
      this.setNecessaryValues();
    }
  }

 
  // private isFetchTriggered(isFetch: boolean) {
  //   if (isFetch) {
  //     setTimeout(() => {
  //       this.setNecessaryValues();
  //     });
  //   }
  // }

}
