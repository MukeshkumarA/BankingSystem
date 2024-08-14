import { Component } from '@angular/core';
import { PandataService } from '../shared/pandata.service';

@Component({
  selector: 'app-getcreditscore',
  templateUrl: './getcreditscore.component.html',
  styleUrls: ['./getcreditscore.component.css']
})
export class GetcreditscoreComponent {

  username: string = localStorage.getItem('username') || '';
  cibilscore: string | undefined;

  constructor(private panDataService: PandataService){}

  validatePan(): boolean  {
    console.log("pan");
    const panInput = document.getElementById('pannumber') as HTMLInputElement;
    const errorElement = document.querySelector('.panerror') as HTMLElement;
    const pan = panInput.value.trim();
  
    if (pan === '') {
      errorElement.textContent = 'PAN is required.';
      return false;
    } else if (!/^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/.test(pan)) {
      errorElement.textContent = 'Invalid PAN format.';
    } 
    else{
      errorElement.textContent = '';
      const storedUsers = localStorage.getItem('users');
  
      if (storedUsers) {
        const usersArray = JSON.parse(storedUsers);
        const user = usersArray.find((user: { username: string }) => user.username === this.username);
    
        if (user && user.pan !== pan) {
          alert('Pan value not found');
          return false;
        }
        else{
          return true;
        }
      }
      
    }
    return true;
  }

  getCibilScore()
  {
    if(this.validatePan())
    {
      const panInput = document.getElementById('pannumber') as HTMLInputElement;
      const pan = panInput.value.trim();
      const cibilScoreResult = this.panDataService.getCibilScoreByPan(pan);

      if (typeof cibilScoreResult === 'number') {
        // Convert the number to a string
        this.cibilscore = cibilScoreResult.toString();
        // alert(this.cibilscore);
      } else {
        // Handle the case where it's null or some other type
        this.cibilscore = undefined; // or an appropriate default value
      }
    }
    // const cibilscore = this.panDataService.getCibilScoreByPan(pan);
    // alert(`Your cibil score is ${cibilscore}`);
    // this.cibilscore = this.panDataService.getCibilScoreByPan(pan);
  }

  // print function
  print(){
    window.print();
  }

}
