import { Injectable } from '@angular/core';
import { IUser, User } from '../Modal/signupViewModal';
import { UserStorage } from '../Modal/abstractClassforUser';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends UserStorage{

  private users: IUser[] = [];
  IUser: any;
  private authenticatedUser: IUser | null = null;

  constructor(private http: HttpClient) {
    super();
    // Load users from local storage during service initialization
    const storedUsers = localStorage.getItem('users');
    
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
    else {
      // this.users = [
      //   { username: 'mukesh', password: 'Mukesh@111', role: 'admin', profileurl: 'assets/testimonal2.jpg' },
      //   { username: 'vicky', password: 'Vicky@111', role: 'admin', profileurl: 'assets/testimonal5.jpeg' },
      // ];

      // this.users.push(...jdata.users.map(u => <IUser> u));
      // Save the default users to local storage
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }


  login(username: string, password: string): boolean {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      const users: IUser[] = JSON.parse(storedUsers);
      const user = users.find((u) => u.username === username && u.password === password);

      if (user) {
        this.authenticatedUser = user;
        return true;
      }
    }
    return false;
  }

  isAuthenticated(): boolean {
    return !!this.authenticatedUser;
  }

  getCurrentUser(): IUser | null {
    return this.authenticatedUser;
  }


  createUser(user: User): void {
    // Retrieve users from local storage if it exists
    const existingUsersJSON = localStorage.getItem('users');
    let existingUsers: User[] = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];
  
    // Find the maximum id currently assigned to any user
    const maxId = existingUsers.reduce((max: number, u: User) => (u.id! > max ? u.id! : max), 0);
  
    // Assign a new id to the user by incrementing the maximum id
    user.id = maxId + 1;
  
    // Set the default role as 'user'
    user.role = 'guest';
  
    // Push the user to the existing users array
    existingUsers.push(user);
  
    // Store the updated users array in local storage
    localStorage.setItem('users', JSON.stringify(existingUsers));
  }

  
  getUser(userId: number): User | undefined {
    return this.users.find((user) => user.id === userId);
  }
  
  updateUser(userId: number, updatedUser: Partial<User>): void {
    const userIndex = this.users.findIndex((user) => user.id === userId);
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
      this.saveUsersToLocalStorage();
    }
  }

  private saveUsersToLocalStorage(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }


  // getting the user by passing username
  getUserByUsername(username: string): IUser | undefined {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      const users: IUser[] = JSON.parse(storedUsers);
      return users.find(user => user.username === username);
    }
    return undefined;
  }

  // fetch the data from the local storage...
  fetchDataAndStoreInLocalStorage(){
    // get data from data.json
    this.http.get('assets/data.json').subscribe((data: any) => {
      if(data.hasOwnProperty('users')){
        localStorage.setItem('users', JSON.stringify(data.users));
      }
    });
  }
  
}
