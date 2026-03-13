import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { TaskORMEntity } from "./TaskORMEntity";

@Entity("users")
export class UserORMEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: "varchar",
    default: "USER",
  })
  role!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => TaskORMEntity, (task) => task.ownerId)
  tasks!: TaskORMEntity[];
}
