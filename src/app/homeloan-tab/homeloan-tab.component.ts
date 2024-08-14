import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-homeloan-tab',
  templateUrl: './homeloan-tab.component.html',
  styleUrls: ['./homeloan-tab.component.css']
})
export class HomeloanTabComponent {

  activeTab: string = 'homeLoan'; // Set the initial active tab

  onTabChange(event: MatTabChangeEvent): void {
    switch (event.index) {
      case 0:
        this.activeTab = 'homeLoan';
        break;
      case 1:
        this.activeTab = 'acceptedLoan';
        break;
      case 2:
        this.activeTab = 'rejectedLoan';
        break;
      default:
        break;
    }
  }

}
