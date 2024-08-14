import { Injectable } from '@angular/core';
import { DebitCardApplicant } from '../Modal/debitcardModal';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DebitcardService {

  private debitCardApplicants: DebitCardApplicant[] = [];
  
  constructor(private http: HttpClient) {
    const storedApplicants = localStorage.getItem('debitCardApplicants');
    if(storedApplicants){
      this.debitCardApplicants = JSON.parse(storedApplicants);
    }
   }

   createDebitCardApplication(debitcardApplicant: DebitCardApplicant): void{
    console.log("create")
    const nextApplicantId = this.getNextApplicantId();

    // assign the applicant id
    debitcardApplicant.applicantId = nextApplicantId;

    // push the current applicant into the applicants
    this.debitCardApplicants.push(debitcardApplicant);
    this.saveToLocalStorage();
   }


  getNextApplicantId(): number{
    const existingcount = this.debitCardApplicants.length;
    return existingcount+1;
  }

  saveToLocalStorage() : void{
    // Retrieve debitcard applicants
    const existingApplicantsJSON = localStorage.getItem('debitCardApplicants');
    let existingApplicants: DebitCardApplicant[] = existingApplicantsJSON ? JSON.parse(existingApplicantsJSON) : [];

    existingApplicants = this.debitCardApplicants;

    localStorage.setItem('debitCardApplicants', JSON.stringify(existingApplicants));

  }

  // fetch data from the local storage...
  fetchDataAndStoreInLocalStorage(){
    // get data from the local storage..
    this.http.get('assets/data.json').subscribe((data:any) => {
      if(data.hasOwnProperty('debitCardApplicants')){
        localStorage.setItem('debitCardApplicants',JSON.stringify(data.debitCardApplicants));
      }
    })
  }

}
