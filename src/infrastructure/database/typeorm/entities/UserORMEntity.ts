import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

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
}
