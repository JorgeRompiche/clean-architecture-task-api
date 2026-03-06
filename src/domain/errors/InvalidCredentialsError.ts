import { DomainError } from "./DomainError";

export class InvalidCredentialsError extends DomainError {
  constructor() {
    super("Invalid email or password", 401); // Unauthorized
  }
}
