import { User } from "../../../../domain/entities/User";
import { UserORMEntity } from "../entities/UserORMEntity";

export class UserMapper {
  static toDomain(entity: UserORMEntity): User {
    return new User({
      id: entity.id,
      email: entity.email,
      password: entity.password,
      role: entity.role as any,
      createdAt: entity.createdAt,
    });
  }

  static toORM(user: User): UserORMEntity {
    const orm = new UserORMEntity();

    orm.id = user.id;
    orm.email = user.email;
    orm.password = user.password;
    orm.role = user.role;
    orm.createdAt = user.createdAt;

    return orm;
  }
}
