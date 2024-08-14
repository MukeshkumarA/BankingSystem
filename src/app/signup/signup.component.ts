import { Component } from '@angular/core';
import { solidIcons, brandIcons, regularIcons } from '../icon-library';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './Modal/signupViewModal';
import { StateandcityService } from '../shared/stateandcity.service';
import { UserService } from './user-realted-service/user.service';
import { PandataService } from '../shared/pandata.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  // Retrieve the users from localStorage and parse it into an array of objects
  usersData = localStorage.getItem('users');
  usersdatalist = this.usersData ? JSON.parse(this.usersData) : [];

  faXmark = solidIcons.faXmark;
  // signupForm!: FormGroup;
  user: User = new User(); // User object to store the user data
  // Add the 'id' property here
  maxDate!: string;

  constructor(private stateandCityService: StateandcityService, 
    private userService: UserService, private panDataService: PandataService,
    private dialogRef: MatDialogRef<SignupComponent>){
    this.updateDateRange();
   }

   states: any=[];
  cities: any=[];
  branches: any=[];

  users: any[] = []; // Use the appropriate type for the users array
  selectedUser: any; // Use the appropriate type for the user object
  showUserList: boolean = false; // Flag to control the visibility of the table for the list of users
  showSingleUserDetails: boolean = false; // Flag to control the visibility of the table for a single user


  ngOnInit(): void {
    this.states = this.stateandCityService.state()
    this.user.gender = 'Male';
  }


  selectCity(state: any) {
    const selectedStateId = state.target.value;
    const selectedState = this.states.find((state: any) => state.stateId == selectedStateId);
  
    if (selectedState) {
      this.user.state = selectedStateId; // Set the state ID
      this.cities = this.stateandCityService.city().filter(e => e.stateId == selectedStateId);
    }
  }
  
  
  selectBranch(city: any) {
    const selectedCityId = city.target.value;
    const selectedCity = this.cities.find((city: any) => city.cityId == selectedCityId);
  
    if (selectedCity) {
      this.user.city = selectedCityId; // Set the city ID
      this.branches = this.stateandCityService.branch().filter(e => e.cityId == selectedCityId);
    }
  }
  

   updateDateRange() {
    const currentDate = new Date();
    const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
    // const minDate = new Date(maxDate);
    // minDate.setFullYear(maxDate.getFullYear() - 100);

    // Format the minDate and maxDate as strings in "YYYY-MM-DD" format
    // this.minDate = minDate.toISOString().split('T')[0];
    this.maxDate = maxDate.toISOString().split('T')[0];
  }

  closeModal(){
    this.dialogRef.close();
  }


  submit(){
    this.validateFirstname();
    this.validateLastname();
    this.validateFathername();
    this.validateDateOfBirth();
    this.validatePhoneNumber();
    this.validateAadharNumber();
    this.validateEmail();
    this.validatePan();
    this.validateAddress();
    this.validateState();
    this.validateCity();
    this.validateBranch();
    this.validatePincode();
    this.validateUsername();
    this.validatePassword();
    this.validateConfirmPassword();
    console.log('console.log');

    const allErrors = document.querySelectorAll('.error');
    const isValid = Array.from(allErrors).every(error => error.textContent === '');

    if (isValid) {

      // Find the selected state and city objects
      const selectedState = this.states.find((state: any) => state.stateId == this.user.state);
      const selectedCity = this.cities.find((city: any) => city.cityId == this.user.city);

      if (selectedState && selectedCity) {
        // Store state and city names in the user object
        this.user.state = selectedState.stateName;
        this.user.city = selectedCity.cityName;
  
        // Call the createUser function from the UserService to store the user data
        this.userService.createUser(this.user);

        // Form is valid, perform the form submission or other actions here
        alert('Form submitted successfully!');
  
        // reset the user object after successful submission
        this.user = new User();

        const confirmPassword = document.getElementById('passwordcheck')as HTMLInputElement;
        confirmPassword.value = '';
      }
    }
    else {
      alert('Please fill all details');
    }
  }



    validateFirstname() {
      const firstNameInput = document.getElementById('firstname') as HTMLInputElement;
     const errorElement = document.querySelector('.firstnameerror') as HTMLElement;
      const firstname = firstNameInput.value.trim();
  
      if (firstname === '') {
        errorElement.textContent = 'Firstname is required.';
      } else if (firstname.length < 3) {
        errorElement.textContent = 'Minimum 3 characters.';
      } else {
        errorElement.textContent = '';
      }
    }
    

    validateLastname(): void {
      const lastnameInput = document.getElementById('lastname') as HTMLInputElement;
      const errorElement = document.querySelector('.lastnameerror')!;
      const lastname = lastnameInput.value.trim();
  
      if (lastname === '') {
        errorElement.textContent = 'Last name is required.';
      } else if (lastname.length < 3) {
        errorElement.textContent = 'Minimum 3 characters.';
      } else {
        errorElement.textContent = '';
      }
    }

    validateFathername(): void {
      const fathernameInput = document.getElementById('fathername') as HTMLInputElement;
      const errorElement = document.querySelector('.fathernameerror') as HTMLElement;
      const fathername = fathernameInput.value.trim();
  
      if (fathername === '') {
        errorElement.textContent = 'Father name is required.';
      } else if (fathername.length < 3) {
        errorElement.textContent = 'Minimum 3 characters.';
      } else {
        errorElement.textContent = '';
      }
    }

    validateDateOfBirth(): void {
      const dobInput = document.getElementById('dateofbirth') as HTMLInputElement;
      const errorElement = document.querySelector('.dateofbirtherror') as HTMLElement;
      const dob = dobInput.value.trim();
  
      if (dob === '') {
        errorElement.textContent = 'Date of Birth is required.';
      } else {
        // Add additional validation if needed
        errorElement.textContent = '';
      }
    }

    validateGender() {
      const male = document.getElementById('male') as HTMLInputElement;
      const female = document.getElementById('female') as HTMLInputElement;
      const others = document.getElementById('others') as HTMLInputElement;
      const genderError = document.querySelector('.genderError') as HTMLElement;
    
      if(genderError){
        genderError.innerHTML = '';
      }
    
      if (!male.checked && !female.checked && !others.checked) {
        genderError.innerHTML = 'Must be selected!';
        return true;
      } else {
        genderError.innerHTML = '';
      }
    
      return false;
    }
    
  

    validatePhoneNumber(): void {
      const phoneInput = document.getElementById('phone') as HTMLInputElement;
      const errorElement = document.querySelector('.phonenumbererror') as HTMLElement;
      const phoneNumber = phoneInput.value.trim();
    
      if (phoneNumber === '') {
        errorElement.textContent = 'Phone number is required.';
      } else if (!/^\d{10}$/.test(phoneNumber)) {
        errorElement.textContent = 'Invalid phone number format.';
      } else {
        errorElement.textContent = '';
      }
    }
    
    validateAadharNumber(): void {
      console.log("aadhar");
      const aadharInput = document.getElementById('aadhar') as HTMLInputElement;
      const errorElement = document.querySelector('.aadharnumbererror') as HTMLElement;
      const aadharNumber = aadharInput.value.trim();
    
      if (aadharNumber === '') {
        errorElement.textContent = 'Aadhar number is required.';
      } else if (!/^\d{12}$/.test(aadharNumber)) {
        errorElement.textContent = 'Invalid Aadhar number.';
      }else if (this.isAadharDuplicate(aadharNumber)) {
        alert('Aadhar numberalready exists.');
        errorElement.textContent = 'Aadhar number already exists.';
      } else {
        errorElement.textContent = '';
      }
    }
    
    validateEmail(): void {
      console.log("email");
      const emailInput = document.getElementById('email') as HTMLInputElement;
      const errorElement = document.querySelector('.emailerror') as HTMLElement;
      const email = emailInput.value.trim();
    
      if (email === '') {
        errorElement.textContent = 'Email is required.';
      } else if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) {
        errorElement.textContent = 'Invalid email address.';
      }else if (this.isEmailDuplicate(email)) {
        alert('Email already exists.');
        errorElement.textContent = 'Email already exists';
      } else {
        errorElement.textContent = '';
      }
    }

    validatePan(): void {
      console.log("pan");
      const panInput = document.getElementById('pannumber') as HTMLInputElement;
      const errorElement = document.querySelector('.panerror') as HTMLElement;
      const pan = panInput.value.trim();
    
      if (pan === '') {
        errorElement.textContent = 'PAN is required.';
      } else if (!/^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/.test(pan)) {
        errorElement.textContent = 'Invalid PAN format.';
      } 
      else{
          const isPanFound = this.panDataService.checkPanExists(pan);
          if (!isPanFound) {
            alert("Pan card value not found");
          }
          else if (this.isPanDuplicate(pan)) {
            alert('Pan card value already exists.');
            errorElement.textContent = 'Pan card value already exists.';
          }
          else {
            errorElement.textContent = '';
          }
      }
    }

    isPanDuplicate(pan: string): boolean {
      // const lowercasepan = pan.toLowerCase();
      // getting all the emails of the users
      const userPanvalues = this.usersdatalist.map((user: { pan: string; }) => user.pan);
      
      return userPanvalues.includes(pan);
    }
    
    isEmailDuplicate(email:string) {
      const lowercaseEmail = email.toLowerCase();
      // getting all the emails of the users
      const userEmails = this.usersdatalist.map((user: { email: string; }) => user.email);

      return userEmails.includes(lowercaseEmail);
    }



    isAadharDuplicate(aadhar: string): boolean {
      // getting all the emails of the users
      const userAadhars = this.usersdatalist.map((user: { aadhar: string; }) => user.aadhar);

      return userAadhars.includes(aadhar);
    }
    
    validateAddress(): void {
      const addressInput = document.getElementById('address') as HTMLInputElement;
      const errorElement = document.querySelector('.addresserror') as HTMLElement;
      const address = addressInput.value.trim();

      if (address === '') {
        errorElement.textContent = 'Address is required.';
      } else {
        errorElement.textContent = '';
      }
    }

