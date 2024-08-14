import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RetirementPlanApplication } from '../Modal/retirementPlanView';
import { RetirementplanService } from '../retirementplan-service/retirementplan.service';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-retirementplaniframe',
  templateUrl: './retirementplaniframe.component.html',
  styleUrls: ['./retirementplaniframe.component.css']
})
export class RetirementplaniframeComponent implements OnInit{

  retirementPlanForm: FormGroup;
  interestRate: number = 7.5;
  amount:number = 0;
  numberOfYears: number = 0;
  steps: string[] = ['step1', 'step2', 'step3']; // Add more step if needed
  activeStepIndex: number = 0; // Initialize the active step index to 0
  storedUsers = localStorage.getItem('users');
  currentUser: any;


  constructor(private fb: FormBuilder, private retirementPlanService: RetirementplanService ){

    this.retirementPlanForm = this.fb.group({
      userid:['', Validators.required],
      fullname:['', Validators.required],
      phonenumber:['', [Validators.required,Validators.pattern(/^\d{10}$/)]],
      email:['', [Validators.required, Validators.email]],
      income:['', Validators.required],
      ownplan: [false], // Checkbox initial value set to false
      plans: ['', { validators: [], updateOn: 'change' }], // Initialize without validators
      otherplan: ['', { validators: [], updateOn: 'change' }], // Initialize without validators
      years:[5],
      interest:['7.5%'],

    });

      // Listen to changes in the 'ownplan' control
    this.retirementPlanForm.get('ownplan')?.valueChanges.subscribe((ownplanValue) => {
      // Update the validators whenever 'ownplan' changes
      this.updateValidatorsBasedOnOwnPlan(ownplanValue);
    });

  }


  // clear and set validators
  updateValidatorsBasedOnOwnPlan(ownplanValue: boolean) {
    const plansControl = this.retirementPlanForm.get('plans');
    const otherplanControl = this.retirementPlanForm.get('otherplan');

    if (ownplanValue) {
      // If ownplan is true, enable 'otherplan' validators and disable 'plans' validators
      plansControl?.clearValidators();
      otherplanControl?.setValidators([Validators.required]);
    } else {
      // If ownplan is false, enable 'plans' validators and disable 'otherplan' validators
      otherplanControl?.clearValidators();
      plansControl?.setValidators([Validators.required]);
    }

    // Trigger validation update
    plansControl?.updateValueAndValidity();
    otherplanControl?.updateValueAndValidity();
  }
  


  ngOnInit(): void {
    this.updateYear();
  }

  updateYear() {
    // Update the value of inputValue2 when inputValue1 changes
    this.numberOfYears = this.retirementPlanForm.get('years')?.value;
  }

  updatePlan(){
    this.amount = this.retirementPlanForm.get('plans')?.value;
  }
  
  updateOwnAmount(){
    this.amount = this.retirementPlanForm.get('otherplan')?.value;
  }

  nextStep() {
    if (this.activeStepIndex < this.steps.length - 1) {
      this.activeStepIndex++;
    }
  }
  
  prevStep() {
    if (this.activeStepIndex > 0) {
      this.activeStepIndex--;
    }
  }

  // progress steps
  isActiveStep(index: number): boolean {
    return this.activeStepIndex === index;
  }

  // increment years
  increaseYears() {
    const yearsControl = this.retirementPlanForm.get('years');
    if (yearsControl) {
      const currentYears = yearsControl.value;
      if (currentYears < 55) {
        yearsControl.setValue(currentYears + 1);
      } else {
        // Display an alert or error message here for reaching the maximum limit
        alert("You've reached the maximum limit of 55 years.");
      }
    }
  }
  
  // decrement years
  decreaseYears() {
    const yearsControl = this.retirementPlanForm.get('years');
    if (yearsControl) {
      const currentYears = yearsControl.value;
      if (currentYears > 5) {
        yearsControl.setValue(currentYears - 1);
      } else {
        // Display an alert or error message here for reaching the minimum limit
        alert("You can't decrease below 5 years.");
      }
    }
  }

  validateUserId() {
    const userIdControl = this.retirementPlanForm.get('userid');
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
  

  validateFullName() {
    const fullNameControl = this.retirementPlanForm.get('fullname');
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
  
  validateEmail() {
    const emailControl = this.retirementPlanForm.get('email');
    if (emailControl) {
      const emailValue = emailControl.value;
  
      if (emailValue == "") {
        emailControl.setErrors({ required: true });
      } else {
        // Check if currentUser is defined and has an email property
        if (this.currentUser && this.currentUser.email) {
          if (emailValue !== this.currentUser.email) {
            emailControl.setErrors({ emailInvalid: true });
            alert('Email is wrong');
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
  
  validatePhone() {
    const phoneControl = this.retirementPlanForm.get('phonenumber');
    if (phoneControl) {
      const phoneValue = phoneControl.value;
  
      if (phoneValue == "") {
        phoneControl.setErrors({ required: true });
      } else {
        // Check if currentUser is defined and phone number is not valid
        if (this.currentUser && phoneValue != this.currentUser.phonenumber) {
          phoneControl.setErrors({ phoneInvalid: true });
          alert('Phone number is wrong');
          return false;
        }
      }
    }
    return true;
  }

  validateIncome() {
    const incomeControl = this.retirementPlanForm.get('income');
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

  onSubmit() {
    console.log('submit');
      if (
        // this.validateUserId() &&
        this.validateFullName() &&
        this.validateEmail() &&
        this.validatePhone() &&
        this.validateIncome()
      ) {
        // All validations passed, create a credit card applicant object
        const newRetirementPlanApplicant: RetirementPlanApplication = {
          userId: this.retirementPlanForm.get('userid')?.value,
          // fullname: this.creditCardForm.get('fullname')?.value,
          // email: this.creditCardForm.get('email')?.value,
          // phone: this.creditCardForm.get('phone')?.value,
          annualIncome: this.retirementPlanForm.get('income')?.value,
          plan: this.retirementPlanForm.get('ownplan')?.value
                ? this.retirementPlanForm.get('otherplan')?.value
                : this.retirementPlanForm.get('plans')?.value,
          numberOfYears: this.retirementPlanForm.get('years')?.value,
          interest: this.retirementPlanForm.get('interest')?.value,
          status: 'pending',
          reason: ''

        };
  
        // Call the service method to submit the data
        this.retirementPlanService.createRetirementPlanApplication(newRetirementPlanApplicant);
  
        // Reset the reactive form
        this.retirementPlanForm.reset();

        //resetting the preview page
        this.retirementPlanForm.get('interest')?.setValue('7.5%');
        this.retirementPlanForm.get('years')?.setValue('5');
        this.amount = 0;
  
        // set activeStepIndex to 0.
        this.activeStepIndex = 0;

        // Display a success message
        alert('Application submitted successfully');
      } else {
        // At least one validation failed, display a general error message
        alert('Please check for any errors in the form.');
      }
    }


}
 

