import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-creditcard-tab',
  templateUrl: './creditcard-tab.component.html',
  styleUrls: ['./creditcard-tab.component.css']
})
export class CreditcardTabComponent {

  activeTab: string = 'pendingCreditCards';

  onTabChange(event: MatTabChangeEvent): void{
    switch (event.index){
      case 0:
        this.activeTab = 'pendingCreditCards';
        break;
      case 1:
        this.activeTab = 'acceptedCreditCards';
        break;
      case 2:
        this.activeTab = 'rejectedCreditCards';
        break;
      default:
        break;
    }
  }
}