validateState(): void {
  const stateInput = document.getElementById('statedropdown') as HTMLSelectElement;
  const errorElement = document.querySelector('.stateerror') as HTMLElement;
  const state = stateInput.value.trim();

  if (state === '') {
    errorElement.textContent = 'State is required.';
  } else {
    errorElement.textContent = '';
  }
}

validateCity(): void {
  const cityInput = document.getElementById('city') as HTMLSelectElement;
  const errorElement = document.querySelector('.cityerror') as HTMLElement;
  const city = cityInput.value.trim();

  if (city === '') {
    errorElement.textContent = 'City is required.';
  } else {
    errorElement.textContent = '';
  }
}

validateBranch(): void {
  const branchInput = document.getElementById('branch') as HTMLSelectElement;
  const errorElement = document.querySelector('.brancherror') as HTMLElement;
  const branch = branchInput.value.trim();

  if (branch === '') {
    errorElement.textContent = 'Branch is required.';
  } else {
    errorElement.textContent = '';
  }
}

validatePincode(): void {
  const pincodeInput = document.getElementById('pincode') as HTMLInputElement;
  const errorElement = document.querySelector('.pincodeerror') as HTMLElement;
  const pincode = pincodeInput.value.trim();

  if (pincode === '') {
    errorElement.textContent = 'Pincode is required.';
  } else if (!/^\d{6}$/.test(pincode)) {
    errorElement.textContent = 'Invalid pincode format.';
  } else {
    errorElement.textContent = '';
  }
}

