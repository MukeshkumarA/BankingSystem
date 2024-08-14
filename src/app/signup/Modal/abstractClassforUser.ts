import { User } from "./signupViewModal";

export abstract class UserStorage{
    abstract createUser(user: User): void;
    abstract getUser(userId: number): User | undefined;
    abstract updateUser(userId: number, updatedUser: User): void;
}
