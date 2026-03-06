import jwt from "jsonwebtoken";
import { TokenService } from "../../application/interfaces/TokenService";

export class JwtTokenService implements TokenService {
  sign(payload: object): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
  }
}
