import { DomainError } from "./DomainError";

export class InvalidUserEmailError extends DomainError {
  constructor() {
    super("Invalid user email format.", 422); // Unprocessable Entity
  }
}

export class InvalidUserPasswordError extends DomainError {
  constructor() {
    super("Invalid user password format.", 422); // Unprocessable Entity
  }
}
