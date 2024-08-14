import { Injectable } from '@angular/core';
import { CreditCardApplicant } from '../Modal/creditCardModal';
import { CreditCardApplicantStorage } from '../Modal/abstractClassforCreditcardApplicants';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CreditcardService implements CreditCardApplicantStorage{

  private creditCardApplicants: CreditCardApplicant[] = [];

  constructor(private http: HttpClient) {
    const storedApplicants = localStorage.getItem('creditCardApplicants');
    if (storedApplicants) {
      this.creditCardApplicants = JSON.parse(storedApplicants);
    }
   }

   
  createCreditCardApplication(creditCardApplicant: CreditCardApplicant): void {
    console.log('createcredit');
    // Determine the next unique applicantId
    const nextApplicantId = this.getNextApplicantId();

    // Set the applicantId in the provided CreditCardApplicant object
    creditCardApplicant.applicantId = nextApplicantId;

    // Store the applicant in the array (can also save it to a backend server or a database)
    this.creditCardApplicants.push(creditCardApplicant);
    this.saveApplicantsToLocalStorage();

  }

  getNextApplicantId(): number {
    // Calculate the next applicantId by checking the count of existing applicants
    const existingApplicantsCount = this.creditCardApplicants.length;
  
    // Start with 1 and add the count to get the next unique applicantId
    return 1 + existingApplicantsCount;
  }

   // create local storage...
   private saveApplicantsToLocalStorage(): void {
    // Retrieve loanApplicants from local storage if it exists
    const existingApplicantsJSON = localStorage.getItem('creditCardApplicants');
    let existingApplicants: CreditCardApplicant[] = existingApplicantsJSON ? JSON.parse(existingApplicantsJSON) : [];
  
    // Assuming this.loanApplicants is the array you want to store
    existingApplicants = this.creditCardApplicants;
  
    // Store the updated loanApplicants array in local storage
    localStorage.setItem('creditCardApplicants', JSON.stringify(existingApplicants));
  }

  // fetch data from local storage...
  fetchDataAndStoreInLocalStorage(){
    // get data from the data.json
    this.http.get('assets/data.json').subscribe((data:any) => {
      if(data.hasOwnProperty('creditCardApplicants')){
        localStorage.setItem('creditCardApplicants', JSON.stringify(data.creditCardApplicants));
      }
    });
  }

}
