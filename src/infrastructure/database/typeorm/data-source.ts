import "reflect-metadata";
import { DataSource } from "typeorm";
import { TaskORMEntity } from "./entities/TaskORMEntity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
  database: process.env.DB_NAME || "taskdb",
  synchronize: false,
  logging: false,
  entities: [TaskORMEntity],
  migrations: [
    process.env.NODE_ENV === "production"
      ? "dist/infrastructure/database/typeorm/migrations/*.js"
      : "src/infrastructure/database/typeorm/migrations/*.ts",
  ],
});
