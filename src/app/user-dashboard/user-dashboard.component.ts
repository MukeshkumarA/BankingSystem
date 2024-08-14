import { Component, AfterViewInit } from '@angular/core';
import { ValidationServiceService } from '../LoginValidationService/validation-service.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../signup/user-realted-service/user.service';
import { IUser } from '../signup/Modal/signupViewModal';
import { SessiondataService } from '../sessiondataservice/sessiondata.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {

  user: IUser | undefined;
  username! : string;
  role!: string;

  constructor(private route: ActivatedRoute, private validationService: ValidationServiceService, 
    private sessiondataService: SessiondataService,
     private userService: UserService ){
      
     }

  ngOnInit(): void {

    // Access the username from the path parameters
    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.role = params['role'];
      this.user = this.userService.getUserByUsername(this.username);
    });

    // calling the updatedata in sessiondataservice
    // this.sessiondataService.updateDataFromLocalStorage();

    // Store values in localStorage
    localStorage.setItem('username', this.username);
    localStorage.setItem('role', this.role);

    this.sessiondataService.triggerData();

  //   this.validationService.isLoggedIn$.subscribe((isLoggedIn) => {
  //     this.isLoggedIn = isLoggedIn;
  // });
  
  }


  // ngAfterViewInit(): void {
  //   // Call the updateDataFromLocalStorage method after the view is initialized
  //   // this.sessiondataService.updateDataFromLocalStorage();
  // }

  


  images = [
    { url: "adsbanner1.jpg"},
    { url: "adsbanner2.jpg"},
    { url: "adsbanner3.jpg"},
    { url: "adsbanner4.jpg"},
    { url: "adsbanner5.jpg"},
    { url: "adsbanner6.jpg"},

  ];

}
