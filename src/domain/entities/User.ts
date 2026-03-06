import {
  InvalidUserEmailError,
  InvalidUserPasswordError,
} from "../errors/UserErrors";
import { UserRole } from "./UserRole";

export interface UserProps {
  id: string;
  email: string;
  password: string;
  role?: UserRole;
  createdAt?: Date;
}

export class User {
  private _id: string;
  private _email: string;
  private _password: string;
  private _role: UserRole;
  private _createdAt: Date;

  constructor(props: UserProps) {
    this._id = props.id;
    this._email = props.email;
    this._password = props.password;
    this._role = props.role ?? UserRole.USER;
    this._createdAt = props.createdAt ?? new Date();
  }

  //region      --- GETTERS
  get id(): string {
    return this._id;
  }
  get email(): string {
    return this._email;
  }
  get password(): string {
    return this._password;
  }
  get role(): UserRole {
    return this._role;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
  //end region      --- GETTERS

  //region          --- BEHAVIOR

  updateEmail(newEmail: string): void {
    this.ValidateEmail(newEmail);
    this._email = newEmail;
  }

  updatePassword(newPassword: string): void {
    this.ValidatePassword(newPassword);
    this._password = newPassword;
  }
  //end region      --- BEHAVIOR

  //region        --- VALIDATIONS
  private ValidateEmail(email: string): void {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) throw new InvalidUserEmailError();
  }

  private ValidatePassword(password: string): void {
    if (password.trim().length < 8) throw new InvalidUserPasswordError();
  }
  //end region    --- VALIDATIONS

  //region          -- PRESENTER
  toJSON() {
    return {
      id: this._id,
      email: this._email,
      password: this._password,
      role: this._role,
      createdAt: this._createdAt,
    };
  }
  //end region      -- PRESENTER
}
