import { AuthJwtPayload } from "../../application/interfaces/JwtPayload";
import { UserRole } from "../../domain/entities/UserRole";

declare global {
  namespace Express {
    interface Request {
      user?: AuthJwtPayload;
    }
  }
}
