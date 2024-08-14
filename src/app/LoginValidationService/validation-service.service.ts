import { Injectable } from '@angular/core';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidationServiceService {

  private users: {username: string, password: string, role: string, profileurl: string}[] = [
    { username: 'mukesh', password: 'Mukesh@111',role: 'admin', profileurl: 'assets/testimonal2.jpg'},
    { username: 'vicky', password: 'Vicky@111', role: 'admin', profileurl: 'assets/testimonal3.jpg'},
  ]

  constructor() { }

  // authenticate(username: string, password: string): boolean
  // {
  //   const user = this.users.find(u => u.username === username && u.password === password);
  //   if(user != undefined){
  //     this.isLoggedIn();
  //   }
  //   return !!user;
  // }

  // isLoggedIn() : boolean{
  //   console.log("isLoggedin")
  //   return false;
  // }

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  // constructor() {}

  authenticate(username: string, password: string): object {
    const user = this.users.find((u) => u.username === username && u.password === password);
    const isAuthenticated = !!user;
    this.isLoggedInSubject.next(isAuthenticated); // Update the login status
    // console.log("service"  + this.isLoggedInSubject);
    const role = isAuthenticated ? user.role : '';
    // return isAuthenticated;
    return { isAuthenticated,role};
  }

  // setLoggedInStatus(isLoggedIn: boolean): void {
  //   this.isLoggedInSubject.next(isLoggedIn);
  // }

  profileurl(username: string) : string
  {
    const user = this.users.find((user) => user.username === username);
    return user ? user.profileurl : '';// Return the profile URL if the user is found, otherwise return an empty string.
  }
}
