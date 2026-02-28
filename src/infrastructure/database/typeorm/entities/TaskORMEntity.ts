import { Entity, PrimaryColumn, Column } from "typeorm";

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
}
