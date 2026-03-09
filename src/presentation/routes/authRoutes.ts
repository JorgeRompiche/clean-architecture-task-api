import { Router } from "express";
import { TypeORMUserRepository } from "../../infrastructure/database/typeorm/repositories/TypeORMUserRepository";
import { RegisterUserUseCase } from "../../application/use-cases/RegisterUserUseCase";
import { BCryptPasswordHasher } from "../../infrastructure/security/BcryptPasswordHasher";
import { LoginUserUseCase } from "../../application/use-cases/LoginUserUseCase";
import { JwtTokenService } from "../../infrastructure/security/JwtTokenService";
import { AuthController } from "../controllers/AuthController";
import { validateRequest } from "../validators/validateRequest";
import { RegisterUserSchema } from "../validators/RegisterUserSchema";
import { authMiddleware } from "../middleware/authMiddlewaare";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { LoginUserSchema } from "../validators/LoginUserSchema";

const router = Router();

const repository = new TypeORMUserRepository();
const passwordHasher = new BCryptPasswordHasher();
const tokenService = new JwtTokenService();
const registerUserUseCase = new RegisterUserUseCase(repository, passwordHasher);
const loginUserUseCase = new LoginUserUseCase(
  repository,
  passwordHasher,
  tokenService,
);

const controller = new AuthController(registerUserUseCase, loginUserUseCase);

router.post(
  "/register",
  validateRequest({ body: RegisterUserSchema }),
  //   authMiddleware,
  //   roleMiddleware("ADMIN"),
  (req, res) => controller.register(req, res),
);

router.post("/login", validateRequest({ body: LoginUserSchema }), (req, res) =>
  controller.login(req, res),
);

export const userRoutes = router;
