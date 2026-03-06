import { DomainError } from "./DomainError";

export class InvalidTaskTitleError extends DomainError {
  constructor() {
    super("Task tittle must be at least 5 characters long.", 422); // Unprocessable Entity
  }
}

export class InvalidStatusTransitionError extends DomainError {
  constructor() {
    super("Invalid tadsk status transition.");
  }
}
