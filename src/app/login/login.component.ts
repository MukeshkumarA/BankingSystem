import { Component } from '@angular/core';
import { solidIcons, brandIcons, regularIcons } from '../icon-library';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ValidationServiceService } from '../LoginValidationService/validation-service.service';
import { UserService } from '../signup/user-realted-service/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  faXmark = solidIcons.faXmark;
  username!: string;
  password!: string;

  constructor(private dialofRef: MatDialogRef<LoginComponent>,
     private router: Router, private userService: UserService){

  }

  closeDialog(){
    this.dialofRef.close();
  }

  login() {
    const isAuthenticated = this.userService.login(this.username, this.password);
  
    if (isAuthenticated) {
      const user = this.userService.getCurrentUser();
      if (user) {
        if (user.role === "admin") {
          localStorage.setItem('imageurl', user.profileurl || '');
          this.router.navigate(['/admin', this.username, user.role]);
          this.closeDialog();
        } else if (user.role === 'guest') {
          localStorage.setItem('imageurl', user.profileurl || '');
          this.router.navigate(['/user', this.username, user.role]);
          this.closeDialog();
        }
      }
    } else {
      alert('Invalid credentials');
    }
  }
 
  validateUsername() {
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const usernameErrorElement = document.querySelector('.username-error') as HTMLElement;
    const username = usernameInput.value.trim();
  
    if (username === '') {
      usernameErrorElement.textContent = 'Username is required.';
    } else {
      // Clear the error message if the field is valid
      usernameErrorElement.textContent = '';
    }
  }
  
  validatePassword() {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const passwordErrorElement = document.querySelector('.password-error') as HTMLElement;
    const password = passwordInput.value.trim();
  
    if (password === '') {
      passwordErrorElement.textContent = 'Password is required.';
    } else {
      // Clear the error message if the field is valid
      passwordErrorElement.textContent = '';
    }
  }

}