validateUsername(): void {
  const usernameInput = document.getElementById('username') as HTMLInputElement;
  const errorElement = document.querySelector('.usernameerror') as HTMLElement;
  const username = usernameInput.value.trim();

  if (username === '') {
    errorElement.textContent = 'Username is required.';
  } else if (username.length < 6) {
    errorElement.textContent = 'Minimum 6 characters.';
  } else if (this.isusernameDuplicate(username)) {
    alert('Username already exists.');
    errorElement.textContent = 'Username already exists';
  } else {
    errorElement.textContent = '';
  }
}

isusernameDuplicate(username:string) {
  const lowercaseusername = username.toLowerCase();
  // getting all the emails of the users
  const usernames = this.usersdatalist.map((user: { username: string; }) => user.username);

  return usernames.includes(lowercaseusername);
}


validatePassword(): void {
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const errorElement = document.querySelector('.passworderror') as HTMLElement;
  const password = passwordInput.value.trim();

  if (password === '') {
    errorElement.textContent = 'Password is required.';
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
    errorElement.textContent =
      'Password credentials not matched.';
  } else {
    errorElement.textContent = '';
  }
}

validateConfirmPassword(): void {
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const confirmPasswordInput = document.getElementById('passwordcheck') as HTMLInputElement;
  const errorElement = document.querySelector('.confirmpassworderror') as HTMLElement;
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  if (confirmPassword === '') {
    errorElement.textContent = 'Please confirm your password.';
  } else if (password !== confirmPassword) {
    errorElement.textContent = 'Passwords not matched.';
  } else {
    errorElement.textContent = '';
  }
}




}
