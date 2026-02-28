import { Request, Response, NextFunction } from "express";
import { z } from "zod";

type validationSchemas = {
  body?: z.ZodType;
  params?: z.ZodType;
  query?: z.ZodType;
};

export const validateRequest =
  (schemas: validationSchemas) =>
  (req: Request, res: Response, next: NextFunction) => {
    const errors: Record<string, { path: string; message: string }[]> = {};

    const handleError = (key: string, issues: any[]) => {
      errors[key] = issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
    };

    let resultErrorIssues: any;

    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success) {
        resultErrorIssues = result.error.issues;
        handleError("body", resultErrorIssues);
      } else {
        req.body = result.data;
      }
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success) {
        resultErrorIssues = result.error.issues;
        handleError("params", resultErrorIssues);
      } else {
        req.params = result.data as any;
      }
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);
      if (!result.success) {
        resultErrorIssues = result.error.issues;
        handleError("query", resultErrorIssues);
      } else {
        req.query = result.data as any;
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors,
      });
    }

    next();
  };
