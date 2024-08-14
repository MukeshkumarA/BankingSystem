import { Injectable } from '@angular/core';
import { RetirementPlanApplication } from '../Modal/retirementPlanView';
import { RetirementPlanApplicationStorage } from '../Modal/abstractClassforRetirementPlan';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RetirementplanService {

  private applications: RetirementPlanApplication[] = [];

  constructor(private http: HttpClient) {
    const storedApplicants = localStorage.getItem('retirementPlanApplicants');

      if (storedApplicants) {
        try {
          const parsedApplicants = JSON.parse(storedApplicants);
          // Handle the parsed data as needed.
        } catch (error) {
          console.error('Error parsing stored data:', error);
        }
      }
   }

   // create new application
   createRetirementPlanApplication(applicant: RetirementPlanApplication) : void{
    console.log("create")
    const nextApplicantId = this.getNextApplicantId();

    // assign the applicant id
    applicant.applicationId = nextApplicantId;

    this.applications.push(applicant);
    this.saveToLocalStorage();
   }

   getNextApplicantId(): number{
    const existingcount = this.applications.length;
    return existingcount+1;
    }

   // save to local storage.
   private saveToLocalStorage() : void{
      const existingApplicantsJSON = localStorage.getItem('retirementPlanApplicants');
      let existingApplicants: RetirementPlanApplication[] = existingApplicantsJSON? JSON.parse(existingApplicantsJSON) : [];

      // store the applications in existingApplicants
      existingApplicants = this.applications;

      // add to local storage
      localStorage.setItem('retirementPlanApplicants', JSON.stringify(existingApplicants));
   }  


   // fetch the data from the data.json file
   fetchDataAndStoreInLocalStorage(){
    // get the data from data.json
    this.http.get('assets/data.json').subscribe((data: any) => {
      if(data.hasOwnProperty('retirementPlanApplicants')){
        localStorage.setItem('retirementPlanApplicants', JSON.stringify(data.retirementPlanApplicants));
      }
    });
   }
}
