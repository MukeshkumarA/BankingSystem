import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessiondataService {

  private isFetch = new BehaviorSubject<boolean>(false);

  get isFetchTrigger() : Observable<boolean>{
    return this.isFetch.asObservable();
  }

  triggerData(){
    this.isFetch.next(true);
  }




  // private imageurlSubject = new BehaviorSubject<string>('');
  // private usernameSubject = new BehaviorSubject<string>('');
  // private roleSubject = new BehaviorSubject<string>('');
  // private usernameFirstLetterSubject = new BehaviorSubject<string>('');
  // private userIdSubject = new BehaviorSubject<number>(0);

  // imageurl$ = this.imageurlSubject.asObservable();
  // username$ = this.usernameSubject.asObservable();
  // role$ = this.roleSubject.asObservable();
  // usernameFirstLetter$ = this.usernameFirstLetterSubject.asObservable();
  // userId$ = this.userIdSubject.asObservable();

  // constructor() {
  //   const username = localStorage.getItem('username');
  //   const usersData = localStorage.getItem('users');
  //   if (usersData !== null) {
  //     const usersArray = JSON.parse(usersData);
  //     const username = localStorage.getItem('username');
  //     if (username) {
  //       const user = usersArray.find((user: { username: string }) => user.username === username);
  //       if (user) {
  //         this.userIdSubject.next(user.id); // Assuming 'id' is the property you want to retrieve
  //       }
  //     }
  //   }

  //   this.imageurlSubject.next(localStorage.getItem('imageurl') || '');
  //   this.usernameSubject.next(localStorage.getItem('username') || '');
  //   this.roleSubject.next(localStorage.getItem('role') || '');
  //   this.usernameFirstLetterSubject.next(username ? username.charAt(0).toUpperCase() : '');
  // }

  // updateDataFromLocalStorage() {
  //     const username = localStorage.getItem('username');
  //     const usersData = localStorage.getItem('users');
  //     if (usersData !== null) {
  //       const usersArray = JSON.parse(usersData);
  //       const username = localStorage.getItem('username');
  //       if (username) {
  //         const user = usersArray.find((user: { username: string }) => user.username === username);
  //         if (user) {
  //           this.userIdSubject.next(user.id); // Assuming 'id' is the property you want to retrieve
  //         }
  //       }
  //     }
  //   this.imageurlSubject.next(localStorage.getItem('imageurl') || '');
  //   this.usernameSubject.next(localStorage.getItem('username') || '');
  //   this.roleSubject.next(localStorage.getItem('role') || '');
  //   // const username = localStorage.getItem('username');
  //   this.usernameFirstLetterSubject.next(username ? username.charAt(0).toUpperCase() : '');
  // }

 
}
