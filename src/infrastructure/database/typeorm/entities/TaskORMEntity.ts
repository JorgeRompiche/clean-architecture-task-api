import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UserORMEntity } from "./UserORMEntity";

@Entity("tasks")
export class TaskORMEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  projectId!: string;

  @Column()
  status!: string;

  @Column()
  createdAt!: Date;

  @Column("uuid")
  ownerId!: string;

  @ManyToOne(() => UserORMEntity, (user) => user.tasks, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "ownerId" })
  owner!: UserORMEntity;
}
