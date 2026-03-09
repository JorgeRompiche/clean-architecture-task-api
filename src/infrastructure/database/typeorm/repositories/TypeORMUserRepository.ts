import { Repository } from "typeorm";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import { UserORMEntity } from "../entities/UserORMEntity";
import { AppDataSource } from "../data-source";
import { User } from "../../../../domain/entities/User";
import { UserMapper } from "../mappers/UserMapper";

export class TypeORMUserRepository implements IUserRepository {
  private repository: Repository<UserORMEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserORMEntity);
  }

  async save(user: User): Promise<User> {
    const ormEntity = UserMapper.toORM(user);
    await this.repository.save(ormEntity);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const ormEntity = await this.repository.findOneBy({ id });
    if (!ormEntity) return null;
    return UserMapper.toDomain(ormEntity);
  }

  async findByEmail(email: string): Promise<User | null> {
    const ormEntity = await this.repository.findOneBy({ email });
    if (!ormEntity) return null;
    return UserMapper.toDomain(ormEntity);
  }
}
