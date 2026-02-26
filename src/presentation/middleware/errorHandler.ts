import { Request, Response, NextFunction } from "express";
import { DomainError } from "../../domain/errors/DomainError";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof DomainError) {
    return res.status(400).json({ error: err.message });
  }

  console.error(err);

  return res.status(500).json({ error: "Internal server error" });
}
