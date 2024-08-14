import { Injectable } from '@angular/core';
import { LoanApplicant } from '../Modal/loanViewModal';
import { LoanApplicantStorage } from '../Modal/abstractClassforLoanApplicant';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class LoanDataService {

  private LoanDataArray: any[] = [];
  private loanApplicants: LoanApplicant[] = [];

  constructor(private http: HttpClient) {
    // Load users from local storage during service initialization
    const storedApplicants = localStorage.getItem('loanApplicants');
    if (storedApplicants) {
      this.loanApplicants = JSON.parse(storedApplicants);
    }
    // this.loanApplicants.push(...jdata.loanApplicants);
  }

  // create new loan application
  createLoanApplication(loanApplicant: LoanApplicant): void {
    // Store the applicant in the array (can also save it to a backend server or a database)
    const nextApplicantId = this.getNextApplicantId();

    // pushing the new values to loanApplicants.
    this.loanApplicants.push(loanApplicant);
    this.saveApplicantsToLocalStorage();

  }

  getNextApplicantId(): number {
    // Calculate the next applicantId by checking the count of existing applicants
    const existingApplicantsCount = this.loanApplicants.length;
    // Start with 1 and add the count to get the next unique applicantId
    return 1 + existingApplicantsCount;
  }


  // create local service...
  private saveApplicantsToLocalStorage(): void {
    // Retrieve loanApplicants from local storage if it exists
    const existingApplicantsJSON = localStorage.getItem('loanApplicants');
    let existingApplicants: LoanApplicant[] = existingApplicantsJSON ? JSON.parse(existingApplicantsJSON) : [];
  
    // this.loanApplicants is the array you want to store
    existingApplicants = this.loanApplicants;
  
    // Store the updated loanApplicants array in local storage
    localStorage.setItem('loanApplicants', JSON.stringify(existingApplicants));
  }
  


   // not used
   getLoanApplicant(userId: number): LoanApplicant | undefined {
    return this.loanApplicants.find((loanApplicant) => loanApplicant.userId === userId);
  }

  // not used
  updateLoanApplicant(userId: number, updatedApplicant: Partial<LoanApplicant>): void {
    const applicantIndex = this.loanApplicants.findIndex((loanApplicant) => loanApplicant.userId === userId);
    if (applicantIndex !== -1) {
      this.loanApplicants[applicantIndex] = { ...this.loanApplicants[applicantIndex], ...updatedApplicant };
      this.saveApplicantsToLocalStorage();
    }
  }

  addFormData(formData: any) {
    // Create a deep copy of the formData object and store it in the LoanDataArray
    this.LoanDataArray.push(JSON.parse(JSON.stringify(formData)));
  }
  
  getFormData() {
    return this.LoanDataArray;
  }

  // get datas from local storage...
  fetchDataAndStoreInLocalStorage(){
    //fetch data from data.json
    this.http.get('assets/data.json').subscribe((data:any) => {
      if(data.hasOwnProperty('loanApplicants')){
        localStorage.setItem('loanApplicants', JSON.stringify(data.loanApplicants));
      }
    })
  }

}
