import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {


  constructor(private router: Router){}
  
  
  services = [
    {
      icon: 'assets/credit.png',
      title: 'Credit Cards',
      description: 'We offer a variety of credit cards to fit your needs, low-interest cards, and more.',
      route: '/creditcardapplication'
      // route: '/testing'
    },
    {
      icon: 'assets/smartphone.png',
      title: 'Balance Services',
      description: 'View your account balances and transaction history, pay bills with our banking services.',
      // route: '/balance-services'
      route: '/testing'
    },
    {
      icon: 'assets/loan.png',
      title: 'Loans',
      description: 'Get your dream home with our home loan options and other options like refinancing.',
      route: '/loanapplication'
    },
    {
      icon: 'assets/credit.png',
      title: 'Debit Cards',
      description: 'Our debit cards offer convenient and secure access to your money, with fraud protection.',
      route: '/debitcardapplication'
    },
    {
      icon: 'assets/user-verify-removebg-preview.png',
      title: 'Checking Accounts',
      description: 'Our checking accounts come with free online banking and mobile deposits.',
      route: '/balance-services'
    },
    {
      icon: 'assets/retirement.png',
      title: 'Retirement Plan',
      description: 'Plan for your retirement with our financial advisors, to maximize your savings.',
      route: '/retirementplanapplication'
    },
    {
      icon: 'assets/salary.png',
      title: 'Savings Accounts',
      description: 'Save for your future with our high-yield savings accounts, and ease online access.',
      route: '/balance-services'
    },
    {
      icon: 'assets/car.png',
      title: 'Auto Loans',
      description: 'Finance your car with us and enjoy competitive rates and easy online application.',
      route: '/balance-services'
    }
  ];

  callOtherComponents(service:{ icon: string, title: string, description: string, route?: string }) {
    if (service.route) {
      this.router.navigate([service.route]);
    }
  }

}
