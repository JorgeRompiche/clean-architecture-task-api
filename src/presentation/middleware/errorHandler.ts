import { Request, Response, NextFunction } from "express";
import { DomainError } from "../../domain/errors/DomainError";
import { logger } from "../../shared/logger";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof DomainError) {
    logger.warn({
      message: err.message,
      path: req.path,
      method: req.method,
    });

    return res.status(err.statusCode).json({ error: err.message });
  }

  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  return res.status(500).json({ error: "Internal server error" });
}
