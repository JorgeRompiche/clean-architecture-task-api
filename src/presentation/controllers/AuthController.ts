import { Request, Response } from "express";
import { LoginUserUseCase } from "../../application/use-cases/LoginUserUseCase";
import { RegisterUserUseCase } from "../../application/use-cases/RegisterUserUseCase";

export class AuthController {
  constructor(
    private registerUserUseCase: RegisterUserUseCase,
    private loginUserUseCase: LoginUserUseCase,
  ) {}

  async register(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const user = await this.registerUserUseCase.execute({ email, password });

    return res.status(201).json(user);
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const result = await this.loginUserUseCase.execute({ email, password });
    return res.json(result);
  }
}
