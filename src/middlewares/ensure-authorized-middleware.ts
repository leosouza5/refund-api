import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";

function ensureAuthorized(role: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {

    if (!req.user || !role.includes(req.user.role)) {
      throw new AppError("Unauthorized", 403)
    }

    return next()
  }
}

export { ensureAuthorized }