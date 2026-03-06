import { User } from "../../domain/entities/User";
import { InvalidCredentialsError } from "../../domain/errors/InvalidCredentialsError";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { LoginUserDTO } from "../dtos/LoginUserDTO";
import { PasswordHasher } from "../interfaces/PasswordHasher";
import { TokenService } from "../interfaces/TokenService";

export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hasher: PasswordHasher,
    private tokenService: TokenService,
  ) {}

  async execute(input: LoginUserDTO): Promise<object> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) throw new InvalidCredentialsError();

    const validPassword = await this.hasher.compare(
      input.password,
      user.password,
    );
    if (!validPassword) throw new InvalidCredentialsError();

    const token = this.tokenService.sign({
      sub: user.id,
      role: user.role,
    });

    return { token };
  }
}
