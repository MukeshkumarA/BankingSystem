import { Component,ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DebitCardApplicant } from '../Modal/debitcardModal';
import { DebitcardService } from '../debit-card-service/debitcard.service';
import { Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-embedded',
  templateUrl: './embedded.component.html',
  styleUrls: ['./embedded.component.css']
})
export class EmbeddedComponent {

  maxDate: string | undefined;
  debitCardForm: FormGroup;
  storedUsers = localStorage.getItem('users');
  currentUser: any;
  noChargeSelected: boolean = false;
  noCommunicationMethodsSelected: boolean = false;
  


  chargesArray: FormArray;
  chargeLabels = ['Room & Tax', 'City & Tax', 'Others'];
  chargesData: any;

  // userIdErrorElement: undefined;

  communicationMethods = [
    { id: 1, text: 'Phone' },
    { id: 2, text: 'Email' },
  ];


  constructor(private fb: FormBuilder,private elementRef: ElementRef,private renderer: Renderer2,private router: Router,
    private debitCardService: DebitcardService) {
    // calling the calculateMaxDate function
    this.calculateMaxDate();


    this.debitCardForm = this.fb.group({
      userIdValue: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      dateofbirth: ['', Validators.required],
      gender: ['Male'],
      address: ['', Validators.required],
      occupation: ['', Validators.required],
      income: ['', Validators.required],
      maritalStatus: ['single'],
      charges: this.fb.array([]),
      communicationMethods: [[], Validators.required],
    //   charges: this.fb.array([
    //   // Define your charges controls here
    //   this.fb.control(false), // Example: roomTax
    //   this.fb.control(false), // Example: cityTax
    //   this.fb.control(false), // Example: otherCharges
    // ])
      // income: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });

    
     // Assign chargesArray to the FormArray instance
      this.chargesArray = this.debitCardForm.get('charges') as FormArray;

      // Create and push FormControls with associated labels
      this.chargeLabels.forEach(label => {
          this.chargesArray.push(this.fb.control(false));
      });
  }


  onSubmit() {
    console.log('sunmit');
    // Check if at least one charge is selected
    const selectedCharges = this.chargesArray.controls
      .map((control, index) => {
        if (control.value === true) {
          return this.chargeLabels[index];
        }
        return null; // Return null for unselected charges
      })
      .filter(charge => charge !== null) as string[]; // Remove null values and cast to string[]

      const selectedCommunicationMethods: string[] = this.debitCardForm.get('communicationMethods')?.value;
      //selectedCardTypes array as needed
      console.log('Selected Card Types:', selectedCommunicationMethods);
  
    if (selectedCharges.length === 0) {
      // No charge is selected, display an error message
      this.noChargeSelected = true;
    }
    else if(selectedCommunicationMethods.length === 0){
      this.noCommunicationMethodsSelected = true;
    } else {
      // At least one charge is selected, proceed with form submission
      this.noChargeSelected = false;
  
      // Now you can access the selected charge names in selectedCharges array
      console.log('Selected Charges:', selectedCharges);
  
      // All other validations...
  
      if (
        this.validateUserId() &&
        this.validateFullName() &&
        this.validateEmail() &&
        this.validatePhone() &&
        this.validateDateOfBirth() &&
        this.validateGender() &&
        this.validateIncome()
      ) {
        // All validations passed, create a credit card applicant object
        const newCreditCardApplicant: DebitCardApplicant = {
          userId: this.debitCardForm.get('userIdValue')?.value,
          // fullname: this.creditCardForm.get('fullname')?.value,
          // email: this.creditCardForm.get('email')?.value,
          // phone: this.creditCardForm.get('phone')?.value,
          // dateofbirth: this.creditCardForm.get('dateofbirth')?.value,
          // gender: this.creditCardForm.get('gender')?.value,
          // address: this.creditCardForm.get('address')?.value,
          occupation: this.debitCardForm.get('occupation')?.value,
          income: this.debitCardForm.get('income')?.value,
          maritalStatus: this.debitCardForm.get('maritalStatus')?.value,
          charges: selectedCharges,
          communicationMethods: selectedCommunicationMethods,
          status:"pending",
          reason: ""
        };
  
        // Call the service method to submit the data
        this.debitCardService.createDebitCardApplication(newCreditCardApplicant);
  
        // Reset the form
        this.debitCardForm.reset();

        // Set default values for "gender" and "maritalStatus"
        this.debitCardForm.get('gender')?.setValue('Male');
        this.debitCardForm.get('maritalStatus')?.setValue('single');
  
        // Display a success message
        alert('Application submitted successfully');
      } else {
        // At least one validation failed, display a general error message
        alert('Please correct the errors in the form.');
      }
    }
  }
  
  

  validateIncome(): boolean{
    const incomeControl = this.debitCardForm.get('income');
    if (incomeControl) {
      const incomeValue = incomeControl.value;

      if(incomeValue == null){
        incomeControl.setErrors({ required: true });
      }
      
      else if (incomeValue.toString()?.startsWith('0') || incomeValue <= 0) {
        // Set an error on the income control
        incomeControl.setErrors({ incomeInvalid: true });
        return false;
        
      } else {
        // Clear the error if the condition is met
        incomeControl.setErrors(null);
      }
    }
    return true;
  }

  calculateMaxDate() {
    // Calculate the max date as 18 years ago from the current date
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    // Format it as YYYY-MM-DD, which is the format the "date" input type expects
    const year = maxDate.getFullYear();
    const month = (maxDate.getMonth() + 1).toString().padStart(2, '0');
    const day = maxDate.getDate().toString().padStart(2, '0');

    this.maxDate = `${year}-${month}-${day}`;
  }


  validateUserId(): boolean{
    // if (this.creditCardForm.get('userIdValue')?.invalid) {
      // Handle validation error, show error message, etc.
  
    const userIdControl = this.debitCardForm.get('userIdValue');
  
    // Get the users data from local storage
    
    if (userIdControl) {
      const userIdValue = userIdControl.value;
  
      if (userIdValue == null || userIdValue === '') {
        userIdControl.setErrors({ required: true });
      } else {
        // Check if the userIdValue exists in your data source (e.g., local storage)
        const isUserIdValid = this.checkUserIdValidity(userIdValue);
  
        if (!isUserIdValid) {
          userIdControl.setErrors({ userIdInvalid: true });
          return false;
        } else {
          userIdControl.setErrors(null);
        }
      }
    }
    return true;
  }

  // Function to check the validity of the User ID (You can modify this based on your data source)
  checkUserIdValidity(userId: number): boolean {
    if (!this.storedUsers) {
      return false; // Handle the case where data is not available
    }
  
    // Parse the storedUsers JSON data into an array
    const usersArray = JSON.parse(this.storedUsers);
  
    // Check if the userId exists in the usersArray
    const isUserIdExists = usersArray.some((user: { id: number }) => user.id == userId);
    if(isUserIdExists){
      this.currentUser = usersArray.find((user:{id: number}) => user.id === userId);
    }
  
    return isUserIdExists;
  }


  validateFullName(): boolean {
    const fullNameControl = this.debitCardForm.get('fullname');

    if (fullNameControl) {
      const fullNameValue = fullNameControl.value.toUpperCase();
  
      if (fullNameValue == "") {
        fullNameControl.setErrors({ required: true });
      } else {
        // Check if currentUser is defined and has a firstname property
        if (this.currentUser && this.currentUser.firstname) {
          const currentUserFirstName = this.currentUser.firstname.toUpperCase();
  
          if (!fullNameValue.includes(currentUserFirstName)) {
            fullNameControl.setErrors({ fullNameInvalid: true });
            // alert('Full name is wrong');
            return false;
          }
        } else {
          // Handle the case where currentUser is undefined or has no firstname
          fullNameControl.setErrors(null);
          return false;
        }
      }
    }
    return true;
  }
  

  validateEmail(): boolean {
    const emailControl = this.debitCardForm.get('email');
  
    if (emailControl) {
      const emailValue = emailControl.value;
  
      if (emailValue == "") {
        emailControl.setErrors({ required: true });
      } else {
        // Check if currentUser is defined and has an email property
        if (this.currentUser && this.currentUser.email) {
          if (emailValue !== this.currentUser.email) {
            emailControl.setErrors({ emailInvalid: true });
            // alert('Email is wrong');
            return false;
          }
        } else {
          emailControl.setErrors(null);
          return false;
        }
      }
    }
    return true;
  }
  

  // validatePhone():boolean{
  //   const phoneControl = this.debitCardForm.get('phone');
  //   if (phoneControl) {
  //     const phoneValue = phoneControl.value;
  
  //     if (phoneValue == "") {
  //       phoneControl.setErrors({ required: true });
  //     } else {
  //       // Check if currentUser is defined and phone number is not valid
  //       if (this.currentUser && phoneValue != this.currentUser.phonenumber) {
  //         phoneControl.setErrors({ phoneInvalid: true });
  //         // alert('Phone number is wrong');
  //         return false;
  //       }
  //     }
  //   }
  //   return true;
  // }

  validatePhone(): boolean {
    const phoneControl = this.debitCardForm.get('phone');
    
    if (phoneControl) {
      const phoneValue = phoneControl.value;
  
      if (phoneValue == "" || phoneValue == null) {
        phoneControl.setErrors({ required: true });
      } else {
        if (this.currentUser) {
          if (phoneValue != this.currentUser.phonenumber) {
            phoneControl.setErrors({ phoneInvalid: true });
            // alert('Phone number is wrong');
            return false;
          }
        }
      }
    }
    
    return true;
  }
  
  


  validateDateOfBirth(): boolean {
    const dobControl = this.debitCardForm.get('dateofbirth');
    if (dobControl) {
      const dobValue = dobControl.value;
    
      if (!dobValue) {
        dobControl.setErrors({ required: true });
        return false;
      } else {
        // Check if currentUser is defined and date of birth is not valid
        if (this.currentUser && dobValue != this.currentUser.dateofbirth) {
          dobControl.setErrors({ dobInvalid: true });
          // alert('Date of birth is wrong');
          return false;
        }
      }
    }
    return true;
  }

  validateGender(): boolean {
    const genderControl = this.debitCardForm.get('gender');
    if (genderControl) {
      const genderValue = genderControl.value;
  
      if (this.currentUser && genderValue != this.currentUser.gender) {
        genderControl.setErrors({ genderInvalid: true });
        // alert('Gender is wrong');
        return false;
      }
    }
    return true;
  }

  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }


}
