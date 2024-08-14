import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-retiment-plan-tab',
  templateUrl: './retiment-plan-tab.component.html',
  styleUrls: ['./retiment-plan-tab.component.css']
})
export class RetimentPlanTabComponent {

  activeTab: string = 'pendingRetirementPlans';

  onTabChange(event: MatTabChangeEvent): void{
    switch (event.index){
      case 0:
        this.activeTab = 'pendingRetirementPlans';
        break;
      case 1:
        this.activeTab = 'acceptedRetirementPlans';
        break;
      case 2:
        this.activeTab = 'rejectedRetirementPlans';
        break;
      default:
        break;
    }
  }

}
