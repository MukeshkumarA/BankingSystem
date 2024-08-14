import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-carloan-tab',
  templateUrl: './carloan-tab.component.html',
  styleUrls: ['./carloan-tab.component.css']
})
export class CarloanTabComponent {

  activeTab: string = 'carLoan'; // Set the initial active tab

  onTabChange(event: MatTabChangeEvent): void {
    switch (event.index) {
      case 0:
        this.activeTab = 'carLoan';
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
