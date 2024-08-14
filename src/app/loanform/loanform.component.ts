import { Component} from '@angular/core';
import { solidIcons, brandIcons, regularIcons } from '../icon-library';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoanDataService } from './loan-data-service/loan-data.service';
import { PandataService } from '../shared/pandata.service';
import { LoanApplicant } from './Modal/loanViewModal';
import { Router } from '@angular/router';


@Component({
  selector: 'app-loanform',
  templateUrl: './loanform.component.html',
  styleUrls: ['./loanform.component.css']
})
export class LoanformComponent{

  loanform!: FormGroup;
  faDoorClosed = solidIcons.faDoorClosed;
  selectedDate!: string;
  maxDate!: string;
  storedUsers = localStorage.getItem('users');
  currentUser: any;

  constructor(private loanDataService: LoanDataService,
     private panDataService: PandataService, private router: Router)
     {
      this.updateDateRange(); // Set the initial date range

      this.loanform = new FormGroup({
        'userid': new FormControl(null, Validators.required),
        'occupation' : new FormControl(null, Validators.required),
        'pannumber' : new FormControl(
          null,
          [
            Validators.required,
            Validators.pattern(/^(?=(.*[A-Z]){5})(?=(.*\d){4})(?=.*[A-Z])[A-Z\d]{10}$/)
          ]),
        'loantype' : new FormControl(null, Validators.required)
        
    });
    }



    // set the maxDate
    updateDateRange() {
      const currentDate = new Date();
      const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
      // Format the minDate and maxDate as strings in "YYYY-MM-DD" format
      this.maxDate = maxDate.toISOString().split('T')[0];
    }


    // // validate pan card
    // validatePAN() {

    //   const userIdInput = document.getElementById('userid') as HTMLInputElement;
    //   const userId = parseInt(userIdInput.value.trim()); // Convert to integer
    
    //   // Retrieve the users from localStorage and parse it into an array of objects
    //   const usersData = localStorage.getItem('users');
    //   const usersdatalist = usersData ? JSON.parse(usersData) : [];
    
    //   const user = usersdatalist.find((user: { id: number }) => user.id === userId);
    //   const panmatching = document.getElementById('panmatching');
    
    //   if (user) {
    //     const panNumberInput = this.loanform.get('pannumber')?.value;
    
    //     // Check if the PAN values match
    //     if (user.pan !== panNumberInput) {
    //       // alert('This pan value is not corresponding to the user id');
    //       if(panmatching && panNumberInput != ''){
    //         panmatching.textContent = "Pan value not matched with userid";
    //       }
    //       else{
    //         if(panmatching){
    //           panmatching.textContent = "";
    //         }
    //       }
    //       return false;
    //     } 
    //     else{
    //       if(panmatching){
    //         panmatching.textContent = "";
    //       }
    //     }
    //   } 
    //   return true;
    // }

    validatePAN(): boolean{

      const panControl = this.loanform.get('pannumber');

      if(panControl) {
        const panValue = panControl.value;

        if(panValue == null || panValue == ""){
          panControl.setErrors({ required: true });
        } else{
          if(this.currentUser && this.currentUser.pan){
            if(panValue !== this.currentUser.pan){
              panControl.setErrors({ panInvalid: true});
              alert('PAN value is wrong');
              return false;
            }
          } else{
            panControl.setErrors(null);
            return false;
          }
        }
      }
      return true;
    }


    // validating userid
    // validateUserId(): boolean {
    //   const userIdInput = document.getElementById('userid') as HTMLInputElement;
    //   const userIdValue = userIdInput.value.trim(); // Trim the input value
    //   const userIdTouched = this.loanform.get('userid')?.touched;
    
    //   // Get the users data from local storage
    //   const storedUsers = localStorage.getItem('users');
    
    //   if (storedUsers) {
    //     // Parse the storedUsers JSON data into an array
    //     const usersArray = JSON.parse(storedUsers);
    //     console.log(usersArray);
    
    //     // Check if the userIdValue already exists in the usersArray
    //     const isUserIdExists = usersArray.some((user: { id: string; }) => user.id == userIdValue);
    //     console.log(userIdValue);
    //     console.log(isUserIdExists);

    //     const usernotexist = document.getElementById('usernotexist') as HTMLElement;
    
    //     if (!isUserIdExists) {
    //       if(usernotexist && userIdValue != ''){
    //         usernotexist.textContent = "User not exists";
    //       
    //       else{
    //         usernotexist.textContent = "";
    //       }
    //       // userIdInput.focus(); // Set focus back to the input field for correction
    //       return false; // Prevent form submission
    //     }
    //   }
    
    //   return true;
    // }

    validateUserId(): boolean{
      const userIdControl = this.loanform.get('userid');

      if(userIdControl){
        const userIdValue = userIdControl.value ;

        if(userIdValue == null || userIdValue === ''){
          userIdControl.setErrors({ required: true});
        }else{
          const isUserIdValid = this.checkUserIdValidity(userIdValue);

          if(!isUserIdValid){
            userIdControl.setErrors({ userIdInvalid: true});
            return false;
          }else{
            userIdControl.setErrors(null);
          }
        }
      }
      return true;
    }

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


    // submit function
    onSubmit() {
      if (this.loanform.valid && this.validateUserId() && this.validatePAN()) {
  
        // Create a new LoanApplicant object with form values
        const newLoanApplicant: LoanApplicant = {
            // applicantId: uuidv4(),
            userId: this.loanform.get('userid')?.value,
            occupation: this.loanform.get('occupation')?.value,
            panNumber: this.loanform.get('pannumber')?.value,
            loanType: this.loanform.get('loantype')?.value,
            status: 'pending'
        };
  
        // Call the createLoanApplication() method in your service
        this.loanDataService.createLoanApplication(newLoanApplicant);
        alert('submitted successfully');
        
        // Optionally, you can reset the form after submission
        this.loanform.reset();
        // console.log('Form Data:', this.loanDataService.getFormData());
      }
      else{
        alert("Pan value is not corresponding to the user id");
      }
    }


    goBack() {
      // Set isUrlChanged to false in the AppComponent
      // window.history.back();

      // this.appcomponent.isUrlChanged = false;
      this.router.navigateByUrl('/');
    }
  


}
