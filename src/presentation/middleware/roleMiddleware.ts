import { NextFunction, Request, Response } from "express";

export const roleMiddleware = (role: "ADMIN" | "USER") => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
