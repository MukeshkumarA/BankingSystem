import { Component } from '@angular/core';
import { solidIcons, brandIcons, regularIcons } from '../icon-library';
import { StateandcityService } from '../shared/stateandcity.service';
import { Employee } from './Modal/employeeViewModal';
import { EmployeeDataService } from './employee-data-service/employee-data.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.css']
})
export class EmployeeRegistrationComponent {

  employee: Employee = new Employee(); // Create an instance of the Employee class to hold form data
  faXmark = solidIcons.faXmark;
  maxDate!: string;
  states: any=[];
  cities: any=[];
  branches: any=[];
  showOptions = false;
  options: string[] = []; // Explicitly type the options array
  // Simulated local storage data
  employeeCodes: string[] = []; // Initialize as an empty array
  // employee: any = {
  //   // ... other properties
  //   gender: 'Male'
  // };
  hideCommunicationAddress = false;

  employeesData = localStorage.getItem('employees');
  employeesDataList = this.employeesData ? JSON.parse(this.employeesData) : [];

  constructor(private stateandCityService: StateandcityService,
    private employeeDataService: EmployeeDataService,
    private dialogRef: MatDialogRef<EmployeeRegistrationComponent>)
    {
    this.updateDateRange();
    }


    ngOnInit(): void{
      this.states = this.stateandCityService.state()
      this.employee.gender = 'Male'; // Set the initial value
  
        if (this.employeesDataList.length > 0) {
          this.employeeCodes = this.employeesDataList
            .map((employee: { employeeCode: any; }) => employee.employeeCode as any)
            .filter((employeeCode: any): employeeCode is string => typeof employeeCode === 'string');
        } else {
          this.employeeCodes = []; // Initialize to an empty array if employeesDataList is empty
        }
     }


     // close the modal
     closeModal(){
      this.dialogRef.close();
     }

     // hiding the communication address
    toggleHideCommunicationAddress() {
      this.hideCommunicationAddress = !this.hideCommunicationAddress;
    }

    // search employee reference id
    searchOptions() {
      const searchTerm = this.employee.referenceId;
      // Implement your search logic here
      if (searchTerm) {
          this.options = this.employeeCodes.filter(option =>
              option.toLowerCase().includes(searchTerm.toLowerCase()) 
          );
      } else {
          this.options = [];
      }
    }


  selectOption(option: string) {
      this.employee.referenceId = option;
      this.showOptions = false;
      this.options = [];
  }

  // function to update the date range
  updateDateRange() {
    const currentDate = new Date();
    const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
    // const minDate = new Date(maxDate);
    // minDate.setFullYear(maxDate.getFullYear() - 100);

    // Format the minDate and maxDate as strings in "YYYY-MM-DD" format
    // this.minDate = minDate.toISOString().split('T')[0];
    this.maxDate = maxDate.toISOString().split('T')[0];
  }


  
  selectCity(state: any) {
    const selectedStateId = state.target.value;
    const selectedState = this.states.find((state: any) => state.stateId == selectedStateId);
  
    if (selectedState) {
      this.employee.state = selectedStateId; // Set the state name
      this.cities = this.stateandCityService.city().filter(e => e.stateId == selectedStateId);
    }
  }

  
  
  selectBranch(city: any) {
    const selectedCityId = city.target.value;
    const selectedCity = this.cities.find((city: any) => city.cityId == selectedCityId);
  
    if (selectedCity) {
      this.employee.city = selectedCityId; // Set the city ID
      this.branches = this.stateandCityService.branch().filter(e => e.cityId == selectedCityId);
    }
  }


  // validations
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
    } 
    else {
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
    } 
    else {
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
    else if(this.isPanDuplicate(pan))
    {
      alert('PanNumber already exists.');
      errorElement.textContent = 'PanNumber already exists';
    }
    else {
      errorElement.textContent = '';
    }
  }

  isPanDuplicate(pan: string): boolean {
    // const lowercasepan = pan.toLowerCase();
    // getting all the emails of the users
    const employeePanvalues = this.employeesDataList.map((employee: { pan: string; }) => employee.pan);
    
    return employeePanvalues.includes(pan);
  }
  
  isEmailDuplicate(email:string) {
    const lowercaseEmail = email.toLowerCase();
    // getting all the emails of the users
    const employeeEmails = this.employeesDataList.map((employee: { email: string; }) => employee.email);

    return employeeEmails.includes(lowercaseEmail);
  }



  isAadharDuplicate(aadharNumber: string): boolean {
    // getting all the emails of the users
    const employeeAadhars = this.employeesDataList.map((employee: { aadharNumber: string; }) => employee.aadharNumber);

    return employeeAadhars.includes(aadharNumber);
  }
  
  validateEmployeeCode() {
    const referenceInput = document.getElementById('reference') as HTMLInputElement;
    const errorElement = document.querySelector('.referenceerror') as HTMLElement;
    const reference = referenceInput.value.trim();

    if (reference === '') {
        errorElement.textContent = 'Employee code is required.';
    } else {
        // Implement further validation logic as needed
        errorElement.textContent = '';
    }
  }

    validateCommunicationAddress(): void {
      const addressInput = document.getElementById('communicationAddress') as HTMLInputElement;
      const errorElement = document.querySelector('.communicationAddressError') as HTMLElement;
      const address = addressInput.value.trim();

      if (address === '') {
        errorElement.textContent = 'Address is required.';
      } else {
        errorElement.textContent = '';
      }
    }

    validatePermanentAddress(): void {
      const addressInput = document.getElementById('permanentAddress') as HTMLInputElement;
      const errorElement = document.querySelector('.permanentAddresserror') as HTMLElement;
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
          } 

          else {
            errorElement.textContent = '';
          }
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



    
      submit(){
        this.validateFirstname();
        this.validateLastname();
        this.validateFathername();
        this.validateDateOfBirth();
        this.validatePhoneNumber();
        this.validateAadharNumber();
        this.validateEmail();
        this.validatePan();
        if (!this.hideCommunicationAddress) {
          this.validateCommunicationAddress();
        }
        this.validatePermanentAddress();
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
           const selectedState = this.states.find((state: any) => state.stateId == this.employee.state);
           const selectedCity = this.cities.find((city: any) => city.cityId == this.employee.city);
      
           if (selectedState && selectedCity) {
             // Store state and city names in the user object
             this.employee.state = selectedState.stateName;
             this.employee.city = selectedCity.cityName;
           }
          console.log('Employee Data:', this.employee);
          // this.employee = new Employee(); 
      
          // Call the createUser function from the UserService to store the user data
          this.employeeDataService.createEmployee(this.employee);
      
          // Form is valid, perform the form submission or other actions here
          alert('Form submitted successfully!');
          console.log("form submitted");
          
          // reset the employee object after successful submission
          this.employee = new Employee(); 
      
          // resetting the password check input
          const confirmPassword = document.getElementById('passwordcheck')as HTMLInputElement;
          confirmPassword.value = '';
        }
        else {
          alert('Please fill all details');
        }
      }
        

}
