export interface IUser{
    // userId: number;
    id?: number ; // Add the 'id' property here
      firstname?: string;
      lastname?: string;
      fathername?: string;
      dateofbirth?: Date;
      gender?: string;
      phonenumber?: string;
      aadhar?: string;
      email?: string;
      pan?:string;
      address?: string;
      state?: string | undefined;
      city?: string | undefined ;
      branch?: string;
      pincode?: string;
      username?: string;
      password?: string;
    //   reason?: string;
      role?: string;
      profileurl?: string;
    //   status?: string;
      
  }
  export class User implements IUser {
      id?: number = 0; // Add the 'id' property here
      firstname?: string;
      lastname?: string;
      fathername?: string;
      dateofbirth?: Date;
      gender?: string;
      phonenumber?: string;
      aadhar?: string;
      email?: string;
      pan?: string;
      address?: string;
      state?: string | undefined;
      city?: string | undefined;
      branch?: string;
      pincode?: string;
      username?: string;
      password?: string;
    //   reason?: string;
      role? = 'guest';
      profileurl?: string;
    //   status?: string;
      userId?: number;
  }