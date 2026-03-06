import { UserRole } from "../../domain/entities/UserRole";

export interface AuthJwtPayload {
  sub: string;
  role: UserRole;
}
