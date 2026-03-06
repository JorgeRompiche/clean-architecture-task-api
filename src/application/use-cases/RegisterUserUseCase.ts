import { randomUUID } from "node:crypto";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { RegisterUserDTO } from "../dtos/RegisterUserDTO";
import { PasswordHasher } from "../interfaces/PasswordHasher";
import { UserAlreadyExistsError } from "../../domain/errors/UserAlreadyExistsError";
import { User } from "../../domain/entities/User";

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hasher: PasswordHasher,
  ) {}

  async execute(input: RegisterUserDTO): Promise<User> {
    const existing = await this.userRepository.findByEmail(input.email);
    if (existing) throw new UserAlreadyExistsError(input.email);

    const hashed = await this.hasher.hash(input.password);

    const user = new User({
      id: randomUUID(),
      email: input.email,
      password: hashed,
    });

    return await this.userRepository.save(user);
  }
}
