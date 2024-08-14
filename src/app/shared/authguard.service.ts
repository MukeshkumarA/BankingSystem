import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ValidationServiceService } from '../LoginValidationService/validation-service.service';
import { UserService } from '../signup/user-realted-service/user.service';
import { IUser } from '../signup/Modal/signupViewModal';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private validationService: ValidationServiceService,private userService: UserService, private router: Router) { }

  canActivate(): boolean {
    if (this.userService.isAuthenticated()) {
      return true;
    } else {
      // this.router.navigate(['/login']); // Redirect to login page
      alert("Unauthorized! please login again");
      this.router.navigate(['/']);
      return false;
    }
  }

}
